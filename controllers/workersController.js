const db = require('../config/db')

exports.getWorkers = async (req, res) => {
    try {
        const results = await db.query('SELECT * from workers')

        if (results.rowCount === 0) return res.sendStatus(404)

        res.status(200)
            .json(results.rows)

    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

exports.getWorker = async (req, res) => {
    try {
        const { id } = req.params

        if (isNaN(Number(id))) return res.sendStatus(400)

        const results = await db.query(`SELECT * FROM workers WHERE worker_id = $1`, [id])

        if (results.rowCount === 0) return res.sendStatus(404)

        res.status(200)
            .json(results.rows[0])

    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

exports.addWorker = async (req, res) => {
    try {
        const { person_id } = req.body

        const result = await db.query(
            `INSERT INTO workers (person_id) VALUES ($1) RETURNING *`,
            [person_id]
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

exports.editWorker = async (req, res) => {
    try {
        const { id } = req.params
        const { person_id } = req.body

        console.log(id, person_id)
        if (isNaN(Number(id))) return res.sendStatus(400)

        const results = await db.query(
            `UPDATE workers SET person_id = $1 WHERE worker_id = $2 RETURNING *
        `, [person_id, id])

        if (results.rowCount === 0) return res.sendStatus(404)

        console.log(results.rows[0])

        res.status(200).json({ message: 'Okay' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}


exports.deleteWorker = async (req, res) => {
    try {
        const { id } = req.params

        if (isNaN(Number(id))) return res.sendStatus(400)

        const results = await db.query('DELETE FROM workers WHERE worker_id = $1', [id])

        if (results.rowCount === 0) return res.sendStatus(404)

        console.log(results.rows[0])

        res.status(200).json({ message: 'Deleted' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}
