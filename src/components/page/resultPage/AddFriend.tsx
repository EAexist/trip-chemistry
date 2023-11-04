import { useState } from 'react';
import { CircularProgress, Icon } from '@mui/material';
import { usePageString } from '../../../texts';
import AsyncAutoComplete from "../../AsyncAutoComplete";
import Button from '../../Button';
import { useHandleLoadSuccess } from '../../../common/hook/useHandleLoadSuccess';
import { addUser, asyncGetTestResult, deleteUser, useFindUser, useLoadStatus } from '../../../common/reducer/userListReducer';
import { LoadStatus } from '../../../common/types/loadStatus';
import { AppDispatch, RootState } from '../../../common/store';
import { useDispatch } from 'react-redux';

const userName = '디클1234'

interface AddFriendProps{
    // setOpen: (isOpen:boolean)=>void,
};

/* 케미 테스트를 위해 친구를 추가하는 Dialog.
 * 사용자가 해당 액션에 집중할 수 있도록 backdrop을 사용. */
function AddFriend({}: AddFriendProps){

    const page = 'chemistry'
    const strings = Object(usePageString(page).sections.addFriend);

    const [ idToSearch, setIdToSearch ] = useState(''); /* AutoComplete에 사용자가 입력한 값 */

    const [ loadStatus, setStatus ] = useLoadStatus( idToSearch, 'testResult' );

    const status = loadStatus ? loadStatus : LoadStatus.REST;

    const findUser = useFindUser();
    const successToRestSecond = useHandleLoadSuccess({ status, setStatus, delay: 3000});
    const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
    
    const [ showRedundancyWarning, setShowRedundancyWarning ] = useState<boolean>(false);
    const handleClickConfirmRedundancyWarning = () => setShowRedundancyWarning(false);

    const handleClickAdd = () => {
        if(findUser( idToSearch )){
            setShowRedundancyWarning(true);
        }
        else{
            dispatch( addUser( idToSearch ) );
            setStatus( LoadStatus.PENDING );
            dispatch( asyncGetTestResult( idToSearch ) );       
        }
    }
    const handleClickConfirmSuccess = () => {
        setStatus(LoadStatus.REST);
    };
    const handleClickConfirmMissFail = () => {
        dispatch( deleteUser( idToSearch ) );       
        
    };
    const confirmButtonText = '확인';
    
    return(
        <div className={`flex flex-col w-full h-full items-center justify-center`}>
            {
                showRedundancyWarning ? 
                <>
                    <Icon>warning</Icon>
                    <h6 className="text-center">{idToSearch}님은<br />이미 친구로 추가되었어요!</h6>
                    <Button onClick={handleClickConfirmRedundancyWarning}>{ confirmButtonText }</Button>
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
                                    <div className='flex justify-center'>
                                        <Button onClick={handleClickAdd}><h6>{strings.add}</h6></Button>
                                    </div>

                                </div>
                            )
                        case LoadStatus.PENDING:
                            return (
                                <CircularProgress />
                            )
                        case LoadStatus.SUCCESS:
                            return (
                                <>
                                    <Icon>done</Icon>
                                    <h6 className="text-center">{idToSearch}님을 일행으로 추가했어요.</h6>
                                    {(successToRestSecond > 0) && <h6 className="text-center">{successToRestSecond}초 후 닫힘</h6>}
                                    <Button onClick={ handleClickConfirmSuccess }>{ confirmButtonText }</Button>
                                </>
                            )
                        case LoadStatus.FAIL:
                            return (
                                <>
                                    <Icon>warning</Icon>
                                    <h6 className="text-center">지금 서버에 연결할 수 없어요.<br />잠시 후 다시 시도해주세요.</h6>
                                    <Button onClick={ handleClickConfirmMissFail }>{ confirmButtonText }</Button>
                                </>
                            )
                        case LoadStatus.MISS:
                            return (
                                <>
                                    <Icon>question_mark</Icon>
                                    <h6 className="text-center">{idToSearch}님을 찾지 못했어요.<br />Id를 다시 확인해주세요.</h6>
                                    <Button onClick={ handleClickConfirmMissFail }>{ confirmButtonText }</Button>
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
// function AddFriendDialog({ ...dialogProps }: AddFriendProps){
    
//     const loaderStrings = {
//         loader: {
//             'rest': {},
//             'pending': {},
//             'success': {
//                 alertText: `${""}님을 일행으로 추가했어요.`,
//             }, 
//             'miss': {
//                 alertText: `${""}님을 찾지 못했어요. Id를 다시 확인해주세요.`,
//                  confirmButtonText : '확인'
//             }, 
//             'fail': {
//                 alertText: `지금 서버에 연결할 수 없어요. 잠시 후 다시 시도해주세요.`,
//                  confirmButtonText : '확인'
//             }
//         }
//     }

//     const [idToSearch, setIdToSearch] = useState(''); /* AutoComplete에 사용자가 입력한 값 */

//     const getFriendApiPath = "/user";
//     const page = 'result'
//     const strings = Object(usePageString(page).addFriendDialog);
//     const [ userDataObjectLoadStatus, setUserListLoadStatus ] = useLoadStatus({});
//     // const [userListLoadStatus, setUserListLoadStatus] = useState<LoadStatus>(LoadStatus.REST);
//     // const [userListLoadStatus, setUserListLoadStatus] = useState<LoadStatus>(LoadStatus.REST);
//     const fetchResult = useGetResult();
//     const handleClickAdd = () => {
//         setUserListLoadStatus(LoadStatus.PENDING);
//         fetchResult(idToSearch);
        
//         /* ! Deprecated API 호출
//          * :port/users/{Id}
//          */
//         // fetch(`${getFriendApiPath}/${idToSearch}`)
//         //     .then((response) => {
//         //         return response.json();
//         //     })
//         //     .then((data) => {
//         //         /* Find Success. 입력한 id가 UserInfo DB에 존재하며 사용자 정보를 응답으로 받음. 
//         //          * data: user 객체.*/
//         //         if(data){
//         //             console.log(data);
//         //             setUserListLoadStatus(LoadStatus.SUCCESS);
//         //             setUserCardInfoList([...userCardInfoList, data]);
//         //             setOpen(false);  
//         //         }         
//         //         /* Find miss. 입력한 id가 UserInfo DB에 존재하지 않음.  */     
//         //         else{
//         //             setUserListLoadStatus(LoadStatus.MISS);                    
//         //         }
//         //     })
//     };

//     const handleClickConfirmToRestmiss = () => {
//         setUserListLoadStatus(LoadStatus.REST);
//     }

//     return(
//         <Dialog {...dialogProps} open={true} className=''>
//             {/* Dialog 컴포넌트 내에서는 DialogContent 내에서만 텍스트 관련 HTML 태그(h1, h2, p, ...)가 작동함. (공식 문서 설명 없음. 테스트 해본 결과.)*/}
//             <DialogContent>
//                 {/* DialogTitle, DialogContent 컴포넌트를 사용해 Dialog 내부를 구성할 수도 있으나, 확장성을 위해 div로 구성함. */}
//                 <div className='flex flex-col justify-stretch space-y-6 m-4'>
//                     <h4>{strings.addByName}</h4>
//                         <div className='flex flex-col justify-around items-center h-24' >
//                             <AddFriend/>
//                         </div>
//                     <h4>{strings.giveMyName}</h4>
//                     <Chip label={userName}></Chip>
//                 </div> 
//             </DialogContent>
//         </Dialog>
//     );
// }

export default AddFriend;
export { AddFriend }