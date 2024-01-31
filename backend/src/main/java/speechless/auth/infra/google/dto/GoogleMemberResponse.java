package speechless.auth.infra.google.dto;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import speechless.auth.application.dto.OAuthMemberResponse;
import speechless.member.domain.Member;
import speechless.member.domain.MemberType;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class GoogleMemberResponse implements OAuthMemberResponse {

    private String email;
    @JsonProperty("name")
    private String nickname;
    private String picture;
    @Override
    public String getEmail() {
        return email;
    }

    @Override
    public String getNickName() {
        return nickname;
    }

    @Override
    public String getPicture() {
        return picture;
    }

    @Override
    public Member toMember() {
        return Member.builder().name(getNickName()).email(getEmail()).profile(getPicture()).memberType(getMemberType()).build();
    }

    @Override
    public MemberType getMemberType() {
        return MemberType.google;
    }
}
