package speechless.announcement.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import speechless.announcement.domain.Announcement;
import speechless.announcement.domain.repository.AnnouncementRepository;
import speechless.announcement.dto.AnnouncementCreateRequest;
import speechless.common.error.SpeechlessException;
import speechless.community.domain.Community;
import speechless.community.domain.repository.CommunityRepository;

@Service
@RequiredArgsConstructor
public class AnnouncementService {
  private final AnnouncementRepository announcementRepository;
  private final CommunityRepository commnunityRepository;

  public Announcement createAnnouncement(
      AnnouncementCreateRequest request, String sessionId)
      throws SpeechlessException {
    Community community = commnunityRepository.getById(request.communityId());
    Announcement announcement = Announcement.builder()
        .topic(request.topic())
        .community(community)
        .announcementId(sessionId)
        .build();
    announcementRepository.save(announcement);
    return announcement;
  }
}
