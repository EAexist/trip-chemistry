import withTestResponse, { WithTestResponseProps } from "../../../common/hoc/withTestResponse";
import { useValueToUserList } from "../../../common/reducer/userListReducer";
import { UserId } from "../../../common/types/interfaces";
import getImgSrc, { FORMATPNG } from "../../../common/utils/getImgSrc";
import { priceText } from "../../../common/utils/priceText";
import { CardImage } from "../../Card";
import Slider, { SliderItem } from "../../Slider";

interface testResponseSliderProps extends WithTestResponseProps{
};

function TestResponseSlider({ testIndex, testStrings }:testResponseSliderProps){
    
    // const userDataObject = useUserList();
    // const valueToUserList = useValueToUserList();

    return(<></>
        // (Object.entries(valueToUserList) as [k: string, v: UserId[]][]).map(([value, userIdList]) => {
        //     // console.log(`TestResponseSlider: testName=${testIndex.testName} testStrings.answers=${JSON.stringify(testStrings.answers)} value=${value}`);
        //     return (
        //         <SliderItem value={Number(value)}>
        //             <div className='aboveSlider flex flex-row items-center'>                        
        //             {
        //                 userIdList.map(userId => {
        //                     const testResult = userDataObject[userId].testResult?.data;
        //                     return (
        //                         <>
        //                             <div className='w-20 flex flex-col text-center'>
        //                                 <CardImage
        //                                     image={getImgSrc('/result/tripCharacter', testResult?.tripCharacter.id as string, FORMATPNG)}
        //                                     alt={testResult?.tripCharacter.name as string}
        //                                     className='object-contain'
        //                                     size='sm'
        //                                 >
        //                                 </CardImage>
        //                                 <h5>{userId}</h5>
        //                             </div>
        //                         </>
        //                     );
        //                 })
        //             }
        //             </div>
        //             <h5 className={`belowSlider flex flex-col items-center ${(testStrings.answers !== undefined) ? 'w-40' : 'w-16' }  text-center `}>
        //                 {(testStrings.answers !== undefined) ? testStrings.answers[value].label : priceText(Number(value))}
        //             </h5>
        //         </SliderItem>
        //     );
        // })
    );
}

// export default withTestResponse(TestResponseSlider);