import React, { useState } from 'react';
import { Button, Modal, TextInput } from 'flowbite-react';
import { Statement } from '../../types/Statement';



export const EssayInputModal: React.FC = () => {
	const [openModal, setOpenModal] = useState(false);

const [formData, setFormData] = useState<Statement>(
	{
		title: '',
		company: '',
		position: '',
		career: '',
		questions: [{ question: '', answer: '' }],
	}
	);

	  
	const updateStringField = (field:string, value:string) => {
		setFormData(prev => ({ ...prev, [field]: value }));
	};

	const updateQuestionField = (field:JSON, value:Statement[]) => {
		
	}

	// const addQuestion = () => {
	// 	updateField('questions', [questions: [{ question: '', answer: '' }]]);
	// };

	// const removeQuestion = (index: number) => {
	// 	const newQuestions = formData.questions.slice();
	// 	newQuestions.splice(index, 1);
	// 	updateField('questions', newQuestions);
	// };

	const CreateStatement = () => {
		console.log(formData);
	}

	return (
		<>
			<Button className='bg-primary-400' onClick={() => setOpenModal(true)}>
				Toggle modal
			</Button>
			<Modal show={openModal} onClose={() => setOpenModal(false)}>
				<Modal.Header>면접 사전 정보 편집</Modal.Header>
				<Modal.Body>
					<div className='space-y-6'>
						<p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>제목</p>
						<TextInput value={formData.title} onChange={(e) => updateStringField('title', e.target.value)}/>

						<div className='grid grid-cols-3 gap-4'>
							<div>
								<p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>기업 이름</p>
								<TextInput value={formData.company} onChange={(e) => updateStringField('company', e.target.value)}/>
							</div>
							<div>
								<p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>지원 포지션</p>
								<TextInput value={formData.position} onChange={(e) => updateStringField('position', e.target.value)}/>
							</div>
							<div>
								<p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>경력</p>
								<TextInput value={formData.career} onChange={(e) => updateStringField('career', e.target.value)}/>
							</div>
						</div>

						<p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>자기소개서</p>
						{questions.map((_, index) => (
							<div key={index} className='p-3 bg-primary-50'>
								<p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>문항</p>
								<TextInput
									id={`question-${index}`}
									value={questions[index].question}
									onChange={(e) => {
										const newQuestions = [...questions];
										newQuestions[index].question = e.target.value;
										setQuestions(newQuestions);
									}}
								/>
								<p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>답변</p>
								<TextInput
									id={`answer-${index}`}
									value={questions[index].answer}
									onChange={(e) => {
										const newQuestions = [...questions];
										newQuestions[index].answer = e.target.value;
										setQuestions(newQuestions);
									}}
								/>
								{questions.length > 1 && (
									<Button onClick={() => removeQuestion(index)} className='bg-negative-400 mt-2'>
										삭제
									</Button>
        						)}

							</div>
						))}
						<Button className='bg-primary-400' onClick={addQuestion}>
							문항 추가
						</Button>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button color='green' onClick={() => setOpenModal(false)}>
						저장
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
