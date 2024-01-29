import { useEffect, useState } from 'react';
import { List, Button } from 'flowbite-react';
import { axios } from '../../utils/axios';
import { InterviewReport } from '../../types/Report';


export const InterviewReportView: React.FC = () => {
    const [reports, setReports] = useState<InterviewReport[]>([]);
    
    useEffect(() => {
        getReports();
    }, []);

    const getReports = () => {
        axios.get("reports")
        .then((res) => {
            setReports(res.data.reports);
        })
        .catch((err) => {
            console.log(err);
            setReports([
                {id:0, userId:0, topic: "삼성 상반기 임원 면접 연습"},
                {id:1, userId:1, topic: "삼성 상반기 임원 면접 연습"},
                {id:2, userId:2, topic: "삼성 상반기 임원 면접 연습"},
            ])
        })
    }

    return(
        <>
            <List>
                {reports.map((report) => (
                    <List.Item key={report.id} className='mt-4 p-1 flex bg-primary-50 border-2 shadow-sm rounded-3xl'>
                        <div className='basis-3/4'>
                            <p className='m-2 text-lg tracking-tight text-gray-900 dark:text-white w-full'>{report.topic}</p>
                        </div>
                        {/* <div className='basis-1/4'>
                            <p className='m-2 tracking-tight text-gray-900 dark:text-white w-full'>{report.company}</p>
                        </div> */}

                        <div className='basis-1/4 flex flex-auto'>
                            <Button className='m-1 bg-primary-300 text-white font-thin'>다운로드</Button>
                            <Button className='m-1 bg-negative-300 text-white font-thin'>삭제</Button>
                        </div>
                    </List.Item>
                ))}
            </List>
        </>
    );

};
