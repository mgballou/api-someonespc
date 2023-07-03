const express = require('express')
const router = express.Router()
const pokemonCtrl = require('../controllers/pokemon-controller')
const {requireToken} = require('../middleware/auth')


router.get('/', requireToken, pokemonCtrl.index)

router.post('/', requireToken, pokemonCtrl.create)

router.put('/:id', requireToken, pokemonCtrl.update)

router.get('/:id', requireToken, pokemonCtrl.show)

router.delete('/:id', requireToken, pokemonCtrl.deleteOne)

module.exports = router