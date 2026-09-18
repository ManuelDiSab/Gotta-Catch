import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import '@/models/pokemon.model'; //In questo modo obbligo vercel a usare il modello
import Pokemon from '@/models/pokemon.model';

export async function GET() {
    try {
        await connectDB();

        const randomId = Math.floor(Math.random() * 1351) + 1;
        const res = await Pokemon.findOne({ id: randomId });

        return NextResponse.json({
            status: "success",
            data: res
        }, { status: 200 });

    } catch (err: unknown) {
        if (err instanceof Error)
            return NextResponse.json({ status: "error", message: err.message }, { status: 500 });

        return NextResponse.json({ status: "error", message: "Errore sconosciuto" }, { status: 500 });
    }
}