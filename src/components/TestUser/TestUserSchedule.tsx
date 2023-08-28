import ImageCard, { CardCarouselContainer, CardCarouselItem } from '../ImageCard';

interface TestUserScheduleProps{

};

function TestUserSchedule({}:TestUserScheduleProps){
    const optionList = [
        { 
          title: '내가 리드하기',
          detail: '나는 여행도 많이 다녀봤고 계획하는 걸 좋아하니까 내가 리드하는게 편해',
          imageTitle: 'lead'
        },
        { 
          title: '리더 없이 함께 준비하기',
          detail: '한 명이 리드하지 않아도 다 같이 이야기하면서 계획하는게 좋아',
          imageTitle: 'co-work'
        },
        { 
          title: '다른 사람이 리드해주기',
          detail: '불만 없이 열심히 의견 낼테니 누군가가 리드해주면 좋겠어',
          imageTitle: 'placeholder'
        },
      ]      
      const imgPath = '/static/images/test/leadership';
      const imgFormat = 'png';
  
      const interactiveImageCardPropsFromOption = (option : {title:string, detail:string, imageTitle:string}, index: number) => {
        return(
          {
            cardHeaderAvatarText: (index).toString(),
            cardHeaderTitle: option.title,
            cardMediaProps: {
              image: `${imgPath}/${option.imageTitle}.${imgFormat}`, // image source string
              alt: option.imageTitle,
            },
          }        
        );
      };
  
      return(
      <div>
        <CardCarouselContainer>
          {optionList.map((option, index) => {
            return(
              <CardCarouselItem id = {index} onHoverElement ={<h2 className='absolute z-10 -bottom-20 text-5xl leading-relaxed font-bold opacity-0 animate-reveal-up'>{option.detail}</h2>}>
                <ImageCard {...interactiveImageCardPropsFromOption(option, index)} />
              </CardCarouselItem>
            )
          })}        
        </CardCarouselContainer>
      </div>
      );
}
export default TestUserSchedule;