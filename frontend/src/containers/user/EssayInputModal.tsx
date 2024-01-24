import React, { useState } from 'react';
import { Button, Modal, TextInput } from 'flowbite-react';

export const EssayInputModal: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);
  
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
              <div className="p-3 bg-primary-50">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    문항
                  </p>
                  <TextInput />
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    답변
                  </p>
                  <TextInput />
              </div>
  
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setOpenModal(false)}>I accept</Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Decline
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }