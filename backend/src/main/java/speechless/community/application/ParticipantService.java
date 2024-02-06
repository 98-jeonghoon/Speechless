package speechless.community.application;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import speechless.auth.dto.AuthCredentials;
import speechless.community.domain.Community;
import speechless.community.domain.Participant;
import speechless.community.domain.mapper.ParticipantMapper;
import speechless.community.domain.repository.CommnunityRepository;
import speechless.community.domain.repository.ParticipantRepository;
import speechless.community.dto.response.ParticipantResponse;
import speechless.community.exception.CommunityNotFoundException;
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
    public void createParticipant(AuthCredentials authCredentials, Long communityId){
        Member loginMember = getMember(authCredentials);
        Community participantCommunity = getCommunity(communityId);
        Participant participant = Participant.builder()
            .member(loginMember)
            .community(participantCommunity)
            .build();
        participantRepository.save(participant);
    }

    public void deleteParticipant(Long id){
        participantRepository.delete(getParticipant(id));
    }

    public List<ParticipantResponse> getParticipants(AuthCredentials authCredentials){
        Member loginMember = getMember(authCredentials);
        List<Participant> participants = participantRepository.findAllByMember(loginMember);
        return participants.stream().map(ParticipantMapper.INSTANCE::toResponse).toList();
    }

    public Participant getParticipant(Long id){
        return participantRepository.findById(id)
            .orElseThrow(ParticipantNotFoundException::new);
    }

    private Member getMember(AuthCredentials authCredentials){
        return memberRepository.findById(authCredentials.id())
            .orElseThrow(MemberNotFoundException::new);
    }

    private Community getCommunity(Long communityId){
        return commnunityRepository.findById(communityId)
            .orElseThrow(CommunityNotFoundException::new);
    }
}
