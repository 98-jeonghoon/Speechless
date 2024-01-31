import React, { useRef } from 'react';
import * as faceapi from 'face-api.js';

export const InterviewFUnction = () => {
	const [modelsLoaded, setModelsLoaded] = React.useState(false);
	const [captureVideo, setCaptureVideo] = React.useState(false);

	const videoRef = useRef<HTMLVideoElement>(null);
	const videoHeight = 480;
	const videoWidth = 640;
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const expressionsRef = useRef<number[]>([]);

	React.useEffect(() => {
		const loadModels = async () => {
			const MODEL_URL = '/models';

			Promise.all([
				faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
				faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
				faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
				faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
			]);
		};
		loadModels().then(() => setModelsLoaded(true));
	}, []);

	const startVideo = () => {
		setCaptureVideo(true);
		navigator.mediaDevices
			.getUserMedia({ video: { width: 300 } })
			.then((stream) => {
				const video = videoRef.current as unknown as HTMLVideoElement;
				if (video) {
					video.srcObject = stream;
					video.play();
				}
			})
			.catch((err) => {
				console.error('error:', err);
			});
	};

	const handleVideoOnPlay = () => {
		setInterval(async () => {
			if (canvasRef && canvasRef.current) {
				canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
				const displaySize = {
					width: videoWidth,
					height: videoHeight,
				};

				faceapi.matchDimensions(canvasRef.current, displaySize);

				const detections = await faceapi
					.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
					.withFaceLandmarks()
					.withFaceExpressions();

				if (detections.length == 1) {
					const happyScore = detections[0].expressions.happy;
					expressionsRef.current.push(happyScore);
				}
				console.log(expressionsRef.current);

				const resizedDetections = faceapi.resizeResults(detections, displaySize);
				const context = canvasRef.current?.getContext('2d');
				if (context) {
					context.clearRect(0, 0, videoWidth, videoHeight);
				}
				canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
				canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
				canvasRef &&
					canvasRef.current &&
					faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
			}
		}, 1000);
	};

	const closeWebcam = () => {
        if (videoRef.current) {
		videoRef.current.pause();
			const mediaStream = videoRef.current.srcObject as MediaStream;
        	if (mediaStream) {
            	mediaStream.getTracks().forEach(track => track.stop());
        	}
        }
		setCaptureVideo(false);
	};

	return (
		<div>
			<div style={{ textAlign: 'center', padding: '10px' }}>
				{captureVideo && modelsLoaded ? (
					<button
						onClick={closeWebcam}
						style={{
							cursor: 'pointer',
							backgroundColor: 'green',
							color: 'white',
							padding: '15px',
							fontSize: '25px',
							border: 'none',
							borderRadius: '10px',
						}}
					>
						Close Webcam
					</button>
				) : (
					<button
						onClick={startVideo}
						style={{
							cursor: 'pointer',
							backgroundColor: 'green',
							color: 'white',
							padding: '15px',
							fontSize: '25px',
							border: 'none',
							borderRadius: '10px',
						}}
					>
						Open Webcam
					</button>
				)}
			</div>
			{captureVideo ? (
				modelsLoaded ? (
					<div>
						<div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
						<video
							ref={videoRef}
							height={videoHeight}
							width={videoWidth}
							onPlay={handleVideoOnPlay}
							style={{ borderRadius: '10px' }}
						>
							<track src="captions_en.vtt" kind="captions" srcLang="en" label="English captions" />
							</video>
							<canvas ref={canvasRef} style={{ position: 'absolute' }} />
						</div>
					</div>
				) : (
					<div>loading...</div>
				)
			) : (
				<></>
			)}
		</div>
	);
};
