const db = require('../config/db')

exports.getJobs = async (req, res) => {
    try {
        const results = await db.query('SELECT * from jobs')

        if (results.rowCount === 0) return res.sendStatus(404)

        res.status(200)
            .json(results.rows)

    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

exports.getJob = async (req, res) => {
    try {
        const { id } = req.params

        if (isNaN(Number(id))) return res.sendStatus(400)

        const results = await db.query(`SELECT * FROM jobs WHERE job_id = $1`, [id])

        if (results.rowCount === 0) return res.sendStatus(404)

        res.status(200)
            .json(results.rows[0])

    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

exports.addJob = async (req, res) => {
    try {
        const { job_name, company_id, worker_id, applicant_id } = req.body

        const result = await db.query(
            `INSERT INTO jobs (job_name, company_id, worker_id, applicant_id) VALUES ($1, $2, $3, $4) RETURNING *`,
            [job_name, company_id, worker_id, applicant_id]
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

exports.editJob = async (req, res) => {
    try {
        const { id } = req.params
        const { job_name, company_id, worker_id, applicant_id } = req.body

        console.log(id, job_name, company_id)
        if (isNaN(Number(id))) return res.sendStatus(400)

        const results = await db.query(
            `UPDATE jobs SET job_name = $1, company_id = $2, worker_id = $3, applicant_id = $4 WHERE job_id = $5 RETURNING *
        `, [job_name, company_id, worker_id, applicant_id, id])

        if (results.rowCount === 0) return res.sendStatus(404)

        console.log(results.rows[0])

        res.status(200).json({ message: 'Okay' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

exports.deleteJob = async (req, res) => {
    try {
        const { id } = req.params

        if (isNaN(Number(id))) return res.sendStatus(400)

        const results = await db.query('DELETE FROM jobs WHERE job_id = $1', [id])

        if (results.rowCount === 0) return res.sendStatus(404)

        console.log(results.rows[0])

        res.status(200).json({ message: 'Deleted' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}