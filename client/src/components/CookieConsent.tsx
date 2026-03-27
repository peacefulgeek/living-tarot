import { useState, useEffect } from "react";
import { Link } from "wouter";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--deep-purple)] text-[var(--mystic-cream)] border-t border-[var(--antique-gold)]/30 p-4 md:p-6">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[var(--mystic-cream)]/80 text-center md:text-left">
          We use cookies to enhance your experience. By continuing to visit this site, you agree to our use of cookies.{" "}
          <Link href="/privacy" className="text-[var(--antique-gold)] underline">
            Privacy Policy
          </Link>
        </p>
        <button
          onClick={accept}
          className="px-6 py-2 bg-[var(--antique-gold)] text-[var(--deep-purple)] rounded font-semibold text-sm hover:bg-[var(--warm-gold)] transition-colors whitespace-nowrap"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
