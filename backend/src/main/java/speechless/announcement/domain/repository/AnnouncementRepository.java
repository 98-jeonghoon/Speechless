package speechless.announcement.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import speechless.announcement.domain.Announcement;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {

}
