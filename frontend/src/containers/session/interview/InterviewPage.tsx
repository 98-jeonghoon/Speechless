/* eslint-disable jsx-a11y/media-has-caption */

import {useCallback, useEffect, useRef, useState} from 'react';
import { Button } from 'flowbite-react';
import { CustomButton } from '../../../components/CustomButton.tsx';

import { useLocalAxios } from '../../../utils/axios.ts';
import { useNavigate } from "react-router-dom";

import { useInterviewSessionStore } from "../../../stores/session.ts";
import {Device, OpenVidu, Publisher, Session, StreamManager, Subscriber} from "openvidu-browser";
import {OpenViduVideo} from "../../../components/OpenViduVideo.tsx";

export const InterviewPage = () => {

	const localAxios = useLocalAxios();
	const navigate = useNavigate();

	const interviewSessionStore = useInterviewSessionStore();

	let OV: OpenVidu | null = null;
	const [ session, setSession ] = useState<Session | null>(null);
	const [ mainStreamManager, setMainStreamManager ] = useState<StreamManager | null>(null);
	const [ publisher, setPublisher ] = useState<Publisher | null>(null);
	const [ subscribers, setSubscribers ] = useState<(Publisher | Subscriber | StreamManager)[]>([]);
	const [ currentVideoDevice, setCurrentVideoDevice ] = useState<Device | undefined>(undefined);

	const [ videoEnabled, setVideoEnabled ] = useState(true);
	const [ audioEnabled, setAudioEnabled ] = useState(true);

	const [ currentQuestion, setCurrentQuestion ] = useState('');

	// 페이지 진입시 서비스 플로우 시작
	useEffect(() => {
		OV = new OpenVidu();

		initSession()
			.then(() => {
				setPresetQuestions();
			})
			.catch((e) => {
				console.error(e);
				// 에러가 발생해서 session을 초기화하지 못했으므로 에러 페이지로 이동
				interviewSessionStore.clearSession();
				navigate('/error', {
					replace: true,
					state: {
						code: 404,
						message: '세션을 찾지 못했습니다. 이미 종료된 세션일 가능성이 높습니다.'
					}
				});
			});
	}, []);

	const setPresetQuestions = async () => {
		//const response = await localAxios.get('basic-question');
		//const presetQuestions = response.data;
		const presetQuestions = [
			"1분 자기소개 해주세요.",
			"본인이 지원한 직무에 대해 설명해주세요.",
			"본인이 가장 잘한 프로젝트에 대해 설명해주세요.",
			"본인이 가장 어려웠던 프로젝트에 대해 설명해주세요.",
			"본인이 가장 자신있는 기술에 대해 설명해주세요.",
			"본인이 가장 부족하다고 생각하는 기술에 대해 설명해주세요.",
			"본인이 가장 중요하다고 생각하는 가치에 대해 설명해주세요.",
			"인생에서 가장 힘들었던 경험이 무엇인가요?",
			"왜 이 직무를 선택했나요?",
			"동료, 친구들이 나를 어떤 사람으로 생각할까요?",
			"본인의 장단점에 대해 설명해주세요.",
			"평소에 스트레스를 해소하는 방법은 무엇인가요?",
			"본인이 가장 좋아하는 책은 무엇인가요?",
			"본인의 취미는 무엇인가요?",
			"왜 굳이 우리 회사에 지원하려고 하나요?",
			"동료가 잘못을 했을 때 어떻게 조치할 것인가요?"
		];

		// presetQuestions 중에서 랜덤으로 5개를 뽑아서 interviewSessionStore에 저장
		const randomQuestions = presetQuestions.sort(() => Math.random() - Math.random()).slice(0, 5);
		interviewSessionStore.setQuestions(randomQuestions.map((question) => ({ question, answer: '' })));
		interviewSessionStore.setQuestionCursor(0);

		console.log(interviewSessionStore);
		startQuestion();
	};

	const startQuestion = useCallback(() => {
		// 질문 시작
		setCurrentQuestion(interviewSessionStore.questions[interviewSessionStore.questionCursor].question);
	}, [interviewSessionStore]);

	// Connection을 생성해주는 함수
	// 면접 페이지에서는 따로 다인 세션을 생성하지 않으므로, 페이지 진입시 session 생성
	const createConnection = async (sessionId: string) => {
		const response = await localAxios.post('openvidu/sessions/' + sessionId + '/connections', {}, {
			headers: { 'Content-Type': 'application/json', },
		});

		return response.data;
	}

	const initSession = useCallback(async () => {
		if (session !== null) return;
		if (!OV) return;

		const mySession = OV.initSession();

		console.log("init");
		mySession.on('streamCreated', (event) => {
			const subscriber = mySession.subscribe(event.stream, undefined);
			setSubscribers((prevSubscribers) => [ ...prevSubscribers, subscriber ]);
		});

		mySession.on('streamDestroyed', (event) => {
			deleteSubscriber(event.stream.streamManager);
		});

		mySession.on('exception', (exception) => {
			console.warn(exception);
		});

		setSession(mySession);

		if (!interviewSessionStore.sessionId) {
			navigate('/error/404');
			return;
		}

		const sessionId = interviewSessionStore.sessionId;
		const connectionData = await createConnection(sessionId);

		interviewSessionStore.setConnection(
			connectionData.connectionId,
			connectionData.token
		);

		console.log(interviewSessionStore);

		await mySession.connect(connectionData.token);
		const _publisher = await OV.initPublisherAsync(undefined, {
			audioSource: undefined,
			videoSource: undefined,
			publishAudio: audioEnabled,
			publishVideo: videoEnabled,
			resolution: '640x480',
			frameRate: 30,
			insertMode: 'APPEND',
			mirror: true
		});

		await mySession.publish(_publisher);

		let devices = await OV.getDevices();
		let videoDevices = devices.filter(device => device.kind === 'videoinput');
		let currentVideoDeviceId = _publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
		const _currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

		setMainStreamManager(_publisher);
		setPublisher(_publisher);
		setCurrentVideoDevice(_currentVideoDevice);

		console.log(_publisher);
	}, [interviewSessionStore]);

	const deleteSubscriber = useCallback((streamManager: StreamManager) => {
		setSubscribers((prevSubscribers) => {
			const index = prevSubscribers.indexOf(streamManager);
			if (index > -1) {
				const newSubscribers = [...prevSubscribers];
				newSubscribers.splice(index, 1);
				return newSubscribers;
			} else {
				return prevSubscribers;
			}
		});
	}, [subscribers]);

	const toggleVideo = useCallback(() => {
		setVideoEnabled(!videoEnabled);

		console.log(mainStreamManager);
		if (publisher) publisher.publishVideo(videoEnabled);
	}, [videoEnabled]);

	const toggleAudio = useCallback(() => {
		setAudioEnabled(!audioEnabled);

		if (publisher) publisher.publishAudio(audioEnabled);
	}, [audioEnabled]);

	const startAnswer = useCallback(async () => {
		const response = await localAxios.post('openvidu/recording/start/' + interviewSessionStore.sessionId)
		console.log(response);
		console.log("answer start");
	}, []);

	const stopAnswer = useCallback(async () => {
		const response = await localAxios.post('openvidu/recording/stop/' + interviewSessionStore.sessionId)
		console.log(response);
		console.log("answer stop");
	}, []);

	return (
		<div className='p-10 w-[100vw] h-[100vh] bg-gradient-to-b from-white to-gray-200 flex flex-col'>
			<div className='session-header flex justify-end'>
				<CustomButton size='lg' color='negative'>
					면접 종료
				</CustomButton>
			</div>
			<div className='session-title flex justify-center mt-6 text-3xl'>
				{currentQuestion}
			</div>
			<div className='session-body flex-1 p-10'>
				<div className='session-content grid grid-cols-2 flex-1'>
					<div className='session-screen flex flex-col items-center justify-center'>
						<div className='session-screen-container flex flex-col'>
							<div className='session-screen-header flex justify-end py-3 gap-4'>
								<div className='session-indicator-expression flex gap-2 items-center'>
									<span className='text-xl font-semibold'>표정</span>
									<span className='material-symbols-outlined text-yellow-400 text-5xl'>
										sentiment_satisfied
									</span>
								</div>
								<div className='session-indicator-voice flex gap-2 items-center'>
									<span className='text-xl font-semibold'>발음</span>
									<span className='material-symbols-outlined text-yellow-400 text-5xl'>
										sentiment_satisfied
									</span>
								</div>
							</div>
							{
								mainStreamManager
									? <OpenViduVideo streamManager={mainStreamManager}/>
									: null
							}
						</div>
					</div>
					<div className='session-ui'>
						{
							interviewSessionStore.questions.slice(0, interviewSessionStore.questionCursor + 1).map((question, index) => {
								return (
									<div key={index}>
										<div className='w-full flex justify-start'>
											<div className='session-question flex justify-center items-center'>
												{question.question}
											</div>
										</div>
										<div className='w-full flex justify-end'>
											<div className='session-answer flex justify-center items-center'>
												{question.answer}
											</div>
										</div>
									</div>
								);
							})
						}
					</div>
				</div>
			</div>
			<div className='session-footer flex justify-center'>
				<Button color='blue' onClick={toggleAudio}>마이크 토글</Button>
				<Button color='blue' onClick={toggleVideo}>카메라 토글</Button>
				<Button color='blue' onClick={startAnswer}>답변 시작</Button>
				<Button color='blue' onClick={stopAnswer}>답변 종료</Button>
			</div>
		</div>
	);
};
