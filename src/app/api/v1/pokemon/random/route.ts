import { NextResponse } from 'next/server'
import Pokemon from '@/models/pokemon.model';
export async function GET() {
    try {
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