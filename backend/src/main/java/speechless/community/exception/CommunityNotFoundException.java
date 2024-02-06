package speechless.community.exception;

import org.springframework.http.HttpStatus;
import speechless.common.error.ErrorCode;
import speechless.common.error.SpeechlessException;

public class CommunityNotFoundException extends SpeechlessException {
    public CommunityNotFoundException() {super(new ErrorCode(HttpStatus.NOT_FOUND, "커뮤니티를 찾을 수 없습니다."));}
}
