interface ConditionalWrapperProps{
    isWrapped : boolean;
    wrapper: (children: React.ReactNode) => JSX.Element;
}

/* Conditonally Wrap an Element
 * https://blog.hackages.io/conditionally-wrap-an-element-in-react-a8b9a47fab2 */
export default function ConditionalWrapper ({isWrapped, wrapper, children}: React.PropsWithChildren<ConditionalWrapperProps>){
    return isWrapped ? wrapper(children) : <>{children}</>;
} 
