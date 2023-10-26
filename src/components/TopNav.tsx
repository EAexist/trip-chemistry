import { Link, useLocation } from "react-router-dom";
import { BASEPAGES } from "../pages";
import ToggleButton from "./ToggleButton";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

interface TopNavProps{
};

/* 테스트 제목 및 옵션 */
function TopNav({} : TopNavProps){

    const { element } = useContext(TopNavContext);

    const currentPath = useLocation().pathname.replace('/', '');
    console.log(`TopNav: currentPath = ${currentPath}`);

    return(
        <div className = 'flex flex-row space-x-8 items-center'>
            <div className = 'flex flex-row space-x-8'>
                {
                    Object.entries(BASEPAGES)?.map(([key, { path, label }]) => {
                        return (
                            <Link to ={path}>
                                <ToggleButton isActive={currentPath === key}>{label}</ToggleButton>
                            </Link>
                        )
                    })
                }
            </div>
            {(element !== undefined) && <h4 className='pr-12'>|</h4>}
            <div>
                {element}
            </div>
        </div>
    );
}

interface TopNavContextProps{
    element: React.ReactNode;
    setElement: ( element: React.ReactNode ) => void;
} 
const TopNavContext = createContext<TopNavContextProps>({} as TopNavContextProps);

function TopNavContextProvider({ children }: PropsWithChildren) {

    const [ element, setElement ] = useState<React.ReactNode>();

    return(
        <TopNavContext.Provider
            value={{element : element, setElement: setElement}}
        >
            {children}
        </TopNavContext.Provider>
    )
}

interface UseSetElementProps{
    element?: React.ReactNode;
    dep?: any[];
};
const useSetElement = ({element, dep=[]} : UseSetElementProps) => {

    const { setElement } = useContext(TopNavContext);

    useEffect(()=>{
        setElement(element);
    }, [ setElement, ...dep ]);
}

export default TopNav;
export { TopNavContext, TopNavContextProvider, useSetElement }