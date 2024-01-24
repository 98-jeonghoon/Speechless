import React, { useState } from 'react';
import {Button, List, Card, Avatar, Modal, TextInput } from 'flowbite-react';

export const MyPage = () => {
  return (
    <>
      <div className="flex flex-wrap w-3/5 p-5 gap-5 border-2 rounded-3xl mx-auto">
        
        <div className="basis-1/3">
          <Card className="mx-2 bg-gray-50 border-2 mb-20">
            <div>
              <Avatar img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" size="xl" rounded></Avatar>
            </div>
            <div>
              <h5 className="text-2xl font-bold tracking-widest text-gray-900">
                한태희
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                아이디: xotpqnd
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                이메일: xotpqnd@gmail.com
              </p>
            </div>

            <div className="flex w-full justify-center gap-4 py-4">
              <Button size="sm" className="transition-transform ease-in-out duration-300 bg-gray-400 hover:-translate-y-1 hover:scale-110 hover:bg-negative-700 text-white font-bold py-2 px-4 rounded-md shadow-lg">
                회원 탈퇴
              </Button>
            </div>
          </Card> 
        </div>

        <div className="basis-3/5">
          <Card className="mx-2 bg-gray-50 border-2 mb-20">
            <div className="basis-4/5 m-5">
              <img src="https://wcs.smartdraw.com/chart/img/basic-bar-graph.png?bn=15100111903" alt="dummy graph" />
            </div>
            <div className="basis-1/5">
              <h5 className="text-xl font-semibold text-gray-800">긍정적 감정</h5>
              <p className="text-base text-gray-600">
                평균: <span className="font-medium text-primary-600">76%</span>
              </p>
              <p className="text-base text-gray-600">
                최고: <span className="font-medium text-primary-600">95%</span>
              </p>
              <p className="text-base text-gray-600">
                최근: <span className="font-medium text-primary-600">84%</span>
              </p>
            </div>   

            <div className="basis-4/5 m-5">
              <img src="https://wcs.smartdraw.com/chart/img/basic-bar-graph.png?bn=15100111903" alt="dummy graph" />
            </div>
            <div className="basis-1/5">
              <h5 className="text-xl font-semibold text-gray-800">발음</h5>
              <p className="text-base text-gray-600">
                평균: <span className="font-medium text-primary-600">3.4</span>
              </p>
              <p className="text-base text-gray-600">
                최고: <span className="font-medium text-primary-600">5</span>
              </p>
              <p className="text-base text-gray-600">
                최근: <span className="font-medium text-primary-600">4</span>
              </p>
            </div>

          </Card>

        </div>

      </div>

      <div className="items-center w-3/5 p-24 m-5 border-2 rounded-3xl mx-auto">
        <p className="text-2xl ml-4 mb-4">해야할 스피치 연습</p>
        <InterviewList data={interviewData}/>
      </div>

      <div className="items-center w-3/5 p-24 m-5 border-2 rounded-3xl mx-auto">
        <p className="text-2xl ml-4 mb-4">완료한 스피치 연습</p>
        <InterviewList data={interviewData}/>
      </div>

      <div className="items-center w-3/5 p-24 m-5 border-2 rounded-3xl mx-auto">
        <EssayInputModal/>
        <InterviewList data={essayData}/>
      </div>

      <div className="items-center w-3/5 p-24 m-5 border-2 rounded-3xl mx-auto">
        <InterviewList data={interviewData}/>
      </div>
    </>
  );
};

interface InterviewListProps {
  data: Array<InterviewItemProps>;
}

const InterviewList: React.FC<InterviewListProps> = ({ data }: InterviewListProps) => (
  <>
    <List className="">
      {data.map((item, idx) => (
        <InterviewItem
          key={idx}
          title={item.title}
          date={item.date}
        />
      ))}
    </List>
  </>
);

interface InterviewItemProps {
  title: string;
  date: string;
}

const InterviewItem: React.FC<InterviewItemProps> = ({ title, date}: InterviewItemProps) => (
  <List.Item className="mt-4 p-4 flex bg-primary-50 border-2 shadow-sm rounded-3xl">
    <div className="basis-1/2">
      <p className="m-2 text-lg tracking-tight text-gray-900 dark:text-white w-full">
        {title}
      </p>
    </div>
    <div className="basis-1/4">
      <p className="m-2 tracking-tight text-gray-900 dark:text-white w-full">
        {date}
      </p>
    </div>

    <div className="basis-1/4 flex flex-auto">
      <Button className="m-2 bg-primary-400 text-white">{}</Button>
      <Button className="m-2 bg-primary-400 text-white">{}</Button>
    </div>
  </List.Item>
);

const EssayInputModal: React.FC = () => {
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
  
const interviewData = [
  {
    title: "자유주제 5분 스피치",
    date: "2024.01.19 17:00",
  },
  {
    title: "CS 스터디 발표 연습",
    date: "2024.02.10 14:00 ",
  },
  {
    title: "팀 프로젝트 발표 연습",
    date: "2024.03.05 16:00",
  }
];

const essayData = [
  {
    title: "삼성 전자 상반기 신입사원 지원",
    date: "2024.03.05",
  }
]

