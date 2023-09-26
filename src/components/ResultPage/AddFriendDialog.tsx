import { useState } from 'react';
import { Chip, Dialog, DialogContent, CircularProgress } from '@mui/material';
import { Done, QuestionMark } from "@mui/icons-material"
import { usePageString } from '../../texts';
import AsyncAutoComplete from "../AsyncAutoComplete";
import Button from '../Button';
import User from '../../interface/User';
import ApiLoader, { loadStatus } from '../ApiLoader';
import { useGetResultById, useUserListLoadStatus } from '../../reducer/userListReducer';

const userName = '디클1234'

interface AddFriendDialogProps{
    setOpen: (isOpen:boolean)=>void,
    onClose: ()=>void;
};

/* 케미 테스트를 위해 친구를 추가하는 Dialog.
 * 사용자가 해당 액션에 집중할 수 있도록 backdrop을 사용. */
function AddFriendDialog({ setOpen, ...dialogProps }: AddFriendDialogProps){
    
    const loaderStrings = {
        loader: {
            'rest': {},
            'pending': {},
            'success': {
                alertText: `${""}님을 일행으로 추가했어요.`,
            }, 
            'miss': {
                alertText: `${""}님을 찾지 못했어요. Id를 다시 확인해주세요.`,
                confirmButtonText: '확인'
            }, 
            'fail': {
                alertText: `지금 서버에 연결할 수 없어요. 잠시 후 다시 시도해주세요.`,
                confirmButtonText: '확인'
            }
        }
    }

    const [idToSearch, setIdToSearch] = useState(''); /* AutoComplete에 사용자가 입력한 값 */

    const getFriendApiPath = "/user";
    const page = 'result'
    const strings = Object(usePageString(page).addFriendDialog);
    const [addFriendStatus, setAddFriendStatus] = useUserListLoadStatus();
    // const [addFriendStatus, setAddFriendStatus] = useState<loadStatus>(loadStatus.REST);
    // const [addFriendStatus, setAddFriendStatus] = useState<loadStatus>(loadStatus.REST);
    const fetchResultById = useGetResultById();
    const handleClickAdd = () => {
        setAddFriendStatus(loadStatus.PENDING);
        fetchResultById(idToSearch);
        
        /* ! Deprecated API 호출
         * :port/users/{Id}
         */
        // fetch(`${getFriendApiPath}/${idToSearch}`)
        //     .then((response) => {
        //         return response.json();
        //     })
        //     .then((data) => {
        //         /* Find Success. 입력한 id가 UserInfo DB에 존재하며 사용자 정보를 응답으로 받음. 
        //          * data: user 객체.*/
        //         if(data){
        //             console.log(data);
        //             setAddFriendStatus(loadStatus.SUCCESS);
        //             setUserCardInfoList([...userCardInfoList, data]);
        //             setOpen(false);  
        //         }         
        //         /* Find miss. 입력한 id가 UserInfo DB에 존재하지 않음.  */     
        //         else{
        //             setAddFriendStatus(loadStatus.MISS);                    
        //         }
        //     })
    };

    const handleClickConfirmmiss = () => {
        setAddFriendStatus(loadStatus.REST);
    }

    const CallApiComponent = {
        'rest' : 
            <>
                <AsyncAutoComplete label={strings.friendNameFormLabel as string} setValue={setIdToSearch}/> 
                <Button onClick={handleClickAdd}>{strings.add}</Button>
            </>,
        'pending': <CircularProgress/>, 
        'success': <Done/>,
        'miss': 
            <>
                <QuestionMark/>
                <p>{strings.userApimissMessage}</p>
                <Button onClick={handleClickConfirmmiss}>{strings.confirm}</Button>
            </>,
        'fail': 
            <>
                <QuestionMark/>
                <p>{strings.userApimissMessage}</p>
                <Button onClick={handleClickConfirmmiss}>{strings.confirm}</Button>
            </>,
    }; 

    return(
        <Dialog {...dialogProps} open={true} className=''>
            {/* Dialog 컴포넌트 내에서는 DialogContent 내에서만 텍스트 관련 HTML 태그(h1, h2, p, ...)가 작동함. (공식 문서 설명 없음. 테스트 해본 결과.)*/}
            <DialogContent>
                {/* DialogTitle, DialogContent 컴포넌트를 사용해 Dialog 내부를 구성할 수도 있으나, 확장성을 위해 div로 구성함. */}
                <div className='flex flex-col justify-stretch space-y-6 m-4'>
                    <h4>{strings.addByName}</h4>
                        <div className='flex flex-col justify-around items-center h-24' >
                            <ApiLoader
                                status={addFriendStatus} 
                                setStatus={setAddFriendStatus}
                                {...loaderStrings.loader[addFriendStatus]}
                            >
                                <AsyncAutoComplete label={strings.friendNameFormLabel as string} setValue={setIdToSearch}/>
                                <Button onClick={handleClickAdd}>{strings.add}</Button>
                            </ApiLoader>
                            {/* {CallApiComponent[addFriendStatus]}                        */}
                        </div>
                    <h4>{strings.giveMyName}</h4>
                    <Chip label={userName}></Chip>
                </div> 
            </DialogContent>
        </Dialog>
    );
}

export default AddFriendDialog;
