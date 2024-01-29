import { useEffect } from 'react';
import { List, Button } from 'flowbite-react';
import { EssayInputModal } from './EssayInputModal';

export const EssayList: React.FC = () => {
    useEffect(() => {
        console.log('essayList');
    })

    return(
        <>
            <EssayInputModal/>
            <List>
                <List.Item className='mt-4 p-4 flex bg-primary-50 border-2 shadow-sm rounded-3xl'>
                    <div className='basis-1/2'>
                        <p className='m-2 text-lg tracking-tight text-gray-900 dark:text-white w-full'>title</p>
                    </div>
                    <div className='basis-1/4'>
                        <p className='m-2 tracking-tight text-gray-900 dark:text-white w-full'>content</p>
                    </div>

                    <div className='basis-1/4 flex flex-auto'>
                        <Button className='m-2 bg-primary-400 text-white'>테스트1</Button>
                        <Button className='m-2 bg-primary-400 text-white'>테스트2</Button>
                    </div>
                </List.Item>
            </List>
        </>
    );


};
