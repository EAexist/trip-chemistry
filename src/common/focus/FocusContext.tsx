import { PropsWithChildren, createContext, useContext, isValidElement, cloneElement, Children, ComponentType, useCallback, useState } from 'react';
import { TestName, useTestResponse } from '../reducer/testResponseReducer';
import { WithAnimationProps } from '../hocs/withAnimation';

type FocusType = number | string | boolean

interface FocusContextProps {
    focus: FocusType;
    setFocus: ( focus: FocusType ) => void;
}

const FocusContext = createContext<FocusContextProps>({} as FocusContextProps);

/* Wrapper, Context Provider.
 * 컴포넌트 A에 마우스를 올렸을 때에만 컴포넌트 B 를 보여주고 싶은 경우, 컴포넌트 A B 를 모두 같은 FocusContextProvider 로 wrap. */
function FocusContextProvider({value, children}: PropsWithChildren<{value?: FocusContextProps}>) {

    const [ focus, setFocus ] = useState<FocusType>(-1); 
    return (
        <FocusContext.Provider value={{focus: focus, setFocus: setFocus}}>
            {children}
        </FocusContext.Provider>
    );
}

const withFocusContext = <T extends {}>(WrappedComponent: ComponentType<T>) => 
    (props: T) => {

    const [ focus, setFocus ] = useState<FocusType>(-1);

    return (
        <FocusContextProvider value ={{focus : focus, setFocus: setFocus}}>
            <WrappedComponent {...props as T}/>
        </FocusContextProvider>
    );
}

function useFocusContext() {
    return useContext(FocusContext); 
}
function useShowOnHover() {
    const { focus } = useFocusContext();   
    const getIfShowOnHover = useCallback((id: number, compareFunc = (id:FocusType, contextId:FocusType)=>(id === contextId))=>
        compareFunc(id, focus)
    , [focus]);
    return getIfShowOnHover; 
}
function useShowOnResponse(testName: TestName) {
    const { focus } = useFocusContext();   
    const getIfShowOnHover = useShowOnHover();
    const testResponse = useTestResponse(testName);
    const getIfShowOnResponse = useCallback((id: number, compareFunc = (id:FocusType, contextId:FocusType)=>(id === contextId)) => {
        console.log(`getIfShowOnResponse: focus=${focus} compareFunc=${compareFunc(id, testResponse as FocusType)}`);
        return focus === -1 ? compareFunc(id, testResponse as FocusType) : getIfShowOnHover(id, compareFunc);
    }
    , [focus, getIfShowOnHover, testResponse]);
    return getIfShowOnResponse; 
}

/* HOC <withHover/>
 * 컴포넌트 A에 마우스를 올렸을 때에만 컴포넌트 B 를 보여주고 싶은 경우, 컴포넌트 A에 적용.
 * Component에 마우스를 hovering 중인지 아닌지에 component가 위치한 FocusContext focus 값을 대응시킴. */
interface withHoverProps{
    onMouseEnter: ()=>void
    onMouseLeave: ()=>void
};
interface withHoverHOCProps{
    id: FocusType;
    isDisabled?: boolean;
    listenOnly?: 'leave' | 'enter';
}
const withHover = <P extends withHoverProps>(WrappedComponent: ComponentType<P>) => 
    ({id, isDisabled = false, listenOnly}: withHoverHOCProps) => 
    (props: Omit<P, keyof withHoverProps>) => {
    const { focus, setFocus } = useFocusContext();   
    // const setFocus = (id:any) => {};
    console.log(`withHover: id=${id} props=${JSON.stringify(props)} context=${focus}, ${setFocus} isDisabled=${isDisabled} `)
    return (
        setFocus !== undefined ?
            <WrappedComponent 
                {...{
                    onMouseEnter: listenOnly==='leave'? undefined : isDisabled? undefined : ()=>{console.log("onMousrEnter"); setFocus(id)},
                    onMouseLeave: listenOnly==='enter'? undefined : isDisabled? undefined : ()=>{console.log("onMousrLeave"); setFocus(-1)}
                }}
                    {...props as P}
            /> :
            <WrappedComponent {...props as P}/>
    );
}

const Focusable = ({ id = true, isDisabled = false, listenOnly, children }: PropsWithChildren<{id?: FocusType, isDisabled?: boolean, listenOnly?: 'leave' | 'enter'}> ) => {
    const { focus, setFocus } = useFocusContext();    
    console.log(`Focusable - id=${id} focus=${focus} setFocus=${setFocus}`)
    return (
        <>
        {setFocus !== undefined ?            
            Children?.map(children, (child) => {
                if (isValidElement(child)) {
                    return (
                        <>
                            {cloneElement(child as JSX.Element, {
                                onMouseEnter: listenOnly==='leave'? undefined : isDisabled? undefined : ()=>{console.log("onMouseEnter"); setFocus(id)},
                                onMouseLeave: listenOnly==='enter'? undefined : isDisabled? undefined : ()=>{console.log("onMouseLeave"); setFocus(-1)}
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
 * Component가 위치한 FocusContext 의 focus 값이 
 * true 일 때만 (무엇인가에 hovering 중일 때에만) child를 보여주고, 
 * false 일 때는 보여주지 않도록 함. */
interface withShowOnHoverProps{
    className? : string
};
interface withShowOnHoverHOCProps{
    id: FocusType; 
    defaultShow?: boolean;
    force?: boolean; 
    compareFunc?: (id:FocusType, contextId:FocusType)=>boolean;
};
const withShowOnHover = <T extends withShowOnHoverProps>(WrappedComponent: ComponentType<T>) =>
    ({id, force, defaultShow, compareFunc = (id:FocusType, contextId:FocusType)=>(id === contextId)}: withShowOnHoverHOCProps) => /* id: 인덱스, force: true 일 경우 로직을 비활성화하고 컴포넌트를 항상 보여줌.(디버깅) defaultShow: true 일 경우 마우스를 올리지 않았을 때에도 컴포넌트를 보여줌. */
    (props: T) => {
    const { focus } = useFocusContext();
    console.log(`withShowOnHover: id=${id} focus=${focus} defaultShow=${defaultShow}`);    
    return(
        (force 
            ||
            (focus === -1 ?
                defaultShow
                : compareFunc(id, focus) 
            ) 
        )
        && <WrappedComponent {...props as T}/>  
    );
}

interface FocusDetailProps{
    id?: FocusType; /* id: 인덱스, force: true 일 경우 로직을 비활성화하고 컴포넌트를 항상 보여줌.(디버깅) defaultShow: true 일 경우 마우스를 올리지 않았을 때에도 컴포넌트를 보여줌. */ 
    defaultShow?: boolean;
    force?: boolean; 
    compareFunc?: (id:FocusType, contextId:FocusType)=>boolean;
};
function FocusDetail({id=true, force, defaultShow=false, compareFunc = (id:FocusType, contextId:FocusType)=>(id === contextId), children}: PropsWithChildren<FocusDetailProps>) {
    const { focus } = useFocusContext();
    console.log(`withShowOnHover: focus=${focus} defaultShow=${defaultShow}`);    
    return(
        (force 
            || (focus === -1 ?
                defaultShow
                :compareFunc(id, focus) 
            )
        )
        // && <div className={focus === -1 ? 'invisible animate-delay1' : undefined}>{children}</div>
        && children
    );
}

interface FocusSummaryProps{
    id?: FocusType; /* id: 인덱스, force: true 일 경우 로직을 비활성화하고 컴포넌트를 항상 보여줌.(디버깅) defaultShow: true 일 경우 마우스를 올리지 않았을 때에도 컴포넌트를 보여줌. */ 
    defaultShow?: boolean;
    force?: boolean; 
    compareFunc?: (id:FocusType, contextId:FocusType)=>boolean;
};
function FocusSummary({id=true, force, defaultShow=false, compareFunc = (id:FocusType, contextId:FocusType)=>(id === contextId), children}: PropsWithChildren<FocusDetailProps>) {
    const { focus } = useFocusContext();
    console.log(`withShowOnHover: focus=${focus} defaultShow=${defaultShow}`);    
    return(
        (force 
            || (focus === -1 ?
                defaultShow
                :!compareFunc(id, focus) 
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
    compareFunc?: (id:FocusType, contextId:FocusType)=>boolean;
    withAnimationProps?: WithAnimationProps; /* hover로 디테일이 렌더링 될 때 애니메이션을 실행하기 위한 WithAnimationWrapper 의 props */
};
const withShowOnResponse = <T extends withShowOnResponseProps>(WrappedComponent: ComponentType<T>) =>
    ({id, testName, force, compareFunc = (id:FocusType, contextId:FocusType)=>(id === contextId)}: withShowOnResponseHOCProps) => /* id: 인덱스, force: true 일 경우 로직을 비활성화하고 컴포넌트를 항상 보여줌.(디버깅) defaultShow: true 일 경우 마우스를 올리지 않았을 때에도 컴포넌트를 보여줌. */
    (props: T) => {
    const { focus } = useFocusContext();
    const testResponse = useTestResponse(testName);
    const isActive = compareFunc(id, testResponse as FocusType);
    
    console.log(`withShowOnResponse: id=${id} isActive=${isActive}`);    
    return(
        (force 
            || (focus === -1 ?
                compareFunc(id, testResponse as FocusType)
                :compareFunc(id, focus) 
            )
        )
        && <WrappedComponent {...props as T}/> 
    );
}
interface WithActiveOnResponseProps{
    isActive: boolean;
};
const withActiveOnResponse = <T extends WithActiveOnResponseProps>(WrappedComponent: ComponentType<T>) =>
    ({id, testName, force, compareFunc = (id:FocusType, contextId:FocusType)=>(id === contextId)}: withShowOnResponseHOCProps) => /* id: 인덱스, force: true 일 경우 로직을 비활성화하고 컴포넌트를 항상 보여줌.(디버깅) defaultShow: true 일 경우 마우스를 올리지 않았을 때에도 컴포넌트를 보여줌. */
    (props: Omit<T, keyof WithActiveOnResponseProps>) => {
    const { focus } = useFocusContext();
    const testResponse = useTestResponse(testName);
    const isActive = force ||
    (focus === -1 ?
        compareFunc(id, testResponse as FocusType)
        :compareFunc(id, focus) 
    )
    
    console.log(`withActiveOnResponse: id=${id} isActive=${isActive}`);    
    return(<WrappedComponent {...{isActive : isActive}} {...props as T}/> );
}

export { FocusContextProvider, useFocusContext, 
    withHover, withShowOnHover, withShowOnResponse,
    Focusable, FocusDetail, FocusSummary,
    FocusContext,
    useShowOnResponse, withActiveOnResponse, withFocusContext }

export type { FocusType, FocusContextProps, withShowOnHoverProps, withHoverProps, withShowOnResponseHOCProps, WithActiveOnResponseProps };