import AvatarList from "../../AvatarList";
import { SliderItem } from "../../Slider";
import withValueToUserList, { withValueToUserListProps } from "../../../common/hoc/withValueToUserList";
import { useTestString } from "../../../texts";

interface CitySliderItemProps extends withValueToUserListProps{};

function CitySliderItem({ value, userIdList } : CitySliderItemProps){

    const answerStrings = useTestString({ testName: 'city' }).answers

    return(
        <SliderItem value={ Number(value) }>
        <AvatarList userIdList={ userIdList } className='aboveSlider'/>
        <div className='absolute -translate-x-1/2 items-center text-center'>
            <h5 className={`w-32`}>
                { answerStrings[value].quote }
                { answerStrings[value].emoji }
            </h5>
        </div>
    </SliderItem>
    );
}

export default withValueToUserList( CitySliderItem )('city');