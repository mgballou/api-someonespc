const express = require('express')
const router = express.Router()
const teamsCtrl = require('../controllers/teams-controller')
const {requireToken} = require('../middleware/auth')


router.get('/', requireToken, teamsCtrl.index)

router.get('/:id', requireToken, teamsCtrl.show)

router.post('/', requireToken, teamsCtrl.create)

router.delete('/:id', requireToken, teamsCtrl.delete)

router.put('/:id', requireToken, teamsCtrl.update)

module.exports = router