import { PropsWithChildren } from "react";

interface SectionHeaderProps{
    imageSrc?: string;
};

function SectionHeader({ imageSrc, children } : PropsWithChildren<SectionHeaderProps>){

    const backgroundImageStyle = {
        backgroundImage: `url("${imageSrc}")`
    };

    return(
        <div className="bg-cover -bg-bottom-40 bg-white bg-blend-multiply py-10"
            style={backgroundImageStyle}                    
        > 
            {children}
        </div>
    );
}
export default SectionHeader;