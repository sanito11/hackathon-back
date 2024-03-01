const db = require('../config/db')
const bcrypt = require('bcrypt')

const register = async (req, res) => {

    const {
        firstName,
        middleName,
        lastName,
        dob,
        gender,
        email,
        password,
        role: accountRole,
    } = req.body



    if (!email || !password) res.status(400).json({ status: 400 })

    const hasDuplicate = await db.query(
        'SELECT email FROM users WHERE email = $1',
        [email]
    )

    if (hasDuplicate.rowCount) return res.status(409).json({ status: 409 })


    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query(
            `INSERT INTO users (firstname, middlename, lastname, dob, gender, email, password)
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [
                firstName,
                middleName,
                lastName,
                dob,
                gender,
                email,
                hashedPassword
            ])

        res.status(201)
            .json({
                status: 201
            })

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 500 })
    }

}