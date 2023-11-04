import { useTestResultObject } from "../common/reducer/userListReducer";
import { UserId } from "../common/types/interfaces";
import getImgSrc, { FORMATPNG } from "../common/utils/getImgSrc";
import { CardImage } from "./Card";

interface AvatarListProps{
    userIdList: UserId[]
    className?: string;
}
function AvatarList({ userIdList, className } : AvatarListProps){

    const testResultObject = useTestResultObject();

    return (
        <div className={`items-center flex flex-row ${className}`}>                        
        {
            userIdList.map(userId => {
                const testResult = testResultObject[userId];
                return (
                    <>
                        <div className='w-20 flex flex-col text-center'>
                            <CardImage  
                                image={getImgSrc('/result/tripCharacter', testResult?.tripCharacter.id as string, FORMATPNG)}
                                alt={testResult?.tripCharacter.name as string}
                                className='object-contain'
                                size='sm'
                            >
                            </CardImage>
                            <h5>{userId}</h5>
                        </div>
                    </>
                );
            })
        }
        </div>
    );
}

export default AvatarList;