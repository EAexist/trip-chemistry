import React, {useState, useContext} from 'react';
import { usePageString } from '../../texts';
import ImageCard, { CardCarouselContainer, CardCarouselItem } from '../ImageCard'; 

import Button from '../Button';
import { TestResponseKey, withTestResponseProps } from '../../interface/interfaces';


interface TestUserScheduleProps{

}; 

interface Answer {
  title: String;
}

function TestUserSchedule({testName, response, setResponse}: withTestResponseProps ){

  const strings = usePageString('test')[testName as TestResponseKey];

  const handleClick = (index: number)=>{
    // setResponse(index);
  }  

  return(
  <div>
    {(strings.answers as Answer[])?.map((answer, index)=>{
      return(
        <Button onClick = {()=>handleClick(index)}>
          <div className={`${
            response===index ? 
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