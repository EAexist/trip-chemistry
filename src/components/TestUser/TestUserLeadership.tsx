import ImageCard, { CardCarouselContainer, CardCarouselItem } from '../ImageCard';

interface TestUserLeadershipProps{

};

function TestUserLeadership({}:TestUserLeadershipProps){

    const imageCardPropsList = [
      {
        cardHeaderAvatarText: '1',
        cardHeaderTitle: '내가 리드하기',
        cardMediaProps: {
          image: '/static/images/test/leadership/lead.jpg', // image source string
          alt: 'Lead',
        }
      },
      {
        cardHeaderAvatarText: '2',
        cardHeaderTitle: '동등하게',
        cardMediaProps: {
          image: '/static/images/test/leadership/co-work.jpg', // image source string
          alt: 'co-work',
        }
      },
      {
        cardHeaderAvatarText: '3',
        cardHeaderTitle: '다른 사람이 리드해주기',
        cardMediaProps: {
          image: '/static/images/test/leadership/placeholder.png', // image source string
          alt: 'Follow',
        }
      }            
    ];

    return(
    <div>
      <CardCarouselContainer>
        {imageCardPropsList.map((imageCardProps, index) => {
          return(
            <CardCarouselItem id = {index}>
              <ImageCard {...imageCardProps} />
            </CardCarouselItem>
          )
        })}        
      </CardCarouselContainer>
    </div>
    );
}

export default TestUserLeadership;