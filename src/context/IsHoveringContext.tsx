import { unescape } from 'querystring';
import { PropsWithChildren, createContext, useContext, isValidElement, cloneElement, Children, ComponentType } from 'react';

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
    console.log(`IsHoveringContextProvider-${JSON.stringify(value)}`);
    return (
        <IsHoveringContext.Provider value={value}>
            {children}
        </IsHoveringContext.Provider>
    );
}

function useIsHoveringContext() {
    return useContext(IsHoveringContext) 
}

/* HOC <withMouseHover/>
 * 컴포넌트 A에 마우스를 올렸을 때에만 컴포넌트 B 를 보여주고 싶은 경우, 컴포넌트 A에 적용.
 * Component에 마우스를 hovering 중인지 아닌지에 component가 위치한 IsHoveringContext isHovering 값을 대응시킴. */
interface withMouseHoverProps{
    onMouseEnter?: ()=>void
    onMouseLeave?: ()=>void
};

const withMouseHover = <P extends withMouseHoverProps>(WrappedComponent: ComponentType<P>) => 
    (index: IsHoveringType, listenOnly?: 'leave' | 'enter') => 
    (props: Omit<P, keyof withMouseHoverProps>) => {
    const { isHovering, setIsHovering } = useIsHoveringContext();   
    // const setIsHovering = (index:any) => {};
    console.log(`withMouseHover - index=${index} props=${JSON.stringify(props)} context=${isHovering}, ${setIsHovering} `)
    return (
        setIsHovering !== undefined ?
            <WrappedComponent 
                onMouseEnter = {listenOnly==='leave'? undefined : ()=>{console.log("onMousrEnter"); setIsHovering(index)}}
                onMouseLeave = {listenOnly==='enter'? undefined : ()=>{console.log("onMousrLeave"); setIsHovering(false)}}
                {...props as P}
            /> :
            <WrappedComponent {...props as P}/>
    );
}

const WithMouseHoverWrapper = ({ index, children, listenOnly }: PropsWithChildren<{index?: IsHoveringType, listenOnly?: 'leave' | 'enter'}> ) => {
    const { setIsHovering } = useIsHoveringContext();    
    console.log(`WithMouseHoverWrapper - index=${index} setIsHovering=${setIsHovering}`)
    return (
        <>
        {setIsHovering !== undefined ?            
            Children?.map(children, (child) => {
                if (isValidElement(child)) {
                    return (
                        <>
                            {cloneElement(child as JSX.Element, {
                                onMouseEnter: listenOnly ==='leave' || (index === undefined) ? undefined : () => setIsHovering(index),
                                onMouseLeave: listenOnly ==='enter'? undefined :  () => setIsHovering(false)
                            })}
                        </>
                    );
                }
            }) :
            children}
        </>
    );
}

/* HOC <withShowIfHovering/>
 * 컴포넌트 A에 마우스를 올렸을 때에만 컴포넌트 B 를 보여주고 싶은 경우, 컴포넌트 B에 적용. 
 * Component가 위치한 IsHoveringContext 의 isHovering 값이 
 * ㅉtrue 일 때만 (무엇인가에 hovering 중일 때에만) child를 보여주고, 
 * false 일 때는 보여주지 않도록 함. */
const withShowIfHovering = <T extends {}>(WrappedComponent: ComponentType<T>) =>
    (index: IsHoveringType, force?: true, defaultShow?: boolean) => 
    (props: T) => {
    const {isHovering} = useIsHoveringContext();
    console.log(`withShowIfHovering-isHovering=${isHovering}`)    
    return(
        (force ||
            (isHovering !== undefined ?
                (isHovering === index) 
                :defaultShow))
        && <WrappedComponent {...props}/>  
    );
}

const WithShowIfHoveringWrapper = ({ children, index, compareFunction = (index:IsHoveringType, contextIndex:IsHoveringType)=>(index === contextIndex), defaultShow = true }: PropsWithChildren<{ index:IsHoveringType, compareFunction?:(index: IsHoveringType, contextIndex: IsHoveringType)=>boolean, defaultShow?:boolean }>) => {
    const {isHovering} = useIsHoveringContext();
    return (
        <>
        {(isHovering !== undefined ? compareFunction(index, isHovering) : defaultShow) && children}        
        </>
    );
}

export { IsHoveringContextProvider, useIsHoveringContext, withMouseHover, withShowIfHovering,
    WithMouseHoverWrapper, WithShowIfHoveringWrapper, IsHoveringContext }

export type { IsHoveringType, IsHoveringContextProps };