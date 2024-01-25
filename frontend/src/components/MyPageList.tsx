import { List } from 'flowbite-react';
import { MyPageItem, MyPageItemProps } from './MyPageItem';

interface MyPageListProps {
	data: Array<MyPageItemProps>;
}

export const MyPageList: React.FC<MyPageListProps> = ({ data }: MyPageListProps) => (
	<>
		<List className=''>
			{data.map((item, idx) => (
				<MyPageItem key={idx} title={item.title} date={item.date} />
			))}
		</List>
	</>
);
