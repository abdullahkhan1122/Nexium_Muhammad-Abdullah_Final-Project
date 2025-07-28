"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/lib/useUser";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";

const decodeEscapedMarkdown = (input: string) => {
  return input.replace(/\\n/g, "\n").replace(/\\"/g, '"');
};

export default function GeneratePage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("");

  const [loadingAI, setLoadingAI] = useState(false);
  const [generatedPitch, setGeneratedPitch] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Handle expired/used link
  useEffect(() => {
    const error = searchParams.get("error_description");
    const errorCode = searchParams.get("error");

    if (
      errorCode === "access_denied" ||
      error?.toLowerCase().includes("expired")
    ) {
      toast.error(
        "Magic link expired or already used. Please request a new one."
      );
      router.push("/login");
    }

    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router, searchParams]);

  const handleGenerate = async () => {
    setLoadingAI(true);
    setGeneratedPitch("");

    try {
      const res = await fetch(
        "https://nexium-abd.app.n8n.cloud/webhook/generate-pitch",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, description, audience, tone }),
        }
      );

      const data = await res.json();
      setGeneratedPitch(data.pitch || "No pitch received from n8n.");
    } catch (err) {
      console.error("Fetch failed:", err);
      setGeneratedPitch("Failed to generate pitch. Try again.");
    } finally {
      setLoadingAI(false);
      setIsEditing(false);
    }
  };

  const downloadAsPDF = () => {
    const printContents = document.querySelector(".pitch-doc")?.innerHTML;
    if (!printContents) return;

    const popupWin = window.open("", "_blank", "width=800,height=900");
    if (!popupWin) return;

    popupWin.document.open();
    popupWin.document.write(`
    <html>
      <head>
        <title>${name || "Pitch"}</title>
        <style>
          body {
            font-family: 'Inter', sans-serif;
            padding: 40px;
            background: white;
            color: black;
          }
          h1, h2, h3 {
            margin-top: 24px;
            margin-bottom: 12px;
          }
          p, li {
            font-size: 14px;
            line-height: 1.6;
          }
        </style>
      </head>
      <body onload="window.print(); window.close();">
        ${printContents}
      </body>
    </html>
  `);
    popupWin.document.close();
  };

  if (loading || !user) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-gray-950 to-black px-6 text-white">
      <div className="mx-auto max-w-3xl pb-12 pt-24">
        <h1 className="mb-10 bg-gradient-to-r from-violet-400 via-pink-500 to-fuchsia-500 bg-clip-text text-center text-4xl font-extrabold tracking-tight text-transparent">
          Create Your Startup Pitch
        </h1>

        {!generatedPitch && (
          <div className="space-y-6">
            <input
              type="text"
              placeholder="Startup Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/10 p-4 text-white backdrop-blur-md placeholder:text-gray-400 focus:ring-2 focus:ring-pink-500"
            />
            <textarea
              placeholder="What does your product or startup do?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/10 p-4 text-white backdrop-blur-md placeholder:text-gray-400 focus:ring-2 focus:ring-pink-500"
              rows={4}
            />
            <input
              type="text"
              placeholder="Target Audience (e.g. investors, early adopters)"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/10 p-4 text-white backdrop-blur-md placeholder:text-gray-400 focus:ring-2 focus:ring-pink-500"
            />
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/10 p-4 text-left text-white backdrop-blur-md focus:ring-2 focus:ring-pink-500"
            >
              <option value="" disabled>
                Select Pitch Tone
              </option>
              <option className="bg-gray-900 text-white" value="Professional">
                Professional
              </option>
              <option className="bg-gray-900 text-white" value="Friendly">
                Friendly
              </option>
              <option className="bg-gray-900 text-white" value="Bold">
                Bold
              </option>
              <option className="bg-gray-900 text-white" value="Investor-ready">
                Investor-ready
              </option>
            </select>

            <button
              onClick={handleGenerate}
              disabled={loadingAI}
              className="w-full rounded-full border border-violet-500 bg-gradient-to-r from-violet-400 via-pink-500 to-violet-400 bg-clip-text py-3 text-lg font-semibold text-transparent transition hover:scale-105 hover:border-pink-400 disabled:opacity-50"
            >
              {loadingAI ? "Generating..." : "Generate Pitch"}
            </button>
          </div>
        )}

        {generatedPitch && (
          <div className="mt-14 rounded-xl border border-pink-500/30 bg-white/5 p-8 text-white shadow-2xl backdrop-blur-md">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-white">
                📄 Generated Pitch
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  Edit Info
                </button>
                <button
                  onClick={() => {
                    setGeneratedPitch("");
                    setIsEditing(false);
                  }}
                  className="rounded-full border border-pink-500 bg-gradient-to-r from-pink-500 to-fuchsia-500 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                >
                  Regenerate
                </button>
                <button
                  onClick={downloadAsPDF}
                  className="rounded-full border border-green-500 bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                >
                  Download PDF
                </button>
              </div>
            </div>

            {isEditing ? (
              <div className="mt-4">
                <textarea
                  value={generatedPitch}
                  onChange={(e) => setGeneratedPitch(e.target.value)}
                  rows={20}
                  className="w-full rounded-lg border border-white/10 bg-black/20 p-4 text-white outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button
                  onClick={() => setIsEditing(false)}
                  className="mt-4 rounded-full border border-green-500 bg-gradient-to-r from-green-400 to-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="pitch-doc prose prose-lg prose-invert max-w-none prose-headings:my-3 prose-p:my-2 prose-ul:pl-6 prose-li:my-1">
                <ReactMarkdown>
                  {decodeEscapedMarkdown(generatedPitch)}
                </ReactMarkdown>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
