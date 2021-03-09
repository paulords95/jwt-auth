const router = require('express').Router()
const { genSalt } = require('bcrypt')
const bcrypt = require('bcrypt')
const pool = require('../db')

router.post('/register', async (req, res) => {
    try {

        const { name, email, password } = req.body
        

        const user = await pool.query('SELECT * from "jwt-auth".users WHERE user_email = $1', [email])

        if (user.rows.length !== 0) {
            return res.status(401).send('users already exists')
        }


        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound)


        const bcryptPassword = bcrypt.hash(password, salt)

        const newUser = await pool.query('INSERT INTO "jwt-auth".users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *', [name, email, bcryptPassword])

        res.json(newUser.rows[0])
    } catch (error) {
        console.log(error.message)
        res.status(500).send('server error')
    }
})



module.exports = router