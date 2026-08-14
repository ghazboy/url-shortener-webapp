import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";

interface UrlEntry {
    code: string;
    longUrl: string;
}

const FILE = "urls.json";

function loadUrls(): UrlEntry[] {
    if (!fs.existsSync(FILE)) return [];
    const data = fs.readFileSync(FILE, "utf-8");
    return JSON.parse(data);
}

function saveUrls(urls: UrlEntry[]): void {
    fs.writeFileSync(FILE, JSON.stringify(urls, null, 2));
}

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

    const urls = loadUrls();
    const code = generateCode();
    urls.push({ code, longUrl });
    saveUrls(urls);

    return NextResponse.json({ code });
}