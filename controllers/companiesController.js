const db = require('../config/db')

exports.getCompanies = async (req, res) => {
    try {
        const results = await db.query('SELECT * from company')

        if (results.rowCount === 0) return res.sendStatus(404)

        res.status(200)
            .json(results.rows)

    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

exports.getCompany = async (req, res) => {
    try {
        const { id } = req.params

        if (isNaN(Number(id))) return res.sendStatus(400)

        const results = await db.query(`SELECT * FROM company WHERE company_id = $1`, [id])

        if (results.rowCount === 0) return res.sendStatus(404)

        res.status(200)
            .json(results.rows[0])

    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

exports.addCompany = async (req, res) => {
    try {
        const { company_name, company_address, email, password } = req.body

        const result = await db.query(
            `INSERT INTO company (company_name, company_address, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
            [company_name, company_address, email, password]
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

exports.editCompany = async (req, res) => {
    try {
        const { id } = req.params
        const { company_name, company_address, email, password } = req.body

        console.log(id, company_name, company_address)
        if (isNaN(Number(id))) return res.sendStatus(400)

        const results = await db.query(
            `UPDATE company SET company_name = $1, company_address = $2, email = $3, password = $4 WHERE company_id = $5 RETURNING *
        `, [company_name, company_address, email, password, id])

        if (results.rowCount === 0) return res.sendStatus(404)

        console.log(results.rows[0])

        res.status(200).json({ message: 'Okay' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

exports.deleteCompany = async (req, res) => {
    try {
        const { id } = req.params

        if (isNaN(Number(id))) return res.sendStatus(400)

        const results = await db.query('DELETE FROM company WHERE company_id = $1', [id])

        if (results.rowCount === 0) return res.sendStatus(404)

        console.log(results.rows[0])

        res.status(200).json({ message: 'Deleted' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}