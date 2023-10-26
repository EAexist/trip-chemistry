import { useState } from 'react';
import { Chip, CircularProgress, Dialog, DialogContent } from '@mui/material';
import { usePageString } from '../../../texts';
import AsyncAutoComplete from "../../AsyncAutoComplete";
import Button from '../../Button';
import { useLoadStatus } from '../../../common/hooks/useLoadStatus';
import { useFindUser, useGetResultById, useUserListLoadStatus, withUserListLoadStatus } from '../../../common/reducer/userListReducer';
import { Done, QuestionMark } from '@mui/icons-material';
import { LoadStatus } from '../../../common/types/loadStatus';

const userName = '디클1234'

interface AddFriendProps{
    // setOpen: (isOpen:boolean)=>void,
};

/* 케미 테스트를 위해 친구를 추가하는 Dialog.
 * 사용자가 해당 액션에 집중할 수 있도록 backdrop을 사용. */
function AddFriend({}: AddFriendProps){

    const page = 'result'
    const strings = Object(usePageString(page).addFriend);

    const [idToSearch, setIdToSearch] = useState(''); /* AutoComplete에 사용자가 입력한 값 */

    const [ status, setStatus, ] = useUserListLoadStatus({delay: 3000});
    const findUser = useFindUser();
    const successToRestSecond = useLoadStatus({ status, setStatus, delay: 3000});
    // const [ successToRestSecond ] = useLoadStatus({ status: status, setStatus: setStatus, delay: 3000 });
    const fetchResultById = useGetResultById();
    
    const [ showRedundancyWarning, setShowRedundancyWarning ] = useState<boolean>(false);
    const handleClickConfirmRedundancyWarning = () => setShowRedundancyWarning(false);

    const handleClickAdd = () => {
        if(findUser(idToSearch)){
            setShowRedundancyWarning(true);
        }
        else{
            fetchResultById(idToSearch);    
        }
    }
    const handleClickConfirmToRest = () => setStatus(LoadStatus.REST);
    const confirmButtonText = '확인';
    
    return(
        <div className={`flex flex-col w-full h-full items-center justify-center`}>
            {
                showRedundancyWarning ? 
                <>
                    <QuestionMark />
                    <h6 className="text-center">{idToSearch}님은<br />이미 친구로 추가되었어요!</h6>
                    <Button onClick={handleClickConfirmRedundancyWarning}>{confirmButtonText}</Button>
                </>
                :(() => {
                    switch (status) {
                        case LoadStatus.REST:
                            return (
                                <div className='flex flex-col space-y-2 w-full'>
                                    <h6>{strings.addByName}</h6>
                                    <AsyncAutoComplete
                                        label={strings.friendNameFormLabel as string}
                                        setValue={setIdToSearch}
                                    />
                                    <Button onClick={handleClickAdd}><h6>{strings.add}</h6></Button>
                                </div>
                            )
                        case LoadStatus.PENDING:
                            return (
                                <CircularProgress />
                            )
                        case LoadStatus.SUCCESS:
                            return (
                                <>
                                    <Done />
                                    <h6 className="text-center">{idToSearch}님을 일행으로 추가했어요.</h6>
                                    {(successToRestSecond > 0) && <h6 className="text-center">{successToRestSecond}초 후 닫힘</h6>}
                                    <Button onClick={handleClickConfirmToRest}>{confirmButtonText}</Button>
                                </>
                            )
                        case LoadStatus.FAIL:
                            return (
                                <>
                                    <QuestionMark />
                                    <h6 className="text-center">지금 서버에 연결할 수 없어요.<br />잠시 후 다시 시도해주세요.</h6>
                                    <Button onClick={handleClickConfirmToRest}>{confirmButtonText}</Button>
                                </>
                            )
                        case LoadStatus.MISS:
                            return (
                                <>
                                    <QuestionMark />
                                    <h6 className="text-center">{idToSearch}님을 찾지 못했어요.<br />Id를 다시 확인해주세요.</h6>
                                    <Button onClick={handleClickConfirmToRest}>{confirmButtonText}</Button>
                                </>
                            )
                        default:
                            return null;
                    }
                })()
            }
        </div>
    );
}

/* 케미 테스트를 위해 친구를 추가하는 Dialog.
 * 사용자가 해당 액션에 집중할 수 있도록 backdrop을 사용. */
function AddFriendDialog({ ...dialogProps }: AddFriendProps){
    
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
    const [userListLoadStatus, setUserListLoadStatus] = useUserListLoadStatus({delay: 3000});
    // const [userListLoadStatus, setUserListLoadStatus] = useState<LoadStatus>(LoadStatus.REST);
    // const [userListLoadStatus, setUserListLoadStatus] = useState<LoadStatus>(LoadStatus.REST);
    const fetchResultById = useGetResultById();
    const handleClickAdd = () => {
        setUserListLoadStatus(LoadStatus.PENDING);
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
        //             setUserListLoadStatus(LoadStatus.SUCCESS);
        //             setUserCardInfoList([...userCardInfoList, data]);
        //             setOpen(false);  
        //         }         
        //         /* Find miss. 입력한 id가 UserInfo DB에 존재하지 않음.  */     
        //         else{
        //             setUserListLoadStatus(LoadStatus.MISS);                    
        //         }
        //     })
    };

    const handleClickConfirmToRestmiss = () => {
        setUserListLoadStatus(LoadStatus.REST);
    }

    return(
        <Dialog {...dialogProps} open={true} className=''>
            {/* Dialog 컴포넌트 내에서는 DialogContent 내에서만 텍스트 관련 HTML 태그(h1, h2, p, ...)가 작동함. (공식 문서 설명 없음. 테스트 해본 결과.)*/}
            <DialogContent>
                {/* DialogTitle, DialogContent 컴포넌트를 사용해 Dialog 내부를 구성할 수도 있으나, 확장성을 위해 div로 구성함. */}
                <div className='flex flex-col justify-stretch space-y-6 m-4'>
                    <h4>{strings.addByName}</h4>
                        <div className='flex flex-col justify-around items-center h-24' >
                            <AddFriend/>
                        </div>
                    <h4>{strings.giveMyName}</h4>
                    <Chip label={userName}></Chip>
                </div> 
            </DialogContent>
        </Dialog>
    );
}

export default AddFriend;
export { AddFriend, AddFriendDialog }