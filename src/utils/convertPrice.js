function convertPrice(price) {
    let convertedPrice = String(price).length > 3 ? String(price).slice(0, -3) + '.' + String(price).slice(-3) : price
    convertedPrice = convertedPrice.length > 7 ? convertedPrice.slice(0, -7) + '.' + convertedPrice.slice(-7) : convertedPrice
    return convertedPrice
}

export default convertPrice