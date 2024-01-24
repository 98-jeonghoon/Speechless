import React, { useState } from 'react';
import { Button, Modal, TextInput } from 'flowbite-react';

export const EssayInputModal: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const [questions, setQuestions] = useState([{ question: '', answer: '' }]);
    const addQuestion = () => {
      setQuestions([...questions, { question: '', answer: '' }]);
    };

    const removeQuestion = (index:number) => {
      const newQuestions = questions.slice(); // 배열 복사
      newQuestions.splice(index, 1); // 특정 인덱스의 요소를 삭제
      setQuestions(newQuestions); // 새로운 배열로 상태 업데이트
    };
  
    return (
      <>
        <Button className="bg-primary-400" onClick={() => setOpenModal(true)}>Toggle modal</Button>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>면접 사전 정보 편집</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                제목
              </p>
              <TextInput id="essay-title" />
  
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    기업 이름
                  </p>
                  <TextInput id="essay-company-name" />
                </div>
                <div>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    지원 포지션
                  </p>
                  <TextInput id="essay-position" />
                </div>
                <div>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    경력
                  </p>
                  <TextInput placeholder="신입은 0 입력" id="essay-title" />
                </div>
              </div>
  
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                자기소개서
              </p>
              {questions.map((_, index) => (
                <div key={index} className="p-3 bg-primary-50">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  문항
                </p>
                <TextInput id={`question-${index}`} value={questions[index].question} onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[index].question = e.target.value;
                  setQuestions(newQuestions);
                }} />
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  답변
                </p>
                <TextInput id={`answer-${index}`} value={questions[index].answer} onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[index].answer = e.target.value;
                  setQuestions(newQuestions);
                }} />
                  <Button onClick={() => removeQuestion(index)} className="bg-negative-400 mt-2">
                    삭제
                  </Button>
                </div>
              ))}
              <Button className="bg-primary-400" onClick={addQuestion}>문항 추가</Button>

  
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color="green" onClick={() => setOpenModal(false)}>I accept</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }