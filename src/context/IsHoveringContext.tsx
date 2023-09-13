import React, { PropsWithChildren, createContext, useContext, useState } from 'react';

interface IsHoveringContextProps {
    isHovering: boolean | undefined;
    setIsHovering: ((isHovering: boolean) => void) | undefined;
}

const IsHoveringContext = createContext<IsHoveringContextProps>({isHovering: undefined, setIsHovering: undefined});

/* Wrapper, Context Provider.
 * 컴포넌트 A에 마우스를 올렸을 때에만 컴포넌트 B 를 보여주고 싶은 경우, 컴포넌트 A B 를 모두 같은 IsHoveringContextProvider 로 wrap. */
function IsHoveringContextProvider(children: React.ReactNode) {
    const [isHovering, setIsHovering] = useState(false);
    return (
        <IsHoveringContext.Provider value={{
            isHovering: isHovering,
            setIsHovering: setIsHovering
        }}>
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
const withMouseHover = <T extends {}>(WrappedComponent: React.ComponentType<T>) => (props: T) => {
    const { setIsHovering } = useIsHoveringContext();    
    return (
        setIsHovering !== undefined ?
            <WrappedComponent 
                onMouseEnter = {()=>setIsHovering(true)}
                onMouseLeave = {()=>setIsHovering(false)}
                {...props as T}
            /> :
            <WrappedComponent {...props}/>
    );
}

const WithMouseHoverWrapper = ({ children }: PropsWithChildren ) => {
    const { setIsHovering } = useIsHoveringContext();    
    return (
        <>
        {setIsHovering !== undefined ?            
            React.Children?.map(children, (child, index) => {
                if (React.isValidElement(child)) {
                    return (
                        <>
                            {React.cloneElement(child as JSX.Element, {
                                onMouseEnter: () => setIsHovering(true),
                                onMouseLeave: () => setIsHovering(false)
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
const withShowIfHovering = <T extends {}>(WrappedComponent: React.ComponentType<T>, defaultShow?: boolean) => (props: T) => {
    const {isHovering} = useIsHoveringContext();
    // console.log(`withShowIfHovering-isHovering=${isHovering}`)    
    return(
        isHovering !== undefined ?
            isHovering && <WrappedComponent {...props}/> :
            defaultShow && <WrappedComponent {...props}/> 
    );
}
withShowIfHovering.defaultProps = {defaultShow: true};

const WithShowIfHoveringWrapper = ({ children, defaultShow = true }: PropsWithChildren<{defaultShow?: boolean}>) => {
    const {isHovering} = useIsHoveringContext();
    // console.log(`withShowIfHovering-isHovering=${isHovering}`)  
    return (<>
        {(isHovering !== undefined ? isHovering : defaultShow) && children}        </>
    );
}

export { IsHoveringContextProvider, useIsHoveringContext, withMouseHover, withShowIfHovering,
    WithMouseHoverWrapper, WithShowIfHoveringWrapper }