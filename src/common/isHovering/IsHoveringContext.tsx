import { PropsWithChildren, createContext, useContext, isValidElement, cloneElement, Children, ComponentType, useCallback } from 'react';
import { TestName, useTestResponse } from '../reducer/testResponseReducer';
import { WithAnimationProps } from '../hocs/withAnimation';

type IsHoveringType = number | string | boolean

interface IsHoveringContextProps {
    isHovering: IsHoveringType;
    setIsHovering: (isHovering: IsHoveringType) => void;
}

const IsHoveringContext = createContext<IsHoveringContextProps>({} as IsHoveringContextProps);

/* Wrapper, Context Provider.
 * 컴포넌트 A에 마우스를 올렸을 때에만 컴포넌트 B 를 보여주고 싶은 경우, 컴포넌트 A B 를 모두 같은 IsHoveringContextProvider 로 wrap. */
function IsHoveringContextProvider({value, children}: PropsWithChildren<{value: IsHoveringContextProps}>) {
    // const {isHovering, setIsHovering} = value;
    return (
        <IsHoveringContext.Provider value={value}>
            {children}
        </IsHoveringContext.Provider>
    );
}

function useIsHoveringContext() {
    return useContext(IsHoveringContext); 
}
function useShowOnHover() {
    const { isHovering } = useIsHoveringContext();   
    const getIfShowOnHover = useCallback((id: number, compareFunc = (id:IsHoveringType, contextId:IsHoveringType)=>(id === contextId))=>
        compareFunc(id, isHovering)
    , [isHovering]);
    return getIfShowOnHover; 
}
function useShowOnResponse(testName: TestName) {
    const { isHovering } = useIsHoveringContext();   
    const getIfShowOnHover = useShowOnHover();
    const testResponse = useTestResponse(testName);
    const getIfShowOnResponse = useCallback((id: number, compareFunc = (id:IsHoveringType, contextId:IsHoveringType)=>(id === contextId)) => {
        console.log(`getIfShowOnResponse: isHovering=${isHovering} compareFunc=${compareFunc(id, testResponse as IsHoveringType)}`);
        return isHovering === -1 ? compareFunc(id, testResponse as IsHoveringType) : getIfShowOnHover(id, compareFunc);
    }
    , [isHovering, getIfShowOnHover, testResponse]);
    return getIfShowOnResponse; 
}

/* HOC <withHover/>
 * 컴포넌트 A에 마우스를 올렸을 때에만 컴포넌트 B 를 보여주고 싶은 경우, 컴포넌트 A에 적용.
 * Component에 마우스를 hovering 중인지 아닌지에 component가 위치한 IsHoveringContext isHovering 값을 대응시킴. */
interface withHoverProps{
    onMouseEnter: ()=>void
    onMouseLeave: ()=>void
};
interface withHoverHOCProps{
    id: IsHoveringType;
    isDisabled?: boolean;
    listenOnly?: 'leave' | 'enter';
}
const withHover = <P extends withHoverProps>(WrappedComponent: ComponentType<P>) => 
    ({id, isDisabled = false, listenOnly}: withHoverHOCProps) => 
    (props: Omit<P, keyof withHoverProps>) => {
    const { isHovering, setIsHovering } = useIsHoveringContext();   
    // const setIsHovering = (id:any) => {};
    console.log(`withHover: id=${id} props=${JSON.stringify(props)} context=${isHovering}, ${setIsHovering} isDisabled=${isDisabled} `)
    return (
        setIsHovering !== undefined ?
            <WrappedComponent 
                {...{
                    onMouseEnter: listenOnly==='leave'? undefined : isDisabled? undefined : ()=>{console.log("onMousrEnter"); setIsHovering(id)},
                    onMouseLeave: listenOnly==='enter'? undefined : isDisabled? undefined : ()=>{console.log("onMousrLeave"); setIsHovering(-1)}
                }}
                    {...props as P}
            /> :
            <WrappedComponent {...props as P}/>
    );
}

const WithHoverWrapper = ({ id = true, isDisabled = false, listenOnly, children }: PropsWithChildren<{id?: IsHoveringType, isDisabled?: boolean, listenOnly?: 'leave' | 'enter'}> ) => {
    const { isHovering, setIsHovering } = useIsHoveringContext();    
    console.log(`WithHoverWrapper - id=${id} isHovering=${isHovering} setIsHovering=${setIsHovering}`)
    return (
        <>
        {setIsHovering !== undefined ?            
            Children?.map(children, (child) => {
                if (isValidElement(child)) {
                    return (
                        <>
                            {cloneElement(child as JSX.Element, {
                                onMouseEnter: listenOnly==='leave'? undefined : isDisabled? undefined : ()=>{console.log("onMouseEnter"); setIsHovering(id)},
                                onMouseLeave: listenOnly==='enter'? undefined : isDisabled? undefined : ()=>{console.log("onMouseLeave"); setIsHovering(-1)}
                            })}
                        </>
                    );
                }
            }) :
            children}
        </>
    );
}

/* HOC <withShowOnHover/>
 * 컴포넌트 A에 마우스를 올렸을 때에만 컴포넌트 B 를 보여주고 싶은 경우, 컴포넌트 B에 적용. 
 * Component가 위치한 IsHoveringContext 의 isHovering 값이 
 * true 일 때만 (무엇인가에 hovering 중일 때에만) child를 보여주고, 
 * false 일 때는 보여주지 않도록 함. */
interface withShowOnHoverProps{
    className? : string
};
interface withShowOnHoverHOCProps{
    id: IsHoveringType; 
    defaultShow?: boolean;
    force?: boolean; 
    compareFunc?: (id:IsHoveringType, contextId:IsHoveringType)=>boolean;
};
const withShowOnHover = <T extends withShowOnHoverProps>(WrappedComponent: ComponentType<T>) =>
    ({id, force, defaultShow, compareFunc = (id:IsHoveringType, contextId:IsHoveringType)=>(id === contextId)}: withShowOnHoverHOCProps) => /* id: 인덱스, force: true 일 경우 로직을 비활성화하고 컴포넌트를 항상 보여줌.(디버깅) defaultShow: true 일 경우 마우스를 올리지 않았을 때에도 컴포넌트를 보여줌. */
    (props: T) => {
    const { isHovering } = useIsHoveringContext();
    console.log(`withShowOnHover: id=${id} isHovering=${isHovering} defaultShow=${defaultShow}`);    
    return(
        (force 
            ||
            (isHovering === -1 ?
                defaultShow
                : compareFunc(id, isHovering) 
            ) 
        )
        && <WrappedComponent {...props as T}/>  
    );
}
interface WithShowOnHoverWrapperProps{
    id: IsHoveringType; /* id: 인덱스, force: true 일 경우 로직을 비활성화하고 컴포넌트를 항상 보여줌.(디버깅) defaultShow: true 일 경우 마우스를 올리지 않았을 때에도 컴포넌트를 보여줌. */ 
    defaultShow?: boolean;
    force?: boolean; 
    compareFunc?: (id:IsHoveringType, contextId:IsHoveringType)=>boolean;
};
function WithShowOnHoverWrapper({id, force, defaultShow=false, compareFunc = (id:IsHoveringType, contextId:IsHoveringType)=>(id === contextId), children}: PropsWithChildren<WithShowOnHoverWrapperProps>) {
    const { isHovering } = useIsHoveringContext();
    console.log(`withShowOnHover: isHovering=${isHovering} defaultShow=${defaultShow}`);    
    return(
        (force 
            || (isHovering === -1 ?
                defaultShow
                :compareFunc(id, isHovering) 
            )
        )
        && children
    );
}

interface withShowOnResponseProps{
};
interface withShowOnResponseHOCProps{
    id: number; /* Carousel 에서 아이템을 특정하는 id */
    testName: TestName;
    force?: boolean; 
    compareFunc?: (id:IsHoveringType, contextId:IsHoveringType)=>boolean;
    withAnimationProps?: WithAnimationProps; /* hover로 디테일이 렌더링 될 때 애니메이션을 실행하기 위한 WithAnimationWrapper 의 props */
};
const withShowOnResponse = <T extends withShowOnResponseProps>(WrappedComponent: ComponentType<T>) =>
    ({id, testName, force, compareFunc = (id:IsHoveringType, contextId:IsHoveringType)=>(id === contextId)}: withShowOnResponseHOCProps) => /* id: 인덱스, force: true 일 경우 로직을 비활성화하고 컴포넌트를 항상 보여줌.(디버깅) defaultShow: true 일 경우 마우스를 올리지 않았을 때에도 컴포넌트를 보여줌. */
    (props: T) => {
    const { isHovering } = useIsHoveringContext();
    const testResponse = useTestResponse(testName);
    const isActive = compareFunc(id, testResponse as IsHoveringType);
    
    console.log(`withShowOnResponse: id=${id} isActive=${isActive}`);    
    return(
        (force 
            || (isHovering === -1 ?
                compareFunc(id, testResponse as IsHoveringType)
                :compareFunc(id, isHovering) 
            )
        )
        && <WrappedComponent {...props as T}/> 
    );
}
interface WithActiveOnResponseProps{
    isActive: boolean;
};
const withActiveOnResponse = <T extends WithActiveOnResponseProps>(WrappedComponent: ComponentType<T>) =>
    ({id, testName, force, compareFunc = (id:IsHoveringType, contextId:IsHoveringType)=>(id === contextId)}: withShowOnResponseHOCProps) => /* id: 인덱스, force: true 일 경우 로직을 비활성화하고 컴포넌트를 항상 보여줌.(디버깅) defaultShow: true 일 경우 마우스를 올리지 않았을 때에도 컴포넌트를 보여줌. */
    (props: Omit<T, keyof WithActiveOnResponseProps>) => {
    const { isHovering } = useIsHoveringContext();
    const testResponse = useTestResponse(testName);
    const isActive = force ||
    (isHovering === -1 ?
        compareFunc(id, testResponse as IsHoveringType)
        :compareFunc(id, isHovering) 
    )
    
    console.log(`withActiveOnResponse: id=${id} isActive=${isActive}`);    
    return(<WrappedComponent {...{isActive : isActive}} {...props as T}/> );
}

export { IsHoveringContextProvider, useIsHoveringContext, 
    withHover, withShowOnHover, withShowOnResponse,
    WithHoverWrapper, WithShowOnHoverWrapper, IsHoveringContext,
    useShowOnResponse, withActiveOnResponse }

export type { IsHoveringType, IsHoveringContextProps, withShowOnHoverProps, withHoverProps, withShowOnResponseHOCProps, WithActiveOnResponseProps };