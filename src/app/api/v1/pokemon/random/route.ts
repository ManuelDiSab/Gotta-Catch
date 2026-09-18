import { NextResponse } from 'next/server'
import mongoose from 'mongoose';
import connectDB from '@/lib/db';
export async function GET() {
    try {

        await connectDB()
        // Recupero il modello direttamente da mongoose per sicurezza nelle funzioni serverless 
        const Pokemon = mongoose.models.Pokemon || mongoose.model('Pokemon');

        // Non lo mett nel service per la sua semplicità
        const randomId = Math.floor(Math.random() * 1351) + 1;
        const res = await Pokemon.findOne({ id: randomId })

        return NextResponse.json({
            status: "success",
            data: res
        }, { status: 200 })
    } catch (err: unknown) {
        if (err instanceof Error)
            return NextResponse.json({ status: "error", message: err.message }, { status: 500 })
    }
}