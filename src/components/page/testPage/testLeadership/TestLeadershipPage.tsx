import { FocusableCarouselContainer, FocusableCarouselDetail, FocusableCarouselItem } from '../../../FocusableCarousel';
import { WithTestResponseProps } from '../../../../common/hocs/withTestResponse';
import { Avatar, useMediaQuery } from '@mui/material';
import Card from '../../../Card';
import TestContainer from '../../../typography/TestContainer';
import getImgSrc, { FORMATPNG } from '../../../../common/utils/getImgSrc';

function TestLeadershipPage({testName, testResponse, setTestResponse, strings}: WithTestResponseProps){
  
  const max_md = useMediaQuery('(max-width:768px)');

  return(    /* 페이지 */
  <div 
    className='w-full h-full px-16'
  > 
    <TestContainer title = {strings.title} subtitle = {strings.subtitle}>      
      <FocusableCarouselContainer selectedItemId={testResponse as number} setSelectedItemId = {setTestResponse}>
        {strings.answers.map((answer: {title:string,  detail:string, imageTitle:string}, index: number) => {

          return(
            <FocusableCarouselItem id = {index} className='rounded'>
              <Card className='w-full h-full
                flex flex-col justify-end
                max-md:flex-row-reverse
              '>
                {/* 옵션 이미지 */}
                <div className='
                  h-full relative
                  max-md:w-full' 
                >
                  <img className='absolute object-cover w-full h-full' src={getImgSrc('/test/leadership', answer.imageTitle, FORMATPNG)} alt={answer.imageTitle} loading='lazy'></img>
                  <FocusableCarouselDetail id={index} withAnimationProps = {{animationName: "opacity-0 animate-reveal-up max-md:animate-reveal-left"}}>
                    <h3 className='absolute bottom-0'>{answer.detail}</h3>
                  </FocusableCarouselDetail>
                </div>
                {/* 옵션 번호 및 텍스트 */}
                <div className='
                  flex flex-row items-center p-4 space-x-4
                  max-md:w-36 max-md:flex-col max-md:space-x-0 max-md:space-y-4 max-md:justify-start'
                > 
                  <Avatar sx={max_md? { width: 20, height: 20, fontSize: "0.8rem" } : { width: 24, height: 24, fontSize: "1rem" } }>{(index+1).toString()}</Avatar>
                  <h5>{answer.title}</h5>
                </div>
              </Card>                
            </FocusableCarouselItem>
          )
        })}        
      </FocusableCarouselContainer>
    </TestContainer>
  </div>
  );
}

export default TestLeadershipPage;