import { Link, useNavigate } from 'react-router-dom';

/* Redux */
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

/* Original Components */
import Button from '../Button';
import useServerApi from '../utils/useServerApi';
import { TestResponse, UserId, withTestResponseProps } from '../../interface/interfaces';
import { useState } from 'react';
import ApiLoader, { loadStatus } from '../ApiLoader';
import { withLoadStatusProps } from '../utils/withLoadStatus';
import axios from 'axios';

interface TestUserConfirmProps extends withLoadStatusProps, withTestResponseProps{
    
};

/* Debug */
const userName : UserId  = "디클1234";
const id : UserId = "디클1234";

function TestUserConfirm({status, setStatus = ()=>{}}: TestUserConfirmProps){

    const response = useSelector((state:RootState)=>state.testResponse);
    const navigate = useNavigate();

    /* API 응답 후 다음 함수 실행시 까지 딜레이 */
    const apiResponseHandlerDelay = 2000;


    /* Put 성공 응답시
     * apiResponseHandlerDelay 후 result 페이지로 navigate.
     */
    const handlePutResponse = (data: TestResponse) => {
        console.log('handlePutResponse')
        setStatus(loadStatus.SUCCESS);
        let handlePutResponseTimer = setTimeout(()=>{
            console.log('handlePutResponse handlePutResponseTimer')
            navigate('/result'); 
        }, apiResponseHandlerDelay);
    }

    /* Put 성공 실패시
     * apiResponseHandlerDelay 동안 실패 안내 표시. */
    const handlePutNoResponse = () => {
        setStatus(loadStatus.FAIL);        
    }
    
    /* API: 테스트 응답 제출
     * async(비동기). PUT /user/{id}/response */
    const putResponse = useServerApi({
        path: "/user/디클1234/response",
        handleResponse: handlePutResponse,
        handleNoResponse: handlePutNoResponse,
        fetchProps: {
            method: "PUT", 
            headers: {
                // "Accepts": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(response),
        }
    });

    const handleClickConfirm = () => {        
        setStatus(loadStatus.PENDING);
        putResponse();
    }

    return(
        <>
            <Button onClick={handleClickConfirm}>결과 확인하러 가기</Button>
        </>
    );
}
export default TestUserConfirm;