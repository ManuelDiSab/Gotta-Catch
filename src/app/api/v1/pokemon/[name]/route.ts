import { NextResponse } from "next/server";
import { getPokemonDetail } from "@/services/pokemonService";

export async function GET(request: Request, { params }: { params: Promise<{ name: string }> }) {
    try {
        const { name } = await params;
        const result = await getPokemonDetail(name)

        return NextResponse.json({
            status: "success",
            data: result
        }, { status: 200 })
    } catch (err: unknown) {
        return NextResponse.json({
            status: "error",
            message: "Errore interno del server"
        }, { status: 500 })
    }
}