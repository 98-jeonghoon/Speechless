package speechless.community.dto.response;

import speechless.community.domain.Community;
import speechless.member.domain.Member;

public record ParticipantResponse (
    Long id,
    Community community,
    Member member){
}
