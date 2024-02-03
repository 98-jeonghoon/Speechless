package speechless.session.openVidu.presentation;

import static speechless.session.speechToText.utils.SttUtil.Stt;
import static speechless.session.storage.utils.FileUtil.deleteFile;
import static speechless.session.storage.utils.FileUtil.uploadFile;
import static speechless.session.storage.utils.RecordingUtil.unzipFile;

import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Recording;
import io.openvidu.java.client.Recording.OutputMode;
import io.openvidu.java.client.RecordingProperties;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import speechless.session.speechToText.dto.SttRequest;
import speechless.session.speechToText.dto.SttResponse;

@OpenAPIDefinition(tags = @Tag(name = "RecordController", description = "Openvidu의 비디오 세션에서 녹화를 시작, 종료합니다."))
@RestController
@RequestMapping("/openvidu/recording")
public class RecordController {

  @Value("${OPENVIDU_URL}")
  private String OPENVIDU_URL;

  @Value("${OPENVIDU_SECRET}")
  private String OPENVIDU_SECRET;

  private Map<String, Boolean> sessionRecordings = new ConcurrentHashMap<>();

  private OpenVidu openVidu;

  @PostConstruct
  public void init() {
    this.openVidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
  }

  @PostMapping("/start/{sessionId}")
  public ResponseEntity<?> startRecording(@PathVariable("sessionId") String sessionId) {

    RecordingProperties properties = new RecordingProperties.Builder().outputMode(
            OutputMode.INDIVIDUAL).hasAudio(true)
        .hasVideo(false).build();

    try {
      Recording recording = this.openVidu.startRecording(sessionId, properties);
      this.sessionRecordings.put(sessionId, true);
      return new ResponseEntity<>(recording, HttpStatus.OK);
    } catch (OpenViduJavaClientException | OpenViduHttpException e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
  }

  @PostMapping("/stop/{recordingId}")
  public ResponseEntity<?> stopRecording(@RequestBody Map<String, String> params) {

    try {
      Recording recording = this.openVidu.stopRecording(params.get("recordingId"));
      this.sessionRecordings.remove(recording.getSessionId());
      Path sourcePath = Paths.get(
          "/opt/openvidu/recordings/" + params.get("recordingId") + "/" + params.get("fileName"));
      Path targetPath = Paths.get("/opt/openvidu/recordings/" + params.get("recordingId"));
      unzipFile(sourcePath, targetPath);
      uploadFile(params.get("fileName"),
          "/opt/openvidu/recordings/" + params.get("recordingId") + "/" + params.get("fileName"));
      this.openVidu.deleteRecording(params.get("recordingId"));
      SttRequest request = new SttRequest(params.get("fileName"), "ko-KR", "sync");
      SttResponse response = Stt(request);
      deleteFile(params.get("fileName"));
      return new ResponseEntity<>(response, HttpStatus.OK);
    } catch (OpenViduJavaClientException | OpenViduHttpException e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
  }
}
