"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      setError("Please enter a valid URL starting with http:// or https://");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ longUrl: url }),
      });

      if (!response.ok) {
        throw new Error("Failed to shorten URL")
      }

      const data = await response.json();
      setShortCode(data.code);
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        Shorten Your <span className="text-red-800">Link</span>
      </h1>
      <p className="text-gray-500 mb-8">Paste a long URL and get a short one instantly.</p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex bg-white rounded-lg shadow-md overflow-hidden"
      >
        <input
          type="text"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="Paste your long URL here"
          className="flex-1 px-4 py-3 outline-none text-gray-700"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[#1A2E4A] text-white px-6 py-3 font-medium hover:bg-[#14253d] transition"
        >
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </form>

      {shortCode && (
        <p className="mt-6 text-gray-700">
          Short link:{" "}
          <a href={`https://url-shortener-webapp.vercel.app/${shortCode}`}
              target="_blank"
              className="text-red-800 font-medium underline"
          >
            {`https://url-shortener-webapp.vercel.app/${shortCode}`}
          </a>
        </p>
      )}
    </div>
  );
}