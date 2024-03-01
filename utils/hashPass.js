const bcrypt = require('bcrypt')

export const hashPassword = async(password) => {
    const hashed = await bcrypt.hash(password, 10)
    return hashed
}

export const decryptPass = async(password, hashedPass) => {
    const result = await bcrypt.compare(password, hashedPass)
    return result
}