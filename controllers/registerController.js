const db = require('../config/db')
const bcrypt = require('bcrypt')

const register = async (req, res) => {

    const {
        role: accountRole,
    } = req.body


    if (!req.body.email || !req.body.password) res.status(400).json({ status: 400 })


    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = accountRole.toLowerCase() == 'user' ? await db.query(
            `INSERT INTO users (firstname, middlename, lastname, dob, gender, email, password)
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [
                req.body.firstName,
                req.body.middleName,
                req.body.lastName,
                req.body.dob,
                req.body.gender,
                req.body.email,
                hashedPassword
            ])
            : await db.query(
                `INSERT INTO company (company_name, company_address, email, password)
                VALUES ($1, $2, $3, $4)
                `,
                [
                    req.body.company_name,
                    req.body.company_address,
                    req.body.email,
                    req.body.password
                ]
            )

        res.status(201)
            .json({
                status: 201
            })

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 500, message: error.message })
    }

}