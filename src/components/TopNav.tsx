import { Link, useLocation } from "react-router-dom";
import { BASEPAGES } from "../pages";
import ToggleButton from "./ToggleButton";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

interface TopNavProps{
};

/* 테스트 제목 및 옵션 */
function TopNav({} : TopNavProps){

    const { element } = useTopNavContext();

    const currentPath = useLocation().pathname.replace('/', '');
    console.log(`TopNav: currentPath = ${currentPath}`);

    return(
        <div className="flex-none h-16"> 
            <div className='fixed top-0 left-0 z-50 w-full h-16 px-16 space-x-8 flex flex-row items-center bg-white'>
                <div className='flex flex-row space-x-8'>
                    {Object.entries(BASEPAGES)?.map(([ key, { path, label } ]) => {
                        return (
                            <div key={key} className={`flex justify-center ${key === 'home' ? 'w-36 mr-12' : 'w-28'}`}>
                                <Link to={path}>
                                    <ToggleButton isActive={currentPath === key}><div className=' p-1'>{label}</div></ToggleButton>
                                </Link>
                            </div>
                        )
                    })}
                </div>
                {( element !== undefined ) && <h4 className='pr-12'>|</h4>}
                <div>
                    {element}
                </div>
            </div>    
        </div>
    );
}

interface ElementContextProps{
    element: React.ReactNode;
    setElement: ( element: React.ReactNode ) => void;
};
interface TopNavContextProps extends ElementContextProps{};
const TopNavContext = createContext<TopNavContextProps>({} as TopNavContextProps);

function TopNavContextProvider({ children }: PropsWithChildren) {

    const [ element, setElement ] = useState<React.ReactNode>();

    return(
        <TopNavContext.Provider value={{element : element, setElement: setElement}}>
            {children}
        </TopNavContext.Provider>
    )
}

const useTopNavContext = () => useContext(TopNavContext);

interface UseSetElementProps{
    element?: React.ReactNode;
    dep?: any[];
};
interface useSetTopNavProps extends UseSetElementProps{};
const useSetTopNav = ({element, dep=[]} : useSetTopNavProps) => {

    const { setElement } = useTopNavContext();

    useEffect(()=>{
        setElement(element);
    }, [ setElement, ...dep ]);
}

export default TopNav;
export { TopNavContextProvider, useTopNavContext, useSetTopNav }; 
export type { ElementContextProps, UseSetElementProps };
