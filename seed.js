require('dotenv').config()
require('./config/db.connection')

const { Pokemon, Team, Item, Nature } = require('./models')

const axios = require('axios')

const apiPath = 'https://pokeapi.co/api/v2/'
const itemEndpoint = 'item-attribute/7/'
const naturesEndpoint = 'nature/?limit=100'

// let allItems = []

// let allNatures = []
// let naturesData

async function getAllItems() {

    try {
        let response = await axios.get(apiPath + itemEndpoint)
    
        const allItems = response.data.items.map(item => {
            return {
                name: item.name
            }
        })
    
        return allItems
        
    } catch (error) {
        console.log(error)
        
    }

}

async function getNatureData() {
    try {
        let response = await axios.get(apiPath + naturesEndpoint)
      
        let allResponses = await response.data.results.map(async (nature) => {
            return await axios.get(nature.url)
        })

        const allNatures = allResponses.map(async (response) => {
            response = await response
            
            const natureObject = {
                name: response.data.name
            }
            if (response.data.increased_stat === null) {
                natureObject.statUp = 'none'
                natureObject.statDown = 'none'
            } else {
                natureObject.statUp = response.data.increased_stat.name
                natureObject.statDown = response.data.decreased_stat.name
            }
           

            return natureObject
        })
        
       return await Promise.all(allNatures)
     


    } catch (error) {
        console.log(error)
        
    }


}

async function seedDatabase() {
    try {
        await Pokemon.deleteMany({})
        await Team.deleteMany({})
        
        let items = await getAllItems()
        let natures = await getNatureData()

        await Item.create(items)
        await Nature.create(natures)
        
    } catch (error) {
        console.log(error)
        
    }
}

seedDatabase()