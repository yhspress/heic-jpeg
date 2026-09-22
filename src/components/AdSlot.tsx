"use client";
import { useEffect } from "react";
import { ADSENSE_PUBLISHER_ID } from "@/config/site";
import { useOptionalConsent } from "@/lib/consent";

export function AdSlot({ slot, label = "広告" }: { slot?: string; label?: string }) {
  const consent = useOptionalConsent();
  useEffect(() => {
    if (!ADSENSE_PUBLISHER_ID || !slot || consent !== "yes") return;
    try { ((window as Window & { adsbygoogle?: unknown[] }).adsbygoogle ??= []).push({}); } catch { /* Ad blocker etc. */ }
  }, [slot, consent]);
  if (!ADSENSE_PUBLISHER_ID || !slot || consent !== "yes") return null;
  return <aside aria-label={label} className="my-10 min-h-24 rounded-xl border border-slate-200 bg-slate-50 p-3 text-center text-xs text-slate-500">
    <span className="mb-2 block">{label}</span><ins className="adsbygoogle block" style={{ display: "block" }} data-ad-client={ADSENSE_PUBLISHER_ID} data-ad-slot={slot} data-ad-format="auto" data-full-width-responsive="true" />
  </aside>;
}
