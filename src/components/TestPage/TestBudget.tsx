import { useState } from 'react';
import Slider from '../Slider';
import useLeveledStructure from '../useLeveledStructure';
import { WithTestResponseProps } from '../withTestResponse';
import useGetImgSrc, { formatSvg, formatWebp } from '../utils/getImgSrc';
import getImgSrc from '../utils/getImgSrc';
import Trail from '../spring/Trail';
import Card, { WithAnim } from '../Card';
import { CardActions, CardContent, CardMedia, Divider } from '@mui/material';
import { IsHoveringType } from '../../context/IsHoveringContext';
import Button from '../Button';
import { usePageString } from '../../texts';
import { ArrowRight } from '@mui/icons-material';
import TestContainer from '../TestContainer';

interface TestBudgetProps extends WithTestResponseProps{
    // budg: SubTestName
};

const sliderProps = {
    min: 20000,
    max: 200000,
    step: 20000,
};

const budgetLevelStep = 20000;
const budgetToExampleEntries : {level: number, item: string}[] = [
    {level:20000, item: "iida-shouten-ramen"},
    {level:60000, item: "tomoei"},
    {level:100000, item: "mandarin-grill"},
    {level:140000, item: "torishiki"},
]

const defaultPriceText = "슬라이더를 움직여봐!"
const priceText = (value: number) => {
    return `${value < 10000 ? value.toString() : `${value/10000}만`}원`
}


function TestBudget({testName, subTestName, testResponse, setTestResponse, strings}: TestBudgetProps){

    // const getImgSrc = useGetImgSrc(basePath);
    const [isHoveringExampleImage, setIsHoveringExampleImage] = useState<IsHoveringType>(false);
    const bugetPageStrings = usePageString('test')[testName as string];
    
    /* 응답한 값 (예산 금액)을 레벨로 변환해 레벨에 대응하는 컨텐츠를 보여줌. */
    const [example, setExample] = useLeveledStructure(budgetToExampleEntries);
    
    setExample(testResponse as number);

    const exampleImageStyle = {backgroundImage: `url("${getImgSrc('/test/budget/food', `${example}-1`, formatWebp)}")`};

    const [isAnswered, setIsAnswered] = useState(false);


    const handleChangeSlider = (event: Event, newValue: number | number[]) => {  
        !isAnswered && setIsAnswered(true);      
        console.log("TestBudget-setTestResponse=", setTestResponse)
        setTestResponse(newValue as number);
    };

    const [openTrail, setOpenTrail] = useState(true);

    /* FullPage */
    return(        
        /* 페이지 */
        <div className ='flex flex-row w-full h-full pl-12'>                    

            {/* 테스트 및 메뉴 카드 */}
            <TestContainer
                title={strings.title}
                subTitle={strings.subTitle}
                titleClassName = 'py-12 items-center'
            >
                {/* 응답 값 (예산) */}
                <div className='h-24 flex items-center justify-center'>
                {testResponse ? <h2>{priceText(testResponse)}</h2> : <h4>{defaultPriceText}</h4>}      
                </div> 
                {/* 슬라이더 */}
                <Slider
                    size="small"
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    getAriaValueText={priceText}          
                    onChange={handleChangeSlider}
                    sx={{width: '100%'}}
                    {...sliderProps}
                />
                {/* 메뉴 카드 */}
                <div className='flex flex-col items-center'>
                    <div className='w-96'>
                        <WithAnim key={example}>
                            <a href={strings.examples[example].link} target="_blank" rel="noopener noreferrer">
                                <Card className=' flex flex-col justify-end'>
                                    <CardMedia
                                        component='img'
                                        image={getImgSrc('/test/budget/food', `${example}-menu`, formatWebp)}
                                        title={strings.examples[example].name}
                                    />
                                    <CardContent className='flex flex-col h-fit m-0 p-0'>
                                        {/* 메뉴 이름 및 가격 */}
                                        <div className='flex flex-row items-center'>
                                            <h4>{strings.examples[example].menu}</h4>
                                            <h4>~{priceText(strings.examples[example].price)}</h4>
                                        </div>
                                        {/* 식당 이름 및 도시 */}
                                        <div className='flex flex-row items-center'>
                                            <p>{strings.examples[example].name}</p>

                                            <Divider orientation="vertical" />

                                            <p>{strings.examples[example].city}</p>
                                            <img className='h-4' src={getImgSrc('/nation', strings.examples[example].nation, formatSvg)} alt={`flag-${strings.examples[example].nation}`}></img>

                                        </div>
                                    </CardContent>
                                    <CardActions>
                                        <div className='flex flex-row items-center'>
                                            <p>{strings.linkLabel}</p>
                                            <ArrowRight fontSize='inherit' />
                                        </div>
                                    </CardActions>
                                </Card>
                            </a>
                        </WithAnim>
                    </div>
                </div>    
            </TestContainer>         
            {/* </div> */}
            

            {/* 레스토랑 이미지 */}
            {/* <IsHoveringContextProvider value={{isHovering: isHoveringExampleImage, setIsHovering: setIsHoveringExampleImage}}>
            <Button
                style={exampleImageStyle}                      
                className={`w-full h-full`}
            >
            <WithMouseHoverWrapper index={true}> */}
            

            <WithAnim key={example}>
            <div
                style={exampleImageStyle}                      
                className={`w-full h-full
                    bg-cover
                    relative 
                `}
            >
                {/* <WithShowIfHoveringWrapper index={true}> */}
                {/* <div className='absolute inset-0'> */}
                    {/* <h2 className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>ddd{strings.linkLabel}</h2> */}
                {/* </div>               */}
                {/* </WithShowIfHoveringWrapper> */}
                
                {/* 식당 이름 */}
                <h5 className='absolute bottom-2 right-2 text-white'>{strings.examples[example].name}</h5>
            </div>
            </WithAnim>
            
            {/* </WithMouseHoverWrapper>
            </Button>
            </IsHoveringContextProvider>     */}
        </div>    
    );
}
export default TestBudget;