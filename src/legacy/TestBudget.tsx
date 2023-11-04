import { useState } from 'react';
import { MaterialSlider } from '../components/Slider';
import useValueToBound from '../common/hook/useValueToBound';
import { WithTestResponseProps } from '../common/hoc/withTestResponse';
import useGetImgSrc, { FORMATSVG, FORMATWEBP } from '../common/utils/getImgSrc';
import getImgSrc from '../common/utils/getImgSrc';
import Trail from '../components/spring/Trail';
import Card from '../components/Card';
import { WithAnimationWrapper } from '../common/hoc/withAnimation';
import { CardActions, CardContent, CardMedia, Divider } from '@mui/material';
import { ArrowRight } from '@mui/icons-material';
import TestTitleContainer from '../components/typography/TestTitleContainer';

interface TestBudgetProps extends WithTestResponseProps{
};

const sliderProps = {
    min: 20000,
    max: 200000,
    step: 20000,
};

const budgetLowerBounds : number[] = [
    20000,
    60000,
    100000,
    140000,
]

const priceText = (value: number) => {
    return `${value < 10000 ? value.toString() : `${value/10000}만`}원`
}

function TestBudget({testResponse, setTestResponse, strings}: TestBudgetProps){
    
    /* 응답한 값 (예산 금액)을 레벨로 변환해 레벨에 대응하는 컨텐츠를 보여줌. */
    const [ bugetBound ] = useValueToBound({ boundList: budgetLowerBounds });

    /* 응답 여부 */
    const [isAnswered, setIsAnswered] = useState(false);
    
    /* 레스토랑 사진 디스플레이 를 위한 스타일 오브젝트 (*css background-image 사용)*/
    const bugetBoundImageStyle = {backgroundImage: `url("${getImgSrc('/test/budget/food', `${bugetBound}-1`, FORMATWEBP)}")`};

    /* 예산 슬라이더 핸들러 */
    const handleChangeSlider = (event: Event, newValue: number | number[]) => {  
        !isAnswered && setIsAnswered(true);      
        console.log("TestBudget-setTestResponse=", setTestResponse)
        setTestResponse(newValue as number);
    };

    return(        
        <div className ='flex flex-row w-full h-full max-md:flex-col'> {/* 페이지 */}                     

            <TestTitleContainer title={strings.title} subtitle={strings.subtitle}/> {/* 테스트 제목 및 내용 레이아웃 컴포넌트 */} 
                <div className='flex flex-col items-center'>
                    <div className='h-24 flex items-center'> {/* 응답 값 디스플레이: 예산 e.g. 4만원 */}
                        {testResponse ? <h2>{priceText(testResponse)}</h2> : <h4>{strings.defaultPriceText}</h4>}
                    </div>
                    <MaterialSlider /* 응답 UI: 슬라이더 */
                        size="small"
                        aria-label="Small"
                        value={testResponse}
                        valueLabelDisplay="auto"
                        getAriaValueText={priceText}
                        onChange={handleChangeSlider}
                        sx={{ width: '75%' }}
                        {...sliderProps}
                    />
                    {/* 응답에 따른 예시 상품 (e.g. 레스토랑 메뉴 / 숙소 객실 또는 뷰) 정보 카드 컴포넌트 */}
                    <div> 
                    {
                        (bugetBound !== undefined) &&
                        <WithAnimationWrapper key={bugetBound.toString()}>
                            <a href={strings.examples[bugetBound].link} target="_blank" rel="noopener noreferrer"> {/* 예시 상품 카드 클릭시 상품 관련 외부 링크로 이동 */}
                                <Card className=' flex flex-col justify-end w-64 h-80
                                    max-md:w-52 max-md:h-72'>
                                    <CardMedia /* 메뉴 이미지 */
                                        component='img'
                                        image={getImgSrc('/test/budget/food', `${bugetBound}-menu`, FORMATWEBP)}
                                        title={strings.examples[bugetBound].name}
                                    />
                                    <CardContent className='flex flex-col h-fit m-0 p-0'>
                                        <div className='flex flex-row items-center'> {/* 상품 이름 및 가격 */}
                                            <h4>{strings.examples[bugetBound].menu}</h4>
                                            <h4>~{priceText(strings.examples[bugetBound].price)}</h4>
                                        </div>
                                        <div className='flex flex-row items-center'> {/* 상품 정보: 상품 이름, 위치한 도시, 국가 */}
                                            <p>{strings.examples[bugetBound].name}</p>
                                            <Divider orientation="vertical" />
                                            <p>{strings.examples[bugetBound].city}</p>
                                            <img className='h-4' src={getImgSrc('/nation', strings.examples[bugetBound].nation, FORMATSVG)} alt={`flag-${strings.examples[bugetBound].nation}`}></img>

                                        </div>
                                    </CardContent>
                                    <CardActions> {/* 디테일 보기 (e.g. 음식 -> 타베로그, 식당 자체 웹사이트 / 숙소 -> Hotels.com, 숙소 자체 웹사이트) */}
                                        <div className='flex flex-row items-center'>
                                            <p>{strings.linkType}</p>
                                            <ArrowRight fontSize='inherit' />
                                        </div>
                                    </CardActions>
                                </Card>
                            </a>
                        </WithAnimationWrapper>
                    }
                    </div>
                </div> 
            {
                (bugetBound !== undefined) &&
                <WithAnimationWrapper key={bugetBound.toString()}>
                <div /* 예시 매장 (레스토랑/숙소) 이미지 */
                    style={bugetBoundImageStyle}                      
                    className={`w-full h-full
                        bg-cover
                        relative 
                    `}
                >                
                    <h5 className='absolute bottom-2 right-2 text-white'>{strings.examples[bugetBound].name}</h5> {/* 매장 이름 */}
                    {/* <FocusDetail index={true}> */}
                    {/* <div className='absolute inset-0'> */}
                        {/* <h2 className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>ddd{strings.linkType}</h2> */}
                    {/* </div>               */}
                    {/* </FocusDetail> */}
                </div>
                </WithAnimationWrapper>
            }
        </div>    
    );
}
export default TestBudget;