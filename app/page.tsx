"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortCode, setShortCode] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const response = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ longUrl: url }),
    });

    const data = await response.json();
    setShortCode(data.code);
  }

  return (
    <div>
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="Enter a URL"
        />
        <button type="submit">Shorten</button>
      </form>

        {shortCode && (
    <p>
      Short link:{" "}
      <a href={`https://url-shortener-webapp.vercel.app/${shortCode}`} target="_blank">
        {`https://url-shortener-webapp.vercel.app/${shortCode}`}
      </a>
    </p>
  )}
    </div>
  );
}