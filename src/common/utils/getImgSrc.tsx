const getImgSrc = (path: string, filename: string, format: string) => {
    const basePath = '/static/images';
    return(
        `${basePath}/${path}/${filename}.${format}`
        // ''
    )
}


const basePath = '/static/images';
const formatWebp = 'webp';
const formatSvg ='svg'
const formatPng ='png'

export default getImgSrc;
export { basePath, formatSvg, formatWebp, formatPng };