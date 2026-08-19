import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

function generateCode(length: number = 6): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        code += chars[randomIndex];
    }
    return code;
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const longUrl = body.longUrl;

    const code = generateCode();

    const { error } = await supabase
        .from("urls")
        .insert({ code, long_url: longUrl });

    if (error) {
        console.error("Supabase insert error:", error);
        return NextResponse.json({ error: "Failed to save URL" }, { status: 500 });
    }

    return NextResponse.json({ code });
}