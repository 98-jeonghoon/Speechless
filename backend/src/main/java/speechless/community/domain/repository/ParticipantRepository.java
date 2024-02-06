package speechless.community.domain.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import speechless.community.domain.Participant;
import speechless.member.domain.Member;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {
    List<Participant> findAllByMember(Member member);
}
