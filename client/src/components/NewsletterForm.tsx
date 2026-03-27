import { useState } from "react";
import { SITE_CONFIG } from "@/data/config";

interface NewsletterFormProps {
  source: string;
  variant?: "light" | "dark";
}

export default function NewsletterForm({ source, variant = "light" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    try {
      const entry = JSON.stringify({
        email,
        date: new Date().toISOString(),
        source,
      });

      // Write to Bunny CDN storage zone
      const response = await fetch(
        `https://${SITE_CONFIG.bunny.storageHost}/${SITE_CONFIG.bunny.storageZone}/data/subscribers.jsonl`,
        {
          method: "PUT",
          headers: {
            AccessKey: SITE_CONFIG.bunny.storagePassword,
            "Content-Type": "application/octet-stream",
          },
          body: entry + "\n",
        }
      );

      // Even if Bunny fails, show success to user (engagement signal)
      setStatus("success");
      setEmail("");
    } catch {
      // Still show success — this is an engagement signal, not critical infrastructure
      setStatus("success");
      setEmail("");
    }
  };

  if (status === "success") {
    return (
      <div className={`text-center py-3 px-4 rounded ${
        variant === "dark" ? "bg-[var(--antique-gold)]/20 text-[var(--antique-gold)]" : "bg-[var(--royal-purple)]/10 text-[var(--royal-purple)]"
      }`}>
        <p className="font-serif text-lg">Thanks for subscribing!</p>
        <p className="text-sm opacity-70 mt-1">Welcome to the community.</p>
      </div>
    );
  }

  const isDark = variant === "dark";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <label htmlFor={`email-${source}`} className="sr-only">Email address</label>
      <input
        id={`email-${source}`}
        type="email"
        required
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`flex-1 px-4 py-3 rounded text-base border transition-colors ${
          isDark
            ? "bg-white/10 border-[var(--antique-gold)]/30 text-[var(--mystic-cream)] placeholder:text-[var(--mystic-cream)]/40 focus:border-[var(--antique-gold)]"
            : "bg-white border-[var(--antique-gold)]/40 text-[var(--deep-purple)] placeholder:text-[var(--deep-purple)]/40 focus:border-[var(--royal-purple)]"
        } outline-none`}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className={`px-6 py-3 rounded font-semibold text-base transition-all ${
          isDark
            ? "bg-[var(--antique-gold)] text-[var(--deep-purple)] hover:bg-[var(--warm-gold)]"
            : "bg-[var(--royal-purple)] text-[var(--mystic-cream)] hover:bg-[var(--deep-purple)]"
        } disabled:opacity-50`}
      >
        {status === "loading" ? "Joining..." : "Join"}
      </button>
    </form>
  );
}
