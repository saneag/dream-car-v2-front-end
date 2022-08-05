const find_age = (birthday) => {
    let today = new Date()
    let birth = new Date(birthday)
    let age = today.getFullYear() - birth.getFullYear()
    let m = today.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--
    }
    return age
}

export default find_age