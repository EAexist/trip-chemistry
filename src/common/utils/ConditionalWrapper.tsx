import { ReactNode, PropsWithChildren, ComponentType } from 'react'; 

interface ConditionalWrapperProps{
    isWrapped : boolean;
    wrapper: (children: React.ReactElement) => ReactNode;
    children: React.ReactElement;
}

/* Conditonally Wrap an Element
 * https://blog.hackages.io/conditionally-wrap-an-element-in-react-a8b9a47fab2 */
export default function ConditionalWrapper ({isWrapped, wrapper, children}: ConditionalWrapperProps){
    return isWrapped ? wrapper(children) : children;
} 

interface withConditionalWrapProps{
    isWrapped : boolean;
}

const withConditionalWrap = <T extends {}>(WrappedComponent: ComponentType<T>) => 
    ({isWrapped}: withConditionalWrapProps) =>
    (props: T) => {

    return (
        
            <WrappedComponent {...props as T}/>
    );
}
