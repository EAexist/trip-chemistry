interface useServerApiProps{
    path: string; 
    handleResponse?:(data: any)=>void; 
    handleNoResponse?:()=>void; 
    fetchProps:{
        method: 'GET' | 'POST' | 'PUT'; 
        headers: any
        // {
        //     "Content-Type": "application/json",
        // },
        body?: any,
    };
};

const useServerApi = ({path, handleResponse, handleNoResponse, fetchProps}:useServerApiProps) => () => {

    console.log(`useServerApi path=${path} body=${fetchProps.body}`)

    fetch(path, fetchProps) 
    .then((response) => {
        console.log(`useServerApi response=${JSON.stringify(response)}`);
        return response.json();
    })
    .then((data) => {
        if(data){ /* Find Success. 입력한 id가 UserInfo DB에 존재하며 사용자 정보를 응답으로 받음. data: UserData 객체. */
            console.log(`useServerApi data=${JSON.stringify(data)}`);
            handleResponse && handleResponse(data);
        }         
        else{ /* Find miss. 입력한 id가 UserInfo DB에 존재하지 않음. */
        handleNoResponse && handleNoResponse();      
        }
    })             
}

const useServerAPI = ({path, fetchProps}:useServerApiProps) => {

    // console.log(`useServerAPI path=${path} body=${fetchProps.body}`)

    return(
        fetch(path, fetchProps) 
            .then((response) => {
                console.log(`useServerAPI- response=${JSON.stringify(response)}`);
                if(!response.ok) throw new Error(response.statusText);
                else return response.json();
        })
    );
}

export default useServerApi;
export { useServerAPI };

/* Deprecated: Api Calls Without Hook */
/* API 호출 - axios.*/ 
// try{
//     axios.put(`./user/${id}/response`, JSON.stringify(response))
//         .then((response) => {
//             console.log(`headers=${response.headers}\nstatus=${response.status}`)
//             return response.data;
//         })
//         .then((data) => {
//             if(data){ /* Find Success. 입력한 id가 UserInfo DB에 존재하며 사용자 정보를 응답으로 받음. data: UserData 객체. */
//                 // console.log(`data=${data}`)
//                 handlePutResponse(data);
//             }                     
//             else{ /* Find miss. 입력한 id가 UserInfo DB에 존재하지 않음. */     
//                 // console.log(data)
//                 handlePutNoResponse();      
//             }
//         })     
// } catch (e) {
//     console.error(e);
// }

/* API 호출 - fetch.*/ 
// fetch(`/user/${id}/response`, {
// fetch("/user/udon1234/response", {
//     method: "PUT", 
//     headers: {
//         // "Accepts": "application/json",
//         "Content-Type": "application/json",
//     },
//     body: JSON.stringify(response),
// }).then((response) => {
//     console.log(`headers=${response.headers}\nstatus=${response.status}`)
//     return response.json();
// }).then((data) => {
//     if(data){ /* Find Success. 입력한 id가 UserInfo DB에 존재하며 사용자 정보를 응답으로 받음. data: UserData 객체. */
//         // console.log(`data=${data}`)
//         handlePutResponse(data);
//     }                     
//     else{ /* Find miss. 입력한 id가 UserInfo DB에 존재하지 않음.  */     
//         // console.log(data)
//         handlePutNoResponse();      
//     }
// })              