import { Icon } from "@mui/material";
import { FocusSummary } from "../common/focus/FocusContext";
import Card, { CardDetail, CardImage } from "./Card";
import FocusContainer from "./FocusContainer";
import Logo from "./Logo";
import { ArrowRight } from "@mui/icons-material";
import getImgSrc, { FORMATWEBP } from "../common/utils/getImgSrc";
import { usePageString, useString } from "../texts";


interface cityCardProps{
    city: string
};

function CityCard({ city } : cityCardProps){

    const commonStrings = useString('common');
    const linkText = usePageString('test').city.linkText;
    const cityStrings = commonStrings.city[city];
    const nation = commonStrings.nation[cityStrings.nation];
    
    const imagePathBase = '/city';

    return(
        <FocusContainer classNameWithSize='w-64 h-40' animationClassName='hover:animate-focusCard'>
        <Card className='w-full h-fit flex flex-col'>
            <CardImage
                image={getImgSrc(imagePathBase, `${String(city)}`, FORMATWEBP)}
                alt={cityStrings.name}
                size="lg"
            >
                <div className='flex flex-row absolute bottom-0 p-2 w-full justify-between'>
                    <div className='flex flex-row space-x-2 items-center'> {/* 상품 정보: 상품 이름, 위치한 도시, 국가, 국기 */}
                        <h5 className='font-bold text-white'>{cityStrings.name}</h5>
                        <h6 className=' text-white'> | </h6>
                        <h6 className='text-white'>{nation.name}</h6>
                        {nation.flag && <span className={`fi fi-${cityStrings.nation}`}></span>} {/* 국기 */}
                    </div>    
                    <FocusSummary><Icon className='text-white'>play_circle</Icon></FocusSummary>                                        
                </div>
            </CardImage>
            <CardDetail>
                <div className='flex flex-col px-4 space-y-2 py-4'>
                    <a href={cityStrings.link} target="_blank" rel="noopener noreferrer"> {/* 디테일 보기 (e.g. 음식 -> 타베로그, 식당 자체 웹사이트 / 숙소 -> Hotels.com, 숙소 자체 웹사이트) @TODO: 카드 자체 클릭으로 변경 가능*/}
                        <div className='flex flex-row items-center space-x-1'>
                            <Logo id={cityStrings.linkType} className='h-5' />
                            <h6>{commonStrings.linkType[cityStrings.linkType].name}{linkText}</h6>
                            <ArrowRight fontSize='inherit' />
                        </div>
                    </a>
                </div>
            </CardDetail>
            </Card>
        </FocusContainer>
    );
}
export default CityCard;