const db = require('../config/db')
const bcrypt = require('bcrypt')


const handleLogin = async (req, res) => {
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

module.exports = handleLogin