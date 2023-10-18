import { useCallback, useState } from 'react';
import Slider from '../../../Slider';
import useValueToBound from '../../../../common/hooks/useValueToBound';
import { WithTestResponseProps } from '../../../../common/hocs/withTestResponse';
import useGetImgSrc, { formatSvg, formatWebp } from '../../../../common/utils/getImgSrc';
import getImgSrc from '../../../../common/utils/getImgSrc';
import Trail from '../../../spring/Trail';
import Card from '../../../Card';
import { WithAnimationWrapper } from '../../../../common/hocs/withAnimation';
import { CardActions, CardContent, CardMedia, Divider } from '@mui/material';
import { ArrowRight } from '@mui/icons-material';
import TestTitle from '../../../TestTitle';
import TestSubtitle from '../../../TestSubtitle';
import FocusableImageCard from '../../../FocusableImageCard';
import { usePageString, useString } from '../../../../texts';
import TestContainer from '../../../TestContainer';
import Logo from '../../../Logo';

interface TestBudgetPageProps extends WithTestResponseProps{
};

const sliderProps = {
    min: 5000,
    max: 70000,
    step: 5000,
};

const budgetLowerBounds : number[] = [
    5000,
    15000,
    25000,
    50000,
]

const priceText = (value: number) => {
    return `${value < 10000 ? 
        value.toString() 
        :`${value/10000}만`}원 ${(value === sliderProps.max)?'이상' : ''}`
}

function TestBudgetPage({testResponse, setTestResponse, strings}: TestBudgetPageProps){
    
    const pageStrings = usePageString('test').budget;
    const linkTypeStrings = useString('linkTypes');

    /* 응답한 값 (예산 금액)을 인덱스(레벨)로 변환해 인덱스에 대응하는 컨텐츠를 보여줌. */
    const [bugetBound, setBudgetIndex] = useValueToBound(budgetLowerBounds);
    if (testResponse !== undefined){
        setBudgetIndex(testResponse);
    }
    /* 응답 여부 */
    const [isAnswered, setIsAnswered] = useState<boolean>(false);
    
    const imagePathBase = '/test/budget/food';
    
    /* Deprecated: 레스토랑 사진 디스플레이 를 위한 스타일 오브젝트 (*css background-image 사용)*/
    // const bugetBoundImageStyle = {backgroundImage: `url("${getImgSrc('/test/budget/food', `${bugetBound}-1`, formatWebp)}")`};

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
                    <Slider
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
                    {(bugetBound !== undefined) && strings.examples[bugetBound] && Object.entries(strings.examples[bugetBound])?.map(([key, item]: [key: string, item: any]) => (item && /* 응답에 따른 예시 상품 (e.g. 레스토랑 메뉴 / 숙소 객실 또는 뷰) 정보 카드 컴포넌트 */

                        <FocusableImageCard
                            image={getImgSrc(imagePathBase, `${item.restaurant}`, formatWebp)}
                            alt={item.name}
                            label={item.name}
                        >
                            <div className='flex flex-col px-4 space-y-2 py-2'>
                                <div className='flex flex-row space-x-2 items-center'> {/* 상품 정보: 상품 이름, 위치한 도시, 국가, 국기 */}
                                    <h5>{item.restaurantName}</h5>
                                    <Divider orientation="vertical" />
                                    <h6>{item.city}</h6>
                                    <img className='h-4' src={getImgSrc('/nation', item.nation, formatSvg)} alt={`flag-${item.nation}`} loading='lazy'></img>
                                </div>
                                <a href={item.link} target="_blank" rel="noopener noreferrer"> {/* 디테일 보기 (e.g. 음식 -> 타베로그, 식당 자체 웹사이트 / 숙소 -> Hotels.com, 숙소 자체 웹사이트) @TODO: 카드 자체 클릭으로 변경 가능*/}
                                    <div className='flex flex-row items-center space-x-1'>                                      
                                        <Logo id = {item.linkType} className='h-5'/>
                                        <h6>{linkTypeStrings[item.linkType].name}{pageStrings.linkText}</h6>
                                        <ArrowRight fontSize='inherit' />
                                    </div>
                                </a>
                            </div>
                        </FocusableImageCard>
                    ))}
                </div>
                {/* </WithAnimationWrapper> */}
                </div>
            </TestContainer>
        </div>    
    );
}
export default TestBudgetPage;