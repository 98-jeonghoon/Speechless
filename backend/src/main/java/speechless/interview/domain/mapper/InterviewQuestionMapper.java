package speechless.interview.domain.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring",
    unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface InterviewQuestionMapper {

    InterviewQuestionMapper INSTANCE = Mappers.getMapper(InterviewQuestionMapper.class);

}
