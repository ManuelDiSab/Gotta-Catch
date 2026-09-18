// src/lib/db.ts
import mongoose from 'mongoose'

const DB_HOST = process.env.DB_HOST

if (!DB_HOST) {
    throw new Error('Definisci la variabile MONGODB_URI nel file .env.local')
}

// 1. Dichiariamo il tipo per evitare l'errore 'any' su globalThis
interface MongooseCache {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
}

declare global {
    var mongoose: MongooseCache | undefined
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
    if (cached?.conn) {
        return cached.conn
    }

    if (!cached?.promise) {
        const opts = {
            bufferCommands: false,
        }
        cached!.promise = mongoose.connect(DB_HOST!, opts).then((mongoose) => {
            return mongoose
        })
    }

    try {
        cached!.conn = await cached!.promise
    } catch (e) {
        cached!.promise = null
        throw e
    }

    return cached?.conn
}

export default connectDB