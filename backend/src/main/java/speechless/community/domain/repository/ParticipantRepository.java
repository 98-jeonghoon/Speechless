package speechless.community.domain.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import speechless.community.domain.Community;
import speechless.community.domain.Participant;
import speechless.member.domain.Member;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {
    @Query(value = "SELECT c FROM Participant p "
        + "JOIN Member m "
        + "ON m = :member "
        + "AND m = p.member "
        + "JOIN Community c "
        + "ON c.sessionStart < current_date "
        + "AND p.community = c")
    List<Community> findFinishedByMember(Member member);

    @Query(value = "SELECT c FROM Participant p "
        + "JOIN Member m "
        + "ON m = :member "
        + "AND m = p.member "
        + "JOIN Community c "
        + "ON c.sessionStart >= current_date "
        + "AND p.community = c")
    List<Community> findReservedByMember(Member member);
}
