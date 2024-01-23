import {Button, List, Card, Avatar } from 'flowbite-react';

export const MyPage = () => {
  return (
    <>
      <div className="grid xl:grid-cols-2 md:grid-cols-1 mx-16 p-24 border-2 gap-16 bg-pink-50 rounded-3xl">
        <div className="basis-1/5">
          <Card className="max-w-sm bg-primary-50" horizontal>
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
              <Button className="transition-transform ease-in-out duration-300 bg-primary-400 hover:-translate-y-1 hover:scale-110 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-md shadow-lg">
                회원 정보 수정
              </Button>
              <Button className="transition-transform ease-in-out duration-300 bg-gray-400 hover:-translate-y-1 hover:scale-110 hover:bg-negative-700 text-white font-bold py-2 px-4 rounded-md shadow-lg">
                회원 탈퇴
              </Button>
            </div>
          </Card>



          <List>
            <List.Item>
            <b className="font-normal text-gray-700 dark:text-gray-400"> 뱃지에 대한 정보 1 </b>
            </List.Item>
            <List.Item>
            <p className="font-normal text-gray-700 dark:text-gray-400"> 뱃지에 대한 정보 1 </p>
            </List.Item>
            <List.Item>
            <p className="font-normal text-gray-700 dark:text-gray-400"> 뱃지에 대한 정보 1 </p>
            </List.Item>
          </List>
        </div>
        <div className="basis-4/5">
          <div className="flex justify-between items-center bg-primary-100 rounded-3xl">
            <div className="basis-4/5 m-5">
              <img src="https://images.ctfassets.net/pdf29us7flmy/4FaqpZFMenRQoDl0LGqFes/02c40a20ee37917f3e117b9c599f132d/GOLD-6487-CareerGuide-Batch04-Images-GraphCharts-01-Line.png?w=720&q=100&fm=jpg" alt="dummy graph" />
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
          </div>

          <div className="flex justify-between mt-5 items-center bg-primary-100 rounded-3xl">
            <div className="basis-4/5 m-5">
              <img src="https://images.ctfassets.net/pdf29us7flmy/4FaqpZFMenRQoDl0LGqFes/02c40a20ee37917f3e117b9c599f132d/GOLD-6487-CareerGuide-Batch04-Images-GraphCharts-01-Line.png?w=720&q=100&fm=jpg" alt="dummy graph" />
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
          </div>
        </div>
      </div>

      <InterviewList data={essayData} header="자소서 관리"/>

      <InterviewList data={interviewData} header="완료한 면접 연습"/>

      <InterviewList data={interviewData} header="채용 스피치 연습"/>
    </>
  );
};


const InterviewItem = ({ title, date, feedback, buttonText }) => (
  <List.Item className="mt-4 flex bg-primary-50">
    <div className="w-3/6">
      <p className="m-2 text-2xl tracking-tight text-gray-900 dark:text-white w-full">
        {title}
      </p>
    </div>
    <div className="w-1/6">
      <p className="m-2 tracking-tight text-gray-900 dark:text-white w-full">
        {date}
      </p>
    </div>
    <div className="w-1/6">
      <p className="m-2 tracking-tight text-gray-900 dark:text-white w-full">
        {feedback}
      </p>
    </div>
    <Button className="w-1/6 m-2 bg-primary-400 text-white">{buttonText}</Button>
  </List.Item>
);

const InterviewList = ({ data, header }) => (
  <>
    <h1 className="mt-10 mx-16 text-4xl font-bold tracking-tight text-gray-900 dark:text-white w-full">
      {header}
    </h1>
    <List className="mx-16">
      {data.map((item, idx) => (
        <InterviewItem
          key={idx}
          title={item.title}
          date={item.date}
          feedback={item.feedback}
          buttonText={item.buttonText}
        />
      ))}
    </List>
  </>
);

const interviewData = [
  {
    title: "자유주제 5분 스피치",
    date: "2024.01.19 17:00 (2시간)",
    feedback: "표정:70% 발음:4",
    buttonText: "레포트 다운로드"
  },
  {
    title: "CS 스터디 발표 연습",
    date: "2024.02.10 14:00 (1시간 30분)",
    feedback: "표정:70% 발음:4",
    buttonText: "레포트 다운로드"
  },
  {
    title: "팀 프로젝트 발표 연습",
    date: "2024.03.05 16:00 (3시간)",
    feedback: "표정:70% 발음:4",
    buttonText: "레포트 다운로드"
  }
];

const essayData = [
  {
    title: "삼성 전자 상반기 신입사원 지원",
    date: "2024.03.05",
    feedback: "4개 문항",
    buttonText: "수정"
  }
]
