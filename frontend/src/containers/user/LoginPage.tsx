import { Button, Card } from 'flowbite-react';
import { CustomButton } from '../../components/CustomButton.tsx';

import GoogleIcon from '../../assets/images/google.png';
import KakaoIcon from '../../assets/images/kakao.png';
import NaverIcon from '../../assets/images/naver.png';

const key = import.meta.env.VITE_KAKAO_API_KEY;
const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

const kakaoAuthTest = () => {
	location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${key}&redirect_uri=${redirectUri}&response_type=code`;
};

export const LoginPage = () => {
	return (
		<Card className="w-full max-w-[500px] mx-auto h-[400px] mt-20 border-2">
			<p className="text-2xl mx-auto font-semibold mb-10">Speechless에 로그인</p>

			<CustomButton color="google" size="lg" bordered className="w-3/4 mx-auto py-2 flex items-center justify-center gap-3">
				<img src={GoogleIcon} alt="G" className="w-8 h-8" />
				<span>구글 계정으로 로그인</span>
			</CustomButton>
			<CustomButton onClick={ kakaoAuthTest }
						  color="kakao"
						  size="lg"
						  bordered
						  className="w-3/4 mx-auto py-2 flex items-center justify-center gap-3">
				<img src={KakaoIcon} alt="K" className="w-8 h-8" />
				<span>카카오 계정으로 로그인</span>
			</CustomButton>
			<CustomButton color="naver" size="lg" bordered className="w-3/4 mx-auto py-2 flex items-center justify-center gap-3">
				<img src={NaverIcon} alt="N" className="w-8 h-8" />
				<span>네이버 계정으로 로그인</span>
			</CustomButton>
		</Card>
	);
};
