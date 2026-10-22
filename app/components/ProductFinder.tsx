"use client";

import React, { useState } from "react";
import type { Product } from "../../types";

type Step = 1 | 2 | 3;

const STEP1_OPTIONS = [
  {
    id: "gaming",
    label: "Competitive Gaming",
    desc: "Positional 3D imaging & low-latency cues",
    badge: "FPS / ESPORTS",
  },
  {
    id: "music",
    label: "Hi-Fi Music Listening",
    desc: "Acoustic resolution, instrument separation & bass depth",
    badge: "AUDIOPHILE",
  },
  {
    id: "everyday",
    label: "Everyday Listening & Commute",
    desc: "Comfortable ergonomic fit & noise isolating seal",
    badge: "DAILY DRIVER",
  },
  {
    id: "studio",
    label: "Studio & Live Production",
    desc: "Linear reference response & stage monitor monitoring",
    badge: "PRO STAGE",
  },
];

const STEP2_OPTIONS = [
  {
    id: "wired",
    label: "Wired (Detachable Cable)",
    desc: "Pure uncompressed lossless 32-bit audio signal",
    badge: "ZERO DELAY",
  },
  {
    id: "wireless",
    label: "Wireless (Bluetooth Earhooks)",
    desc: "Cable-free freedom with low-latency gaming mode",
    badge: "BLUETOOTH 5.2",
  },
  {
    id: "both",
    label: "Show Both Options",
    desc: "Display wired IEMs and wireless setups",
    badge: "ALL OPTIONS",
  },
];

const STEP3_OPTIONS = [
  {
    id: "budget",
    label: "Under EGP 1,000",
    desc: "Outstanding starter performance & hybrid drivers",
    badge: "STARTER",
  },
  {
    id: "mid",
    label: "EGP 1,000 – 3,000",
    desc: "Sweet spot for multi-driver hybrid monitors",
    badge: "PERFORMANCE",
  },
  {
    id: "premium",
    label: "EGP 3,000+",
    desc: "Flagship multi-balanced armatures & planar systems",
    badge: "FLAGSHIP",
  },
];

function filterProducts(
  products: Product[],
  useCase: string,
  connectivity: string,
  budget: string
): Product[] {
  return products
    .filter((p) => {
      if (!p.inStock) return false;
      if (connectivity === "wired" && p.category === "Wireless") return false;
      if (connectivity === "wireless" && p.category !== "Wireless") return false;
      if (budget === "budget" && p.price >= 1000) return false;
      if (budget === "mid" && (p.price < 1000 || p.price >= 3000)) return false;
      if (budget === "premium" && p.price < 3000) return false;
      if (useCase === "gaming" && !["IEMs", "DACs", "Cables"].includes(p.category)) return false;
      if (useCase === "studio" && !["IEMs", "DACs"].includes(p.category)) return false;
      return true;
    })
    .slice(0, 8);
}

export function ProductFinder({
  products,
  onViewProduct,
}: {
  products: Product[];
  onViewProduct: (p: Product) => void;
}) {
  const [step, setStep] = useState<Step>(1);
  const [useCase, setUseCase] = useState("");
  const [connectivity, setConnectivity] = useState("");
  const [budget, setBudget] = useState("");
  const [results, setResults] = useState<Product[] | null>(null);

  function handleUseCase(id: string) {
    setUseCase(id);
    setStep(2);
  }

  function handleConnectivity(id: string) {
    setConnectivity(id);
    setStep(3);
  }

  function handleBudget(id: string) {
    setBudget(id);
    const found = filterProducts(products, useCase, id === "wireless" ? "wireless" : connectivity, id);
    setResults(found);
  }

  function reset() {
    setStep(1);
    setUseCase("");
    setConnectivity("");
    setBudget("");
    setResults(null);
  }

  const formatCurrency = (price: number) => `EGP${price.toLocaleString()}`;

  return (
    <section className="product-finder" id="finder">
      <div className="section-heading">
        <p className="category-label">Gear match</p>
        <h2>Find Your Ideal Audio Setup</h2>
        <p className="finder-subtitle">Answer 3 questions and we&apos;ll match you to the right gear from our catalog.</p>
      </div>

      {results === null ? (
        <div className="finder-steps">
          {/* Progress bar */}
          <div className="finder-progress" aria-label={`Step ${step} of 3`}>
            {([1, 2, 3] as Step[]).map((s) => (
              <div key={s} className={`finder-step-dot ${s <= step ? "active" : ""}`} />
            ))}
          </div>

          {step === 1 && (
            <div className="finder-step">
              <h3>What are you shopping for?</h3>
              <div className="finder-options">
                {STEP1_OPTIONS.map((opt) => (
                  <button key={opt.id} className="finder-option" onClick={() => handleUseCase(opt.id)}>
                    <span className="finder-option-badge">{opt.badge}</span>
                    <strong>{opt.label}</strong>
                    <span>{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="finder-step">
              <h3>Wired or Wireless?</h3>
              <div className="finder-options">
                {STEP2_OPTIONS.map((opt) => (
                  <button key={opt.id} className="finder-option" onClick={() => handleConnectivity(opt.id)}>
                    <span className="finder-option-badge">{opt.badge}</span>
                    <strong>{opt.label}</strong>
                    <span>{opt.desc}</span>
                  </button>
                ))}
              </div>
              <button className="finder-back" onClick={() => setStep(1)}>
                ← Back
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="finder-step">
              <h3>What&apos;s your budget?</h3>
              <div className="finder-options">
                {STEP3_OPTIONS.map((opt) => (
                  <button key={opt.id} className="finder-option" onClick={() => handleBudget(opt.id)}>
                    <span className="finder-option-badge">{opt.badge}</span>
                    <strong>{opt.label}</strong>
                    <span>{opt.desc}</span>
                  </button>
                ))}
              </div>
              <button className="finder-back" onClick={() => setStep(2)}>
                ← Back
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="finder-results">
          <div className="finder-results-header">
            <h3>
              {results.length > 0
                ? `${results.length} match${results.length !== 1 ? "es" : ""} found for your setup`
                : "No exact matches — try different criteria"}
            </h3>
            <button className="finder-reset" onClick={reset}>
              Start Over
            </button>
          </div>

          {results.length > 0 ? (
            <div className="finder-results-grid">
              {results.map((p) => (
                <button
                  key={p.id}
                  className="finder-result-card"
                  onClick={() => onViewProduct(p)}
                >
                  <div className="finder-result-img-wrap">
                    <img
                      src={p.imageUrl || p.imageUrls?.[0] || ""}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="finder-result-info">
                    <span className="finder-result-category">{p.category}</span>
                    <h4>{p.name}</h4>
                    <strong>{formatCurrency(p.price)}</strong>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p className="finder-empty">Try widening your budget or changing connectivity preference.</p>
          )}
        </div>
      )}
    </section>
  );
}
