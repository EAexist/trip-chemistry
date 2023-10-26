import { useCallback, useState } from "react";

type useValueToBoundProps = {
    boundList: number[],
    returnIndex?: boolean;
}

function useValueToBound({ boundList, returnIndex = false }: useValueToBoundProps) {

    const [index, setIndex] = useState<number | undefined>();

    const setIndexByValue = useCallback((value:number)=>{
        var offset = 0;

        if(index === undefined){
            setIndex(0);
        }

        if(index !== undefined){
            if(value < boundList[index]){
                while(((index+offset) >= 0 
                    && value < boundList[index+offset])
                ){
                    offset--;
                }
            }
            else{
                while((index+offset+1 < boundList.length) 
                    && (value >= boundList[index+offset+1])
                ){
                    offset++;
                }
            } 
            if( offset !== 0 ){
                setIndex((prev) => ((prev === undefined)? undefined : prev+offset));
            }
        }
        console.log(`value=${value}, index=${index}`);
    }, [boundList, index])

    return([
        index === undefined? undefined : returnIndex? index : boundList[index],
        setIndexByValue
    ] as const)
};

export default useValueToBound;