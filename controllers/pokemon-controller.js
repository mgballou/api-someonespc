const axios = require('axios')
const { Pokemon } = require('../models')
const { handleValidateOwnership } = require('../middleware/auth')

module.exports = {
    create,
    index,
    update,
    show
}

async function create(req, res, next) {
    try {
        let endpoint
        let randomInt = Math.floor(Math.random() * 10)
        if (req.body.name > 1008) {
            throw new Error("No Pokedex Entry found")
        }

        if (typeof (req.body) !== Number) {
            endpoint = req.body.name.toLowerCase()

        } else {
            endpoint = req.body.name
        }

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${endpoint}`)

        const newPokemon = {
            name: response.data.name.toUpperCase(),
            dexNumber: response.data.id,
            user: req.user._id,
            sprite: response.data.sprites.front_default,
            type1: response.data.types[0].type.name,
            stats: response.data.stats.map(statRecord => {
                statName = statRecord.stat.name
                baseStat = statRecord.base_stat
                return {
                    statName: statName,
                    values: {
                        base: baseStat,
                        effort: 0,
                        individual: 0
                    }
                }
            }),
            abilities: {
                current: response.data.abilities[0].ability.name,
                all: response.data.abilities.map(abilityRecord => {
                    return abilityRecord.ability.name
                })
            }
        }
        if (response.data.types.length > 1) {
            newPokemon.type2 = response.data.types[1].type.name
        } else {
            newPokemon.type2 = ''
        }
        if (randomInt === 1 && newPokemon.dexNumber <= 905) {
            newPokemon.sprite = response.data.sprites.front_shiny
        }
        res.status(201).json(await Pokemon.create(newPokemon))
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }


}

async function update(req, res, next) {
    try {
        const foundPokemon = await Pokemon.findById(req.params.id)
        handleValidateOwnership(req, foundPokemon)
        foundPokemon.nickname = req.body.nickname
        foundPokemon.abilities.current = req.body.ability
        foundPokemon.heldItem = req.body.heldItem
        res.status(200).json(await foundPokemon.save())
    } catch (error) {
        res.status(400).json({ error: error.message })

    }

}

async function index(req, res, next) {
    try {
        const allUsersPokemon = await Pokemon.find({ 'user': req.user._id })
        res.status(200).json(allUsersPokemon)

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })

    }
}

async function show(req, res, next) {
    try {
        const foundPokemon = await Pokemon.findById(req.params.id)
        handleValidateOwnership(req, foundPokemon)
        res.status(200).json(foundPokemon)
    } catch (error) {
        res.status(400).json({ error: error.message })

    }
}