const getImgSrc = (path: string, filename: string, format: string) => {
    const basePath = '/static/images';
    return(
        `${basePath}/${path}/${filename}.${format}`
        // ''
    )
}


const basePath = '/static/images';
const FORMATWEBP = 'webp';
const FORMATSVG ='svg'
const FORMATPNG ='png'

export default getImgSrc;
export { basePath, FORMATSVG, FORMATWEBP, FORMATPNG };