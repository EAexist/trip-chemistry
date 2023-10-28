import withTestResponse, { WithTestResponseProps } from "../../../common/hocs/withTestResponse";
import { useUserList, useValueToUserList } from "../../../common/reducer/userListReducer";
import { UserId } from "../../../common/types/interfaces";
import getImgSrc, { FORMATPNG } from "../../../common/utils/getImgSrc";
import { CardImage } from "../../Card";
import Slider, { SliderItem } from "../../Slider";

interface testResponseSliderProps extends WithTestResponseProps{

};

function TestResponseSlider({ testName, subTestName, strings }:testResponseSliderProps){
    
    const userList = useUserList();
    const valueToUserList = useValueToUserList({ testName, subTestName});
    console.log(`TestResponseSlider: testName=${testName} strings.answers=${strings.answers}`);
    console.log(`TestResponseSlider: testName=${testName} scheduleValueToUserList=${JSON.stringify(valueToUserList)}`);

    return(
        <Slider
            step={1}
            min={0}
            max={4}
            className="w-160 mt-36 mb-16"
        >
            {
                (Object.entries(valueToUserList) as [k: string, v: UserId[]][]).map(([value, userIdList]) => {

                    return (
                        <SliderItem value={Number(value)}>
                            {
                                userIdList.map(userId => {

                                    const testResult = userList[userId].testResult;

                                    return (
                                        <>
                                            <div className='absolute -translate-x-1/2 bottom-4 w-20 flex flex-col items-center'>
                                                <CardImage
                                                    image={getImgSrc('/result/tripCharacter', testResult?.tripCharacter.id as string, FORMATPNG)}
                                                    alt={testResult?.tripCharacter.name as string}
                                                    className='object-contain'
                                                    size='sm'
                                                >
                                                </CardImage>
                                                <h5>{userId}</h5>
                                            </div>
                                            <h5 className='absolute -translate-x-1/2 top-4 flex flex-col items-center w-16 text-center'>
                                                {strings.answers !== undefined ? strings.answers[value].label : value}
                                            </h5>
                                        </>
                                    );
                                })
                            }
                        </SliderItem>
                    );
                })
            }
        </Slider>
    );
}
export default withTestResponse(TestResponseSlider);