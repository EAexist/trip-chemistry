import { useCallback, useState } from "react";

type useLeveledStructureProps = LeveledStructure[]

interface LeveledStructure{
    level: number, 
    item: string
}

function useLeveledStructure(props:useLeveledStructureProps) {

    const leveledStructure = props;
    const [index, setIndex] = useState(0);

    const newIndex = useCallback((value:number)=>{
        var offset = 0;
        if(value < leveledStructure[index].level){
            while(((index+offset) >= 0 
                && value < leveledStructure[index+offset].level)
            ){
                offset--;
            }
        }
        else{
            while((index+offset+1 < leveledStructure.length) 
                && (value >= leveledStructure[index+offset+1].level)
            ){
                offset++;
            }
        } 
        console.log(index, offset);
        if( offset !== 0 ){
            setIndex((prev)=>(prev+offset));
        }
    }, [leveledStructure, index])

    return([
        leveledStructure[index].item,
        useCallback((value:number)=>{
            newIndex(value); 
        }, [newIndex])
    ] as const)
};

export default useLeveledStructure;