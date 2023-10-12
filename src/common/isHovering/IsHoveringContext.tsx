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
    return useContext(IsHoveringContext); 
}

/* HOC <withHover/>
 * 컴포넌트 A에 마우스를 올렸을 때에만 컴포넌트 B 를 보여주고 싶은 경우, 컴포넌트 A에 적용.
 * Component에 마우스를 hovering 중인지 아닌지에 component가 위치한 IsHoveringContext isHovering 값을 대응시킴. */
interface withHoverProps{
    onMouseEnter: ()=>void
    onMouseLeave: ()=>void
};

const withHover = <P extends withHoverProps>(WrappedComponent: ComponentType<P>) => 
    ({id, isDisabled = false, listenOnly}:{id: IsHoveringType, isDisabled?: boolean, listenOnly?: 'leave' | 'enter'}) => 
    (props: Omit<P, keyof withHoverProps>) => {
    const { isHovering, setIsHovering } = useIsHoveringContext();   
    // const setIsHovering = (id:any) => {};
    console.log(`withHover: id=${id} props=${JSON.stringify(props)} context=${isHovering}, ${setIsHovering} isDisabled=${isDisabled} `)
    return (
        setIsHovering !== undefined ?
            <WrappedComponent 
                {...{
                    onMouseEnter: listenOnly==='leave'? undefined : isDisabled? undefined : ()=>{console.log("onMousrEnter"); setIsHovering(id)},
                    onMouseLeave: listenOnly==='enter'? undefined : isDisabled? undefined : ()=>{console.log("onMousrLeave"); setIsHovering(false)}
                }}
                    {...props as P}
            /> :
            <WrappedComponent {...props as P}/>
    );
}

const WithHoverWrapper = ({ id = true, isDisabled = false, listenOnly, children }: PropsWithChildren<{id?: IsHoveringType, isDisabled?: boolean, listenOnly?: 'leave' | 'enter'}> ) => {
    const { setIsHovering } = useIsHoveringContext();    
    console.log(`WithHoverWrapper - id=${id} setIsHovering=${setIsHovering}`)
    return (
        <>
        {setIsHovering !== undefined ?            
            Children?.map(children, (child) => {
                if (isValidElement(child)) {
                    return (
                        <>
                            {cloneElement(child as JSX.Element, {
                                onMouseEnter: listenOnly==='leave'? undefined : isDisabled? undefined : ()=>{console.log("onMousrEnter"); setIsHovering(id)},
                                onMouseLeave: listenOnly==='enter'? undefined : isDisabled? undefined : ()=>{console.log("onMousrLeave"); setIsHovering(false)}
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
 * true 일 때만 (무엇인가에 hovering 중일 때에만) child를 보여주고, 
 * false 일 때는 보여주지 않도록 함. */
interface withShowIfHoveringProps
{
    className? : string
};
const withShowIfHovering = <T extends withShowIfHoveringProps>(WrappedComponent: ComponentType<T>) =>
    ({id, force, defaultShow}:{id: IsHoveringType, force?: boolean, defaultShow?: boolean}) => /* id: 인덱스, force: true 일 경우 로직을 비활성화하고 컴포넌트를 항상 보여줌.(디버깅) defaultShow: true 일 경우 마우스를 올리지 않았을 때에도 컴포넌트를 보여줌. */
    (props: T) => {
    const { isHovering } = useIsHoveringContext();
    console.log(`withShowIfHovering-isHovering=${isHovering}`);    
    return(
        (
            force ||
            (isHovering !== undefined ?
                (isHovering === id) 
                :defaultShow))
        && <WrappedComponent {...props as T}/>  
    );
}

const WithShowIfHoveringWrapper = ({ children, id, compareFunction = (id:IsHoveringType, contextId:IsHoveringType)=>(id === contextId), defaultShow = true }: PropsWithChildren<{ id:IsHoveringType, compareFunction?:(id: IsHoveringType, contextId: IsHoveringType)=>boolean, defaultShow?:boolean }>) => {
    const {isHovering} = useIsHoveringContext();
    return (
        <>
        {(isHovering !== undefined ? compareFunction(id, isHovering) : defaultShow) && children}        
        </>
    );
}

export { IsHoveringContextProvider, useIsHoveringContext, withHover, withShowIfHovering,
    WithHoverWrapper, WithShowIfHoveringWrapper, IsHoveringContext }

export type { IsHoveringType, IsHoveringContextProps };