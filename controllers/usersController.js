const db = require('../config/db')

exports.getUsers = async (req, res) => {
    try {
        const results = await db.query('SELECT * from users')

        if (results.rowCount === 0) return res.sendStatus(404)

        res.status(200)
            .json(results.rows)

    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params

        if (isNaN(Number(id))) return res.sendStatus(400)

        const results = await db.query(`SELECT * FROM users WHERE user_id = $1`, [id])

        if (results.rowCount === 0) return res.sendStatus(404)

        res.status(200)
            .json(results.rows[0])

    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

exports.addUser = async (req, res) => {
    try {
        const { firstName, middleName, lastName, dob, gender, email, password } = req.body
        console.log(req.body)
        const result = await db.query(
            `INSERT INTO users (firstname, middlename, lastname, dob, gender, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [firstName, middleName, lastName, dob, gender, email, password]
        )

        console.log(result.rows[0])

        res.status(201).json({
            message: 'Created',
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

exports.editUser = async (req, res) => {
    try {
        const { id } = req.params
        const { firstName, middleName, lastName, dob, gender, email, password } = req.body


        if (isNaN(Number(id))) return res.sendStatus(400)

        const results = await db.query(
            `UPDATE users SET firstname = $1, middlename = $2, lastname = $3, dob = $4, gender = $5, email = $6, password = $7 WHERE user_id = $8 RETURNING *
        `, [firstName, middleName, lastName, dob, gender, email, password, id])

        if (results.rowCount === 0) return res.sendStatus(404)

        console.log(results.rows[0])

        res.status(200).json({ message: 'Okay' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        if (isNaN(Number(id))) return res.sendStatus(400)

        const results = await db.query('DELETE FROM users WHERE user_id = $1', [id])

        if (results.rowCount === 0) return res.sendStatus(404)

        console.log(results.rows[0])

        res.status(200).json({ message: 'Deleted' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}