const router = require('express').Router()
const { genSalt } = require('bcrypt')
const bcrypt = require('bcrypt')
const pool = require('../db')

const jwtGenerator = require('../utils/jwtGenerator')

router.post('/register', async (req, res) => {
    try {

        const { name, email, password } = req.body
        

        const user = await pool.query('SELECT * from "jwt-auth".users WHERE user_email = $1', [email])

        if (user.rows.length !== 0) {
            return res.status(401).send('users already exists')
        }


        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound)


        const bcryptPassword = await bcrypt.hash(password, salt)

        const newUser = await pool.query('INSERT INTO "jwt-auth".users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *', [name, email, bcryptPassword])

        const token = jwtGenerator(newUser.rows[0].user_id)
        res.json({token})
    } catch (error) {
        console.log(error.message)
        res.status(500).send('server error')
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await pool.query('SELECT * FROM "jwt-auth".users WHERE user_email = $1', [email])

        if (user.rows.length === 0) {
            return  res.status(401).json('password or email is incorrect')
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password)

        if (!validPassword) {
            return res.status(401).json('password or email is incorrect')
        }


        const token = jwtGenerator(user.rows[0].user_id)

        res.json({token})
    } catch (error) {
        console.log(error.message)
    }
})



module.exports = router