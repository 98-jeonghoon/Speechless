import React from 'react';
import { Button, Card, Avatar, List } from 'flowbite-react';
import { MyPageItem } from '../../components/MyPageItem';
import { EssayList } from '../../components/EssayList';

export const MyPage = () => {
	return (
		<>
			<div className='flex flex-wrap w-3/5 p-5 gap-5 border-2 rounded-3xl mx-auto'>
				<div className='basis-1/3'>
					<Card className='mx-2 bg-gray-50 border-2 mb-20'>
						<div>
							<Avatar
								img='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
								size='xl'
								rounded
							></Avatar>
						</div>
						<div>
							<h5 className='text-2xl font-bold tracking-widest text-gray-900'>한태희</h5>
							<p className='font-normal text-gray-700 dark:text-gray-400'>아이디: xotpqnd</p>
							<p className='font-normal text-gray-700 dark:text-gray-400'>이메일: xotpqnd@gmail.com</p>
						</div>

						<div className='flex w-full justify-center gap-4 py-4'>
							<Button
								size='sm'
								className='transition-transform ease-in-out duration-300 bg-gray-400 hover:-translate-y-1 hover:scale-110 hover:bg-negative-700 text-white font-bold py-2 px-4 rounded-md shadow-lg'
							>
								회원 탈퇴
							</Button>
						</div>
					</Card>
				</div>

				<div className='basis-3/5'>
					<Card className='mx-2 bg-gray-50 border-2 mb-20'>
						<div className='basis-4/5 m-5'>
							<img
								src='https://wcs.smartdraw.com/chart/img/basic-bar-graph.png?bn=15100111903'
								alt='dummy graph'
							/>
						</div>
						<div className='basis-1/5'>
							<h5 className='text-xl font-semibold text-gray-800'>긍정적 감정</h5>
							<p className='text-base text-gray-600'>
								평균: <span className='font-medium text-primary-600'>76%</span>
							</p>
							<p className='text-base text-gray-600'>
								최고: <span className='font-medium text-primary-600'>95%</span>
							</p>
							<p className='text-base text-gray-600'>
								최근: <span className='font-medium text-primary-600'>84%</span>
							</p>
						</div>

						<div className='basis-4/5 m-5'>
							<img
								src='https://wcs.smartdraw.com/chart/img/basic-bar-graph.png?bn=15100111903'
								alt='dummy graph'
							/>
						</div>
						<div className='basis-1/5'>
							<h5 className='text-xl font-semibold text-gray-800'>발음</h5>
							<p className='text-base text-gray-600'>
								평균: <span className='font-medium text-primary-600'>3.4</span>
							</p>
							<p className='text-base text-gray-600'>
								최고: <span className='font-medium text-primary-600'>5</span>
							</p>
							<p className='text-base text-gray-600'>
								최근: <span className='font-medium text-primary-600'>4</span>
							</p>
						</div>
					</Card>
				</div>
			</div>

			<div className='items-center w-3/5 p-24 m-5 border-2 rounded-3xl mx-auto'>
				<p className='text-2xl ml-4 mb-4'>해야할 스피치 연습</p>
				<List>
					{MyPageData.map((item, idx) => (
						<MyPageItem key={idx} title={item.title} date={item.date} />
					))}
				</List>
			</div>

			<div className='items-center w-3/5 p-24 m-5 border-2 rounded-3xl mx-auto'>
				<p className='text-2xl ml-4 mb-4'>완료한 스피치 연습</p>
				<List>
					{MyPageData.map((item, idx) => (
						<MyPageItem key={idx} title={item.title} date={item.date} />
					))}
				</List>
			</div>

			<div className='items-center w-3/5 p-24 m-5 border-2 rounded-3xl mx-auto'>
				<p className='text-2xl ml-4 mb-4'>면접 사전 정보 관리</p>
				<EssayList/>
			</div>

			<div className='items-center w-3/5 p-24 m-5 border-2 rounded-3xl mx-auto'>
				<p className='text-2xl ml-4 mb-4'>완료한 면접 연습</p>
				<List>
					{MyPageData.map((item, idx) => (
						<MyPageItem key={idx} title={item.title} date={item.date} />
					))}
				</List>
			</div>
		</>
	);
};

const MyPageData = [
	{
		title: '자유주제 5분 스피치',
		date: '2024.01.19 17:00',
	},
	{
		title: 'CS 스터디 발표 연습',
		date: '2024.02.10 14:00 ',
	},
	{
		title: '팀 프로젝트 발표 연습',
		date: '2024.03.05 16:00',
	},
];