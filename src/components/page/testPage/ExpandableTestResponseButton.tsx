import { PropsWithChildren, useState } from "react";
import { FocusContextProvider, FocusType, Focusable, withShowOnHover } from "../../../common/focus/FocusContext";
import { MenuContainer } from "../../Menu";
import ToggleButton from "../../ToggleButton";
import { WithTestResponseProps } from "../../../common/hocs/withTestResponse";
import { usePageString } from "../../../texts";

interface TestResponseMenuProps extends WithTestResponseProps{
    isActive: boolean;
    onClick: ()=>void;
};

function ExpandableTestResponseButton({testName, testResponse, setTestResponse, isActive, onClick, children}: PropsWithChildren<TestResponseMenuProps>){

    const [focus, setFocus] = useState<FocusType>(false);
    const answers = usePageString('test')[testName].answers;
    // const emojis = useString('emojis');
    // console.log(JSON.stringify(strings));

    return(
        <ToggleButton isActive={isActive} onClick={onClick} variant="round" className="flex flex-col items-center">
            <h5>{children}</h5> {/* 버튼 라벨 */}
            <FocusContextProvider value={{focus: focus, setFocus: setFocus}}> {/* 선택 버튼 컨테이너 (5개) */}
                <MenuContainer direction='horizontal'>
                    {answers.map(({ label, quote, value, emoji }: { label: string, quote: string, value: number, emoji: string }, index: number) => {

                        const isUsedAsResponse = testResponse as number === value

                        if (isActive || isUsedAsResponse){

                            const OptionDetail = withShowOnHover(()=>( /* 마우스를 올렸을 때 보이는 Element */
                                <div className="flex flex-row">
                                    <p>{emoji}</p>
                                    <p className=''>{quote}</p>
                                </div>
                            ))({id: index, force: isUsedAsResponse || undefined})

                            return(
                                <Focusable id={index} listenOnly='enter'>
                                    <p>
                                        <ToggleButton isActive={isActive && isUsedAsResponse} onClick={() => setTestResponse(value)} className='min-w-24'>   
                                            <div className="flex flex-row space-x-4 px-1 min-w-6">
                                                {label}          
                                                {
                                                    // withShowOnHover(()=>( /* 마우스를 올렸을 때 보이는 Element */
                                                    //     <div className="flex flex-row">
                                                    //         <p>{emoji}</p>
                                                    //         <p className=''>{quote}</p>
                                                    //     </div>
                                                    // ))({id: index, force: isUsedAsResponse || undefined})({})
                                                }
                                                <OptionDetail/>     
                                            </div>   
                                        </ToggleButton>
                                    </p>             
                                </Focusable>
                            );
                        }
                        else return(<></>);
                    })}
                </MenuContainer>
            </FocusContextProvider>
        </ToggleButton>  
    )
}

export default ExpandableTestResponseButton;
