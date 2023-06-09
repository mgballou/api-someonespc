const { handleValidateOwnership } = require('../middleware/auth')
const { Team, Pokemon } = require('../models')
const { rawListeners } = require('../models/Pokemon')

module.exports = {
    create,
    index,
    update,
    show,
    delete: destroy,
}

async function create(req, res, next){
    try {
        req.body.user = req.user._id
        res.status(201).json(await Team.create(req.body))
        
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })  
    }
}

async function index(req, res, next){
    try {
        const allUsersTeams = await Team.find({ 'user': req.user._id }).populate('pokemon')
        res.status(200).json(allUsersTeams)
        
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
        
    }
}

async function update(req, res, next){
    try {
        const foundTeam = await Team.findById(req.params.id)
        handleValidateOwnership(req, foundTeam)

        if (foundTeam.pokemon.length > 5) {
            throw new Error("You can only take up to six Pokemon with you at one time.")
        }
        foundTeam.pokemon.push(req.body.addPokemon)
        res.status(200).json(foundTeam.save())
        
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
        
    }
}

async function show(req, res, next){
    try {
        const foundTeam = await Team.findById(req.params.id).populate('pokemon')
        handleValidateOwnership(req, foundTeam)
        const otherPokemon = await Pokemon.find({ _id: { $nin: foundTeam.pokemon }, 'user': req.user._id })
        res.status(200).json({foundTeam: foundTeam, otherPokemon: otherPokemon})
    
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
        
    }
}

async function destroy(req, res, next){
    try {
        const foundTeam = await Team.findById(req.params.id)
        handleValidateOwnership(req, foundTeam)
        res.status(200).json(await Team.deleteOne(req.params.id))

        
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
        
        
    }
}