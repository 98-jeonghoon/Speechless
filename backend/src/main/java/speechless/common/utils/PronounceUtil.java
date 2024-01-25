package speechless.common.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import speechless.common.dto.PronounceRequest;
import speechless.common.dto.PronounceResponse;
import speechless.common.error.SpeechlessException;

@Component
public class PronounceUtil {
    private static String apiKey;
    private static String pronounceUri = "http://aiopen.etri.re.kr:8000/WiseASR/PronunciationKor";

    public static PronounceResponse pronounce(PronounceRequest request) throws SpeechlessException {
        RestClient client = RestClient.create();

        return client.post()
                .uri(pronounceUri)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", apiKey)
                .body(request)
                .retrieve()
                .body(PronounceResponse.class);
    }

    @Value("${api-keys.pronounce}")
    private void setApiKey(String key){
        apiKey = key;
    }
}
