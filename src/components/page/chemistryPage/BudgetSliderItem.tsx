import AvatarList from "../../AvatarList";
import { SliderItem } from "../../Slider";
import withValueToUserList, { withValueToUserListProps } from "../../../common/hoc/withValueToUserList";
import { useTestString } from "../../../texts";
import { priceText } from "../../../common/utils/priceText";

interface BudgetSliderItemProps extends withValueToUserListProps{};

function BudgetSliderItem({ value, userIdList } : BudgetSliderItemProps){

    const answerStrings = useTestString({ testName: 'budget' }).answers

    return(
        <SliderItem value={Number(value)}>
            <AvatarList userIdList={userIdList} className='aboveSlider'/>
            <h5 className={`belowSlider w-16 flex flex-col items-center text-center`}>
                { priceText(Number(value)) }
            </h5>
        </SliderItem>
    );
}

export default withValueToUserList( BudgetSliderItem )('budget');