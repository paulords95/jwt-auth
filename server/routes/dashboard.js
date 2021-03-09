const router = require('express').Router()
const pool = require('../db')

const authorization = require('../middleware/authorization')


router.get('/', authorization, async (req, res) => {
    try {
        res.json(req.user)
        
    } catch (error) {
        console.error(error.message)
        res.status(500).json('server error')
    }
})


module.exports = router