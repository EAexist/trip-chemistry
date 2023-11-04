import { Avatar, Skeleton } from "@mui/material";
import LazyImage from "../../LazyImage";
import { UserId } from "../../../common/types/interfaces";
import getImgSrc, { FORMATPNG } from "../../../common/utils/getImgSrc";
import { useTestResponseObject } from "../../../common/reducer/userListReducer";
import { useTestString } from "../../../texts";

interface leaderCardProps{
    userId: UserId;
    testResultObject: {[ userId: UserId ] : any};
    leaderTitle: string;
};

function LeaderCard({ userId, testResultObject, leaderTitle }:leaderCardProps){

    const leadershipResponse_ = useTestResponseObject({ testName: 'leadership', subTestName: 'leadership' })[userId] as number;
    const leadershipResponse = leadershipResponse_ ? leadershipResponse_ : 2;
    console.log(`leadershipResponse=${leadershipResponse}`);
    const tripCharacter = testResultObject[userId].tripCharacter;
    const title = useTestString({ testName: 'leadership' }).answers[leadershipResponse].title;
    
    return (
        <div className='flex flex-row items-center h-48 space-x-4'>
            <div>
                <h5>{leaderTitle}</h5>
                <h2>{userId}</h2>
            </div>
            <div className='w-40'>
                <div className='h-32 border-blue-500 border-4'>
                    <LazyImage
                        src={getImgSrc('/result/tripCharacter', tripCharacter?.id as string, FORMATPNG)}
                        alt={tripCharacter?.name as string}
                        className="h-full object-cover"
                    >
                        <Skeleton variant="rectangular" width={'100%'} height={'100%'}/>
                    </LazyImage>
                </div>
                <div className='w-full flex flex-row items-center justify-center space-x-1'>
                    {/* <Avatar sx={max_md? { width: 12, height: 12, fontSize: "0.8rem" } : { width: 20, height: 20, fontSize: "0.8rem" } }>{(leadershipResponse+1).toString()}</Avatar> */}
                    <Avatar sx={{ width: 20, height: 20, fontSize: "0.8rem" } }>{(leadershipResponse+1).toString()}</Avatar>
                    <h6 className='whitespace-normal'>{ title }</h6>
                </div>
            </div>
        </div>
    );
}
export default LeaderCard;