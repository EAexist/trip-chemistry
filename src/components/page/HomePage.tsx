import { Link } from 'react-router-dom';

import Button from '../Button'

import { usePageString } from "../../texts";
import { useSetTopNav } from '../TopNav';

interface HomePageProps{
};

function HomePage({}:HomePageProps){
    const page = 'home'
    const strings = usePageString(page);

    const handleClickLogin = () => {

    }

    const handleClickStart = () => {
        
    }
    useSetTopNav({});

    return(
        <div className='full page body'>
            <div>
            <h2>{strings.appTitle}</h2>
            <div className = 'flex flex-row'>
                <Button onClick={handleClickLogin}>{strings.loginButton}</Button>
                <Link to='/test'>
                    <Button onClick={handleClickStart}>{strings.startButton}</Button>
                </Link>
            </div>
            <div className=''>
                <h2>{strings.infoTitle}</h2>
                <p>{strings.infoBody}</p>
            </div>
            </div>
        </div>
    );
}
export default HomePage;