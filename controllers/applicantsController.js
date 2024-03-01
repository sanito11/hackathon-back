const db = require('../config/db')

exports.getApplicants = async (req, res) => {
    try {
        const results = await db.query('SELECT * from applicants')

        if (results.rowCount === 0) return res.sendStatus(404)

        res.status(200)
            .json(results.rows)

    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

exports.getApplicant = async (req, res) => {
    try {
        const { id } = req.params

        if (isNaN(Number(id))) return res.sendStatus(400)

        const results = await db.query(`SELECT * FROM applicants WHERE applicant_id = $1`, [id])

        if (results.rowCount === 0) return res.sendStatus(404)

        res.status(200)
            .json(results.rows[0])

    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

exports.addApplicant = async (req, res) => {
    try {
        const { person_id, application_id } = req.body

        const result = await db.query(
            `INSERT INTO applicants (person_id, application_id) VALUES ($1, $2) RETURNING *`,
            [person_id, application_id]
        )

        console.log(result.rows[0])

        res.status(201).json({
            message: 'Created',
        })

    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

exports.editApplicant = async (req, res) => {
    try {
        const { id } = req.params
        const { person_id, application_id } = req.body

        console.log(id, person_id, application_id)
        if (isNaN(Number(id))) return res.sendStatus(400)

        const results = await db.query(
            `UPDATE applicants SET person_id = $1, application_id = $2 WHERE applicant_id = $3 RETURNING *
        `, [person_id, application_id, id])

        if (results.rowCount === 0) return res.sendStatus(404)

        console.log(results.rows[0])

        res.status(200).json({ message: 'Okay' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

exports.deleteApplicant = async (req, res) => {
    try {
        const { id } = req.params

        if (isNaN(Number(id))) return res.sendStatus(400)

        const results = await db.query('DELETE FROM applicants WHERE applicant_id = $1', [id])

        if (results.rowCount === 0) return res.sendStatus(404)

        console.log(results.rows[0])

        res.status(200).json({ message: 'Deleted' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}