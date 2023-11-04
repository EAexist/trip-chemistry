import AvatarList from "../../AvatarList";
import { SliderItem } from "../../Slider";
import withValueToUserList, { withValueToUserListProps } from "../../../common/hoc/withValueToUserList";
import { useTestString } from "../../../texts";

interface ScheduleSliderItemProps extends withValueToUserListProps{};

function ScheduleSliderItem({ value, userIdList } : ScheduleSliderItemProps){

    const answerStrings = useTestString({ testName: 'schedule' }).answers

    return(
        <SliderItem value={Number(value)}>
            <AvatarList userIdList={userIdList} className='aboveSlider'/>
            <h5 className={`belowSlider w-16 flex flex-col items-center text-center`}>
                { answerStrings[value].label }
            </h5>
        </SliderItem>
    );
}

export default withValueToUserList( ScheduleSliderItem )('schedule');