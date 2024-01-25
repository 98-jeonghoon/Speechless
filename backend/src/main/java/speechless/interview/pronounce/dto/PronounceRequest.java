package speechless.interview.pronounce.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PronounceRequest {
    private String request_id;
    private Argument argument;
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Argument{
        private String language_code;
        private String script;
        private String audio;
    }
}