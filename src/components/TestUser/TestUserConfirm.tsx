import { Link } from 'react-router-dom';
import Button from '../Button';

interface TestUserConfirmProps{

};

function TestUserConfirm({}:TestUserConfirmProps){

    const handleClick = () => {
        
    }
    return(
    <div>
        <Link to='/result'>
        <Button onClick={handleClick}>결과 확인하러 가기</Button>
        </Link>
    </div>
    );
}
export default TestUserConfirm;