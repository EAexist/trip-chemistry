
import { Chip, Dialog, DialogContent } from '@mui/material';

import { usePageString } from '../../texts';
import AsyncAutoComplete from "../AsyncAutoComplete";

const userName = '꿀벌#1234'

/* 케미 테스트를 위해 친구를 추가할 때 backdrop 을 이용해 해당 작업에 집중하도록 하는 dialog. */
function AddFriendDialog(dialogProps:{onClose:()=>void, open:boolean}){

    const page = 'result'
    const strings = Object(usePageString(page).addFriendDialog);
    return(
        <Dialog {...dialogProps}>
            {/* Dialog 컴포넌트 내에서는 DialogContent 내에서만 텍스트 관련 HTML 태그(h1, h2, p, ...)가 작동함. (공식 문서 설명 없음. 테스트 해본 결과.)*/}
            <DialogContent>
                {/* DialogTitle, DialogContent 컴포넌트를 사용해 Dialog 내부를 구성할 수도 있으나, 확장성을 위해 div로 구성함. */}
                <div className='flex flex-col flex-none space-y-4 m-4'>
                    <h2>{strings.addByName}</h2>
                    <AsyncAutoComplete label={strings.friendNameFormLabel as string}/>
                    <h2>{strings.giveMyName}</h2>
                    <Chip label={userName}></Chip>
                </div> 
            </DialogContent>
        </Dialog>
    );
}

export default AddFriendDialog;
