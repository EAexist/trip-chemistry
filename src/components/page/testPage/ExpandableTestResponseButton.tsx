import { PropsWithChildren, useState } from "react";
import { IsHoveringContextProvider, IsHoveringType, WithHoverWrapper, withShowIfHovering } from "../../../common/isHovering/IsHoveringContext";
import { MenuContainer } from "../../Menu";
import ToggleButton from "../../ToggleButton";
import { WithTestResponseProps } from "../../../common/hocs/withTestResponse";
import { usePageString } from "../../../texts";

interface TestResponseMenuProps extends WithTestResponseProps{
    isActive: boolean;
    onClick: ()=>void;
};

function ExpandableTestResponseButton({testName, testResponse, setTestResponse, isActive, onClick, children}: PropsWithChildren<TestResponseMenuProps>){

    const [isHovering, setIsHovering] = useState<IsHoveringType>(false);
    const answers = usePageString('test')[testName].answers;
    // const emojis = useString('emojis');
    // console.log(JSON.stringify(strings));

    return(
        <ToggleButton isActive={isActive} onClick={onClick} variant="round" className="flex flex-col items-center">
            <h5>{children}</h5> {/* 버튼 라벨 */}
            <IsHoveringContextProvider value={{isHovering: isHovering, setIsHovering: setIsHovering}}> {/* 선택 버튼 컨테이너 (5개) */}
                <MenuContainer direction='horizontal'>
                    {answers.map(({ label, quote, value, emoji }: { label: string, quote: string, value: number, emoji: string }, index: number) => {

                        const isUsedAsResponse = testResponse as number === value

                        if (isActive || isUsedAsResponse){

                            const OptionDetail = withShowIfHovering(()=>( /* 마우스를 올렸을 때 보이는 Element */
                                <div className="flex flex-row">
                                    <p>{emoji}</p>
                                    <p className=''>{quote}</p>
                                </div>
                            ))({id: index, force: isUsedAsResponse || undefined})

                            return(
                                <WithHoverWrapper id={index} listenOnly='enter'>
                                    <p>
                                        <ToggleButton isActive={isActive && isUsedAsResponse} onClick={() => setTestResponse(value)} className='min-w-24'>   
                                            <div className="flex flex-row space-x-4 px-1 min-w-6">
                                                {label}          
                                                <OptionDetail/>     
                                            </div>   
                                        </ToggleButton>
                                    </p>             
                                </WithHoverWrapper>
                            );
                        }
                        else return(<></>);
                    })}
                </MenuContainer>
            </IsHoveringContextProvider>
        </ToggleButton>  
    )
}

export default ExpandableTestResponseButton;
