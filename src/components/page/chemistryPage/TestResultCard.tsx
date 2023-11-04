import { Icon } from "@mui/material";
import Card, { CardImage } from "../../Card";
import getImgSrc, { FORMATPNG } from "../../../common/utils/getImgSrc";
import Chip from "../../Chip";
import { TestResult, UserId } from "../../../common/types/interfaces";
import { UserDataKey, useLoadStatus, useTestResultObject } from "../../../common/reducer/userListReducer";
import { useSelector } from "react-redux";
import { RootState } from "../../../common/store";
import { LoadStatus } from "../../../common/types/loadStatus";
import { ComponentType } from "@react-spring/web";
import Button from "../../Button";
import { useEffect } from "react";

interface TestResultCardProps{
    userId: UserId;
    meString: string;
    variant?: 'sm' | 'md' | 'lg';
    handleClickDelete?: () => void;
};

const userName = '디클1234'

function TestResultCard({ userId, meString, variant = 'md', handleClickDelete }:TestResultCardProps){

    const testResult : TestResult = useSelector(( state:RootState ) => state.userData.userDataObject[userId].testResult.data);
    const [ status, ] = useLoadStatus( userId, 'testResult' );
    useEffect(()=>{
        console.log(`TestResultCard: status=${status}`);
    }, [ status ])

    return(
        status === LoadStatus.REST &&
        <Card className='w-64 h-fit flex flex-col'>
            <CardImage
                image={getImgSrc('/result/tripCharacter', testResult.tripCharacter.id as string, FORMATPNG)}
                alt={testResult.tripCharacter.name}
                className='object-contain'
                size={variant}
            >
                {(handleClickDelete) &&
                    <Button onClick={handleClickDelete} className='absolute top-2 right-2'>
                        <Icon>cancel</Icon>
                    </Button>
                }
            </CardImage>
            <div className='flex flex-col p-4 space-y-2'>
                <div className='flex flex-row items-center space-x-2'>
                    <h4>{userId}</h4>
                    {(userId === userName) && <h5>{meString}</h5>}
                </div>
                <h6>{`${testResult.tripCharacter.prefix} ${testResult.tripCharacter.name}`}</h6>
                {(variant !== 'sm') &&
                    <div className='flex flex-wrap space-x-1'>
                        {testResult.tripTagList?.map((tag) => <Chip key={tag} label={tag} />)}
                    </div>}
            </div>
        </Card>
    );
}

interface withLoadUserDataProps{
    userId : UserId; 
    userDataKey : UserDataKey;
};
const withLoadUserData = <T extends {}>( WrappedComponent: ComponentType<T> ) =>
    ( { userId, userDataKey } : withLoadUserDataProps ) =>
    ( props: T ) => {
    const [ status, ] = useLoadStatus( userId, userDataKey );

    return (
        status === LoadStatus.REST && <WrappedComponent {...props}/>
    );
}

export default TestResultCard;