package speechless.interview.pronounce.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClient;
import speechless.interview.pronounce.dto.PronounceRequest;
import speechless.interview.pronounce.dto.PronounceResponse;
import speechless.interview.pronounce.exception.PronounceException;

@Component
public class PronounceUtil {
    private static String apiKey;
    private static final String pronounceUri = "http://aiopen.etri.re.kr:8000/WiseASR/PronunciationKor";

    public static PronounceResponse pronounce(PronounceRequest request) {
        RestClient client = RestClient.create();
        try{
            return client.post()
                    .uri(pronounceUri)
                    .contentType(MediaType.APPLICATION_JSON)
                    .header("Authorization", apiKey)
                    .body(request)
                    .retrieve()
                    .body(PronounceResponse.class);
        }catch (HttpClientErrorException e){
            throw new PronounceException();
        }
    }

    @Value("${api-keys.pronounce}")
    private void setApiKey(String key){
        apiKey = key;
    }
}
