import { fastify } from "fastify"
import { sql } from "./db.js"
import { DatabasePostgres } from "./database-postgres.js"

const server = fastify()

const database = new DatabasePostgres()

server.post("/videos", async (req,rep) => {
    const { title, description, duration} = req.body

    await database.create({
        title,
        description,
        duration,
    })
    
    return rep.status(201).send()

})

server.get("/videos", async (req) => {
    const search = req.query.search

    const videos = await database.list(search)
    
    return videos
})

server.put("/videos/:id", async (req, rep) => {
    const videoId = req.params.id
    const { title, description, duration} = req.body
    
    await database.update(videoId, {
        title,
        description,
        duration
    })
    return rep.status(204).send()
})

server.delete("/videos/:id", async (req, rep) => {
    const videoId = req.params.id
    await database.delete(videoId)
    
    return rep.status(204).send()
})

server.listen({
    host: "0.0.0.0",
    port: procces.env.PORT ?? 3333
})
