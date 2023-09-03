import React, {useState} from 'react';
import { usePageString } from '../../texts';
import ImageCard, { CardCarouselContainer, CardCarouselItem } from '../ImageCard';

import Button from '../Button';

interface TestUserScheduleProps{

}; 

interface Answer {
  title: String;
}

function TestUserSchedule({}:TestUserScheduleProps){

  const page = "testUserSchedule";
  const strings = usePageString(page);

  const [selectedAnswerId, setSelectedAnswerId] = useState<number | false>(false);

  const handleClick = (index: number)=>{
    setSelectedAnswerId(index);
  }  
  return(
  <div>
    {(strings.answers as Answer[]).map((answer, index)=>{
      return(
        <Button onClick = {()=>handleClick(index)}>
          <div className={`${
            selectedAnswerId===index ? 
            'font-bold':
            'font-normal'
          }`}
          >
            {answer.title}
          </div>
        </Button>
      );
    })}        
  </div>
      );
}
export default TestUserSchedule;