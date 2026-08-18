import * as fs from "fs";
import { redirect } from "next/navigation";

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

export default async function RedirectPage({ params }: { params: Promise<{ code: string }> }) {
    const { code } = await params;
    const urls = loadUrls();
    const entry = urls.find((u) => u.code === code);

  if (!entry) {
    return <p>Short URL not found.</p>;
  }

  redirect(entry.longUrl);
}