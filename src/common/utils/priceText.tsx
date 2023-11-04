
const priceText = (value: number) => {
    return `${value < 10000 ? value.toString() : `${value/10000}만`}원`
}

export { priceText };