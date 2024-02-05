package speechless.interview.presentation;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import speechless.auth.dto.AuthCredentials;
import speechless.interview.application.InterviewQuestionService;
import speechless.interview.application.dto.GptResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/interview")
public class InterviewController {

    private final InterviewQuestionService questionService;

    @PostMapping("/question")
    public ResponseEntity<GptResponse> createQuestion() throws Exception {
        return new ResponseEntity<>(
            questionService.createQuestion(new AuthCredentials(1L), 1L, 129L, 3),
            HttpStatus.CREATED);
    }

}
