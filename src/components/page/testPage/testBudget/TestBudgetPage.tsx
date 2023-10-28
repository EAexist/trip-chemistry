import { useCallback, useState } from 'react';
import { MaterialSlider } from '../../../Slider';
import useValueToBound from '../../../../common/hooks/useValueToBound';
import { WithTestResponseProps } from '../../../../common/hocs/withTestResponse';
import getImgSrc, { FORMATSVG, FORMATWEBP } from '../../../../common/utils/getImgSrc';
import { WithAnimationWrapper } from '../../../../common/hocs/withAnimation';
import { Divider, Icon } from '@mui/material';
import { ArrowRight } from '@mui/icons-material';
import { Card, CardDetail, CardImage } from '../../../Card';
import { usePageString, useString } from '../../../../texts';
import TestContainer from '../../../typography/TestContainer';
import Logo from '../../../Logo';
import FocusContainer from '../../../FocusContainer';
import { FocusSummary } from '../../../../common/focus/FocusContext';

interface TestBudgetPageProps extends WithTestResponseProps{
};

function TestBudgetPage({testResponse, setTestResponse, strings}: TestBudgetPageProps){
    
    const pageStrings = usePageString('test').budget;
    const commonStrings = useString('common');
    const linkTypeStrings = useString('linkType');

    const sliderProps = strings.sliderProps;
    const budgetLowerBounds : number[] = strings.budgetLowerBounds;
        
    const priceText = (value: number) => {
        return `${value < 10000 ? 
            value.toString() 
            :`${value/10000}만`}원 ${(value === sliderProps.max)?'이상' : ''}`
    }

    /* 응답한 값 (예산 금액)을 인덱스(레벨)로 변환해 인덱스에 대응하는 컨텐츠를 보여줌. */
    const [bugetBound, setBudgetIndex] = useValueToBound({ boundList: budgetLowerBounds });
    if (testResponse !== undefined){
        setBudgetIndex(testResponse);
    }
    /* 응답 여부 */
    const [isAnswered, setIsAnswered] = useState<boolean>(false);
    
    const imagePathBase = '/test/budget/food';
    
    /* Deprecated: 레스토랑 사진 디스플레이 를 위한 스타일 오브젝트 (*css background-image 사용)*/
    // const bugetBoundImageStyle = {backgroundImage: `url("${getImgSrc('/test/budget/food', `${bugetBound}-1`, FORMATWEBP)}")`};

    /* 예산 슬라이더 핸들러 */
    const handleChangeSlider = useCallback((event: Event, newValue: number | number[]) => {  
        setIsAnswered(true);   
        console.log(`TestBudget: isAnswered = ${isAnswered}`)
        setTestResponse(newValue as number);
    }, []);

    return(       
        /* 페이지 */
        <div className='w-full h-full px-16'>
        <TestContainer
            title={strings.title}
            subtitle={pageStrings.subtitle}
            variant='centered'
        >
                {/* 테스트 */}
                <div className='w-full h-full flex flex-col items-center space-y-8'>
                {/* 응답 UI */}
                <div className='flex flex-col items-center'>
                    {/* 응답 값 디스플레이: 예산 e.g. 4만원 */}
                    <div className='h-24 text-center flex items-center'>
                        {
                            testResponse ? 
                            <h2>{priceText(testResponse)}</h2> 
                            : <h4>{pageStrings.defaultPriceText}</h4>
                        }
                    </div>
                    {/* 슬라이더 */}
                    <MaterialSlider
                        size="small"
                        aria-label="Small"
                        valueLabelDisplay="auto"
                        getAriaValueText={priceText}
                        value={testResponse}
                        onChange={handleChangeSlider}
                        sx={{ width: '24rem' }}
                        {...sliderProps}
                    />
                </div>

                {/* 응답에 따른 예시 이미지카드 Carousel */}
                {/* <WithAnimationWrapper>     */}
                <div className='flex flex-row items-center space-x-2'>
                    {(bugetBound !== undefined) && strings.examples[bugetBound] && Object.entries(strings.examples[bugetBound])?.map(([key, item]: [key: string, item: any]) => {
                        
                        console.log(`TestBudgetPage: city=${item.city}`)
                        const city = commonStrings.city[item.city]
                        const nation = commonStrings.nation[city.nation]
                        
                        return (item && /* 응답에 따른 예시 상품 (e.g. 레스토랑 메뉴 / 숙소 객실 또는 뷰) 정보 카드 컴포넌트 */

                        /* 음식 정보 카드 컴포넌트 */
                        <FocusContainer
                            classNameWithSize='w-64 h-40'
                            animation='focusCard'
                        >
                        <Card className='w-full h-fit flex flex-col'>
                            <CardImage
                                image={getImgSrc(imagePathBase, `${item.restaurant}`, FORMATWEBP)}
                                alt={item.name}
                            >                             
                                <div className='flex flex-row absolute bottom-0 p-2 w-full justify-between'>                                    
                                    <h5 className='font-bold text-white'>{item.name}</h5>
                                    <FocusSummary><Icon className='text-white'>play_circle</Icon></FocusSummary> 
                                </div>   
                            </CardImage>
                            <CardDetail>
                                <div className='flex flex-col px-4 space-y-2 py-4'>                                    
                                    <div className='flex flex-row space-x-2 items-center'> {/* 상품 정보: 상품 이름, 위치한 도시, 국가, 국기 */}
                                        <h5>{item.restaurantName}</h5>
                                        <Divider orientation="vertical" />
                                        <h6>{city.name}</h6>
                                        <h6> | </h6>
                                        <h6>{nation.name}</h6>
                                        {nation.flag && <span className={`fi fi-${city.nation}`}></span>} {/* 국기 */}
                                    </div>
                                    <a href={item.link} target="_blank" rel="noopener noreferrer"> {/* 디테일 보기 (e.g. 음식 -> 타베로그, 식당 자체 웹사이트 / 숙소 -> Hotels.com, 숙소 자체 웹사이트) @TODO: 카드 자체 클릭으로 변경 가능*/}
                                        <div className='flex flex-row items-center space-x-1'>
                                            <Logo id={item.linkType} className='h-5' />
                                            <h6>{commonStrings.linkType[city.linkType].name}{pageStrings.linkText}</h6>
                                            <ArrowRight fontSize='inherit' />
                                        </div>
                                    </a>
                                </div>
                            </CardDetail>
                        </Card>
                        </FocusContainer>
                        );
                    } 
                    )}
                </div>
                {/* </WithAnimationWrapper> */}
                </div>
            </TestContainer>
        </div>    
    );
}
export default TestBudgetPage;