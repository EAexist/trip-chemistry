import { Icon } from "@mui/material";
import getImgSrc, { FORMATPNG, FORMATWEBP } from "../common/utils/getImgSrc";


const LOGOS : {
    [key: string]: {
        name: string;
        type: "png" | "webp" | "mui-icon";
        iconName?: string;
    }
} = {
    "travel-japan": {
        name: "Travel Japan",
        type: "png",
    },
    "tabelog": {
        name: "타베로그",
        type: "png",
    },
    "tripadvisor": {
        name: "Tripadvisor",
        type: "png",
    },
    "website": {
        name: "웹사이트",
        type: "mui-icon",
        iconName: "travel_explore"
    },
    "discovering-hongkong": {
        name: "홍콩관광청",
        type: "webp",
    },
};

interface LogoProps{
    id: keyof typeof LOGOS;
    className?: string;
};

function Logo({ id, className='h-3' }: LogoProps) {

    const logo = LOGOS[id];

    return(
            logo.type === "mui-icon" ? 
            logo.iconName && <Icon className={className}>{logo.iconName}</Icon>
            : (
                logo.type === "png" ?
                <img className={className} src={getImgSrc('/logos', `logo-${id}`, FORMATPNG)} alt={logo.name}></img>
                : 
                logo.type === "webp" ?
                <img className={className} src={getImgSrc('/logos', `logo-${id}`, FORMATWEBP)} alt={logo.name}></img>
                : <></>
            ) 
    )
}

export default Logo