import { useState } from 'react';
import { WithTestResponseProps } from '../../../common/hoc/withTestResponse';
import { FORMATPNG, FORMATSVG, FORMATWEBP } from '../../../common/utils/getImgSrc';
import getImgSrc from '../../../common/utils/getImgSrc';
import { ArrowRight } from '@mui/icons-material';
import { Card, CardDetail, CardImage } from '../../Card';
import { usePageString, useString } from '../../../texts';
import TestTitleContainer from '../../typography/TestTitleContainer';
import ToggleButton from '../../ToggleButton';
import { Icon } from '@mui/material';
import Logo from '../../Logo';
import { common } from '@mui/material/colors';
import { FocusDetail, FocusSummary } from '../../../common/focus/FocusContext';
import FocusContainer from '../../FocusContainer';
import CityCard from '../../cityCard';

interface TestCityPageProps extends WithTestResponseProps{
    // budg: SubTestName
};

const priceText = (value: number) => {
    return `${value < 10000 ? value.toString() : `${value/10000}만`}원`
}

function TestCityPage({testIndex, testResponse, setTestResponse, strings}: TestCityPageProps){
    
    const testCityStrings = usePageString('test').city;
    const commonStrings = useString('common');

    /* 응답 여부 */
    const [isAnswered, setIsAnswered] = useState(false);
    const [hoveredResponse, setHoveredResponse] = useState<number>(-1);

    const imagePathBase = '/city';

    return(       
        /* 페이지 */
        <div className='page body'>
        <TestTitleContainer title={testCityStrings.title} subtitle={testCityStrings.subtitle} className='[&>*]:text-center'/>
            <div className='flex flex-col items-center space-y-8'>

                {/* 제목, 응답 UI */}
                <div className='flex flex-col w-128 items-center space-y-4'>

                    {/* 제목 */}
                    <h3>{strings.title}</h3>

                    {/* 응답 버튼 */}
                    <div className='flex flex-row space-x-6'>
                    {
                        (Object.entries(testCityStrings.answers) as [valueKey: string, answer: {label: string, quote: string, emoji: string}][]).map(([valueKey, answer], index)=>{
                            
                            const value = Number(valueKey);
                            const isActive = value === testResponse || value === hoveredResponse

                            return(           
                                <div className='flex flex-col items-center'>                    
                                    <ToggleButton
                                        isActive={isActive} 
                                        onMouseEnter={()=>setHoveredResponse(value)}
                                        onMouseLeave={()=>setHoveredResponse(-1)}
                                        onClick={() => setTestResponse(value)} 
                                        variant='icon'
                                        // className='min-w-24'
                                    >
                                        <div className="flex flex-row space-x-4 px-1 min-w-6">
                                            <div className='flex flex-col'>
                                                <h4 className=''>{answer.emoji}</h4>
                                            </div>
                                        </div>
                                    </ToggleButton> 
                                    <div className='relative h-6 w-fit'>
                                {isActive && <h6 className='absolute whitespace-nowrap -translate-x-1/2 '>{answer.quote}</h6>}
                                </div>
                                </div>
                            )

                        })
                    }
                    </div>
                </div>

                {/* 응답에 따른 예시 이미지카드 Carousel */}
                <div className='flex flex-row items-center space-x-2'>
                    {strings.examples?.map(( city : string ) => (
                        <CityCard city={city} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TestCityPage;