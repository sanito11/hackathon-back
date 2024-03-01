import router from '../routes/authRoute'

const db = require('../config/db')
const bcrypt = require('bcrypt')

export const register = async (req, res) => {

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


export const handleLogin = async (req, res) => {
    try {
        const { email, password, role: accountRole } = req.body

        if (!email || !password || !accountRole) {
            return res.status(400).json({
                message: 'Username or password is empty!',
                status: 400
            })
        }

        let accounts = accountRole.toLowerCase() == 'user' ? await db.query('SELECT user_id, email, password FROM users')
            : accountRole.toLowerCase() == 'employeer' ? await db.query('SELECT company_id, email, password FROM company') :
                null



        if (accounts?.rowCount === 0 || !accounts) {
            return res.status(204)
                .json({
                    message: 'Database has no content',
                    status: 204
                })
        }
        console.log(accounts.rows)
        const foundUser = accounts.rows?.find(account => account?.email === email)

        if (!foundUser) {
            return res.status(401)
                .json({
                    message: 'Unauthorized',
                    status: 401
                })
        }

        const hashedPassword = foundUser?.password
        const isMatch = await bcrypt.compare(password, hashedPassword)

        if (isMatch) {
            const id = foundUser.hasOwnProperty('user_id') ? foundUser?.user_id : foundUser?.company_id

            res.status(200)
                .json({
                    id: id,
                    role: accountRole
                })


        } else {
            res.status(401)
                .json({
                    message: 'Unauthorized',
                    status: 401
                })
        }

    } catch (error) {
        console.log(error)
        res.status(500)
            .json({
                message: error.message,
                status: 500
            })
    }


}

module.exports = router