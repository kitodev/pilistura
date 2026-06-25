// @ts-nocheck
import React, { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "pilistura_privacy_consent";

export default function PrivacyConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(window.localStorage.getItem(STORAGE_KEY) !== "accepted");
  }, []);

  const accept = () => {
    window.localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-[70] w-[calc(100%-1rem)] max-w-7xl -translate-x-1/2 border border-[#f2d27d] bg-[#1f1f1f] px-4 py-4 text-white shadow-2xl sm:px-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold sm:text-base">
          A weboldal használatával elfogadja adatvédelmi szabályzatunkat!{" "}
          <Link href="/adatvedelmi-szabalyzat" className="text-white/70 underline underline-offset-2 hover:text-white">
            Tovább
          </Link>
        </p>
        <button
          onClick={accept}
          className="self-start bg-[#f6dc86] px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-[#ffe69a] sm:self-auto"
        >
          Értettem
        </button>
      </div>
    </div>
  );
}
