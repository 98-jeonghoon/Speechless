package speechless.community.application;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import speechless.auth.dto.AuthCredentials;
import speechless.common.error.SpeechlessException;
import speechless.community.domain.Community;
import speechless.community.domain.Participant;
import speechless.community.domain.repository.CommnunityRepository;
import speechless.community.domain.repository.ParticipantRepository;
import speechless.community.exception.CommunityNotFoundException;
import speechless.community.exception.NotAllowedParticipantException;
import speechless.community.exception.ParticipantNotFoundException;
import speechless.member.domain.Member;
import speechless.member.domain.repository.MemberRepository;
import speechless.member.exception.MemberNotFoundException;

@Service
@RequiredArgsConstructor
public class ParticipantService {

    private final ParticipantRepository participantRepository;
    private final MemberRepository memberRepository;
    private final CommnunityRepository commnunityRepository;

    private ParticipantRepository repository;

    public void createParticipant(AuthCredentials authCredentials, Long communityId)
        throws SpeechlessException {
        Member loginMember = getMember(authCredentials);
        Community participantCommunity = getCommunity(communityId);
        Participant participant = Participant.builder()
            .member(loginMember)
            .community(participantCommunity)
            .build();
        participantRepository.save(participant);
    }

    public void deleteParticipant(AuthCredentials authCredentials, Long id)
        throws SpeechlessException {
        Participant participant = getParticipant(id);

        checkAuth(authCredentials, participant);

        participantRepository.delete(getParticipant(id));
    }

    public Optional<List<Community>> getFinishedParticipants(AuthCredentials authCredentials)
        throws SpeechlessException {
        Member loginMember = getMember(authCredentials);
        Optional<List<Community>> communities = participantRepository.findFinishedByMember(
            loginMember);
        return communities;
    }

    public Optional<List<Community>> getReservedParticipants(AuthCredentials authCredentials)
        throws SpeechlessException {
        Member loginMember = getMember(authCredentials);
        Optional<List<Community>> communities = participantRepository.findReservedByMember(
            loginMember);
        return communities;
    }

    public Participant getParticipant(Long id) throws SpeechlessException {
        return participantRepository.findById(id)
            .orElseThrow(ParticipantNotFoundException::new);
    }

    private Member getMember(AuthCredentials authCredentials) throws SpeechlessException {
        return memberRepository.findById(authCredentials.id())
            .orElseThrow(MemberNotFoundException::new);
    }

    private Community getCommunity(Long communityId) throws SpeechlessException {
        return commnunityRepository.findById(communityId)
            .orElseThrow(CommunityNotFoundException::new);
    }

    private void checkAuth(AuthCredentials authCredentials, Participant participant)
        throws SpeechlessException {
        if (!authCredentials.id().equals(participant.getMember().getId())) {
            throw new NotAllowedParticipantException();
        }
    }
}
