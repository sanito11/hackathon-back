const db = require('../config/db')

exports.getApplications = async (req, res) => {
    try {
        const results = await db.query('SELECT * from applications')

        if (results.rowCount === 0) return res.sendStatus(404)

        res.status(200)
            .json(results.rows)

    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

exports.getApplication = async (req, res) => {
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

exports.addApplication = async (req, res) => {
    try {
        const { applicant_id, job_id } = req.body

        const result = await db.query(
            `INSERT INTO applications (applicant_id, job_id) VALUES ($1, $2) RETURNING *`,
            [applicant_id, job_id]
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


exports.editApplication = async (req, res) => {
    try {
        const { id } = req.params
        const { applicant_id, job_id } = req.body

        if (isNaN(Number(id))) return res.sendStatus(400)

        const results = await db.query(
            `UPDATE applicants SET
            applicant_id = $1,
            job_id = $2
            WHERE applicants_id = $3
        `, [applicant_id, job_id, id])

        res.status(200).json({ message: 'Okay' })

    } catch (error) {
        console.log(error)
        res.status(500)
    }
}