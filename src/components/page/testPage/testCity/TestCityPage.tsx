import { useState } from 'react';
import { WithTestResponseProps } from '../../../../common/hocs/withTestResponse';
import { formatPng, formatSvg, formatWebp } from '../../../../common/utils/getImgSrc';
import getImgSrc from '../../../../common/utils/getImgSrc';
import { ArrowRight } from '@mui/icons-material';
import { Card, CardDetail, CardImage } from '../../../Card';
import { usePageString, useString } from '../../../../texts';
import TestContainer from '../../../TestContainer';
import ToggleButton from '../../../ToggleButton';
import { Icon } from '@mui/material';
import Logo from '../../../Logo';
import { common } from '@mui/material/colors';
import { FocusDetail, FocusSummary } from '../../../../common/focus/FocusContext';
import FocusContainer from '../../../FocusContainer';

interface TestCityPageProps extends WithTestResponseProps{
    // budg: SubTestName
};

const priceText = (value: number) => {
    return `${value < 10000 ? value.toString() : `${value/10000}만`}원`
}

function TestCityPage({subTestName, testResponse, setTestResponse, strings}: TestCityPageProps){
    
    const pageStrings = usePageString('test').city;
    const commonStrings = useString('common');

    /* 응답 여부 */
    const [isAnswered, setIsAnswered] = useState(false);
    const [hoveredResponse, setHoveredResponse] = useState<number>(-1);

    const imagePathBase = '/city';

    return(       
        /* 페이지 */
        <TestContainer
            title={pageStrings.title}
            subtitle={pageStrings.subtitle}
            variant='centered'
        >
            <div className='flex flex-col items-center space-y-8'>

                {/* 제목, 응답 UI */}
                <div className='flex flex-col w-128 items-center space-y-4'>

                    {/* 제목 */}
                    <h3>{strings.title}</h3>

                    {/* 응답 버튼 */}
                    <div className='flex flex-row space-x-6'>
                    {
                        pageStrings.answers.map((answer: any, index: number)=>{
                            
                            const isActive = answer.value === testResponse || answer.value === hoveredResponse

                            return(           
                                <div className='flex flex-col items-center'>                    
                                    <ToggleButton
                                        isActive={isActive} 
                                        onMouseEnter={()=>setHoveredResponse(answer.value)}
                                        onMouseLeave={()=>setHoveredResponse(-1)}
                                        onClick={() => setTestResponse(answer.value)} 
                                        variant='icon'
                                        // className='min-w-24'
                                    >
                                        <div className="flex flex-row space-x-4 px-1 min-w-6">
                                            <div className='flex flex-col'>
                                                <h4 className=''>{answer.emoji}</h4>
                                            </div>
                                            {
                                                // withShowOnHover(()=>( /* 마우스를 올렸을 때 보이는 Element */
                                                //     <div className="flex flex-row">
                                                //         <p>{emoji}</p>
                                                //         <p className=''>{quote}</p>
                                                //     </div>
                                                // ))({id: index, force: isUsedAsResponse || undefined})({})
                                            }
                                            {/* <OptionDetail /> */}
                                        </div>
                                    </ToggleButton> 
                                    <div className='relative h-6 w-fit'>
                                {isActive && 
                                    <h6 className='absolute whitespace-nowrap -translate-x-1/2 '>{answer.quote}</h6>                                        
                                }
                                </div>
                                </div>
                            )

                        })
                    }
                    </div>
                </div>

                {/* 응답에 따른 예시 이미지카드 Carousel */}
                <div className='flex flex-row items-center space-x-2'>
                    {strings.examples?.map((cityId: keyof typeof commonStrings.city) => {

                        const city = commonStrings.city[cityId]
                        const nation = commonStrings.nation[city.nation]

                        return (city && 

                            /* 도시 정보 카드 컴포넌트 */
                            <FocusContainer
                                classNameWithSize='w-64 h-40'
                                animation='focusCard'
                            >
                            <Card className='w-full h-fit flex flex-col'>
                                <CardImage
                                    image={getImgSrc(imagePathBase, `${String(cityId)}`, formatWebp)}
                                    alt={city.name}
                                >
                                    <div className='flex flex-row absolute bottom-0 p-2 w-full justify-between'>
                                        <div className='flex flex-row space-x-2 items-center'> {/* 상품 정보: 상품 이름, 위치한 도시, 국가, 국기 */}
                                            <h5 className='font-bold text-white'>{city.name}</h5>
                                            <h6 className=' text-white'> | </h6>
                                            <h6 className='text-white'>{nation.name}</h6>
                                            {nation.flag && <span className={`fi fi-${city.nation}`}></span>} {/* 국기 */}
                                        </div>    
                                        <FocusSummary><Icon className='text-white'>play_circle</Icon></FocusSummary>                                        
                                    </div>
                                </CardImage>
                                <CardDetail>
                                    <div className='flex flex-col px-4 space-y-2 py-4'>
                                        <a href={city.link} target="_blank" rel="noopener noreferrer"> {/* 디테일 보기 (e.g. 음식 -> 타베로그, 식당 자체 웹사이트 / 숙소 -> Hotels.com, 숙소 자체 웹사이트) @TODO: 카드 자체 클릭으로 변경 가능*/}
                                            <div className='flex flex-row items-center space-x-1'>
                                                <Logo id={city.linkType} className='h-5' />
                                                <h6>{commonStrings.linkType[city.linkType].name}{pageStrings.linkText}</h6>
                                                <ArrowRight fontSize='inherit' />
                                            </div>
                                        </a>
                                    </div>
                                </CardDetail>
                                </Card>
                            </FocusContainer>
                        )
                    })}
                </div>
            </div>
        </TestContainer>
    );
}

export default TestCityPage;