import { useCallback, useState } from "react";

type useValueToBoundProps = number[]

function useValueToBound(props: useValueToBoundProps) {

    const leveledStructure = props;
    const [index, setIndex] = useState<number | undefined>();

    const newIndex = useCallback((value:number)=>{
        var offset = 0;

        if(index === undefined){
            setIndex(0);
        }

        if(index !== undefined){
            if(value < leveledStructure[index]){
                while(((index+offset) >= 0 
                    && value < leveledStructure[index+offset])
                ){
                    offset--;
                }
            }
            else{
                while((index+offset+1 < leveledStructure.length) 
                    && (value >= leveledStructure[index+offset+1])
                ){
                    offset++;
                }
            } 
            if( offset !== 0 ){
                setIndex((prev) => ((prev === undefined)? undefined : prev+offset));
            }
        }
    }, [leveledStructure, index])

    return([
        index === undefined? undefined : leveledStructure[index],
        useCallback((value:number)=>{
            newIndex(value); 
        }, [newIndex])
    ] as const)
};

export default useValueToBound;