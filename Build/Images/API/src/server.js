const express = require ('express')
const http = require('http')
const { generateUUID } = require('../utils/helpers.js')

const pg = require('knex')({
    client: 'pg',
    version: '9.6',
    searchPath: ['knex', 'public'],
    connection: () => {
        if ("test" == process.env.BUILD_ENV){
            return process.env.PG_TEST_CONNECTIONSTRING ? process.env.PG_TEST_CONNECTIONSTRING :'postgres://admin:admin@store:5432/mongodb+srv://admin:admin@cluster0.0ml8z.mongodb.net/?retryWrites=true&w=majority'
        }
        return process.env.PG_TEST_CONNECTIONSTRING ? process.env.PG_TEST_CONNECTIONSTRING :'postgres://admin:admin@store:5432/mongodb+srv://admin:admin@cluster0.0ml8z.mongodb.net/?retryWrites=true&w=majority'
    }
})

const app = express()
http.Server(app)

app.get('/', async (req, res) => {
    const result = await pg
    .select(['uuid', 'title', 'created at', "summary"])
    .from('post')
    res.json({
        data: result
    })
})

app.post('/test', async (req, res) => {
    const uuid = generateUUID()
    const result = await pg.insert({...req.body, uuid}).table("posts").returning("*")
    res.json({
        res: result
    })
})

async function initialiseTables(){}
initialiseTables()

module.exports = app