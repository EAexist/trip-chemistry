import Card from "../../Card";
import Button from "../../Button";
import { useEffect, useState } from "react";
import { usePageString } from "../../../texts";
import { Icon } from "@mui/material";
import AddFriend from "../resultPage/AddFriend";

interface AddFriendCardProps{};

const userName = '디클1234'

function AddFriendCard({}:AddFriendCardProps){

    const [ openAddFriendCard, setOpenAddFriendCard ] = useState(false);
    const handleClickAddFriend = () => {
        setOpenAddFriendCard(true);
    }; 
    const strings = usePageString('chemistry').sections.addFriend;

    useEffect(()=>{
        console.log(`Rendering [AddFriendCard]`);
    }, [])

    return(
        <Card className='w-64 h-64 flex flex-col'>
        {openAddFriendCard ?
            /* 친구 추가 시스템 */
            <div className='p-4 space-y-8'>
                <div className='w-full h-28'>
                    <AddFriend/>
                </div>
                <div>
                    <h6>{strings.giveMyName}</h6>
                    <h4 className="text-center">{userName}</h4>
                </div>
            </div>
            /* 친구 추가하기 버튼 */
            : <div className='h-full w-full flex justify-center items-center'>
                <Button isActive={ false } onClick={ handleClickAddFriend }>
                    <h4 className='flex items-center'>{ strings.addFriendButton }<Icon>add_circle_outline</Icon></h4>
                </Button>
            </div>
        }
    </Card>
    );
}

export default AddFriendCard;