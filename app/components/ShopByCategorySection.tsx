"use client";

import React from "react";
import type { ProductCategory } from "../../types";

const CATEGORY_META: Record<ProductCategory, { desc: string; image: string; tag: string }> = {
  "IEMs": {
    desc: "Stage, gaming & dual-driver in-ear monitors",
    image: "/categories/cat-kz.webp",
    tag: "30+ Models",
  },
  "Wireless": {
    desc: "Low-latency Bluetooth 5.2 earhook adapters",
    image: "/categories/cat-bluetooth.jpg",
    tag: "TWS Audio",
  },
  "Cables": {
    desc: "Silver-plated OFC oxygen-free upgrade cords",
    image: "/products/kz-t8-silver-cable.png",
    tag: "High Purity",
  },
  "Ear tips": {
    desc: "Memory foam & medical-grade acoustic seal tips",
    image: "/categories/cat-accessories.jpg",
    tag: "Acoustic Seal",
  },
  "Cases": {
    desc: "Shockproof EVA & carbon hard shell armor",
    image: "/products/kz_real/kz-premium-case-1.jpg",
    tag: "Heavy Duty",
  },
  "DACs": {
    desc: "32-Bit / 384kHz Type-C lossless amp dongles",
    image: "/products/kz_real/kz-am02-dac-1.webp",
    tag: "Hi-Res Audio",
  },
};

const CATEGORIES: ProductCategory[] = ["IEMs", "Wireless", "Cables", "Ear tips", "Cases", "DACs"];

export function ShopByCategorySection({
  onCategorySelect,
  activeCategory,
}: {
  onCategorySelect: (cat: ProductCategory | "All") => void;
  activeCategory?: ProductCategory | "All";
}) {
  return (
    <section className="kz-categories-section" id="categories" aria-label="Shop By Category">
      <div className="kz-section-container">
        <div className="kz-section-header-row">
          <div>
            <span className="kz-section-kicker">CURATED COLLECTIONS</span>
            <h2 className="kz-section-title">Shop by Category</h2>
          </div>
          <button
            type="button"
            className="kz-section-action-link"
            onClick={() => onCategorySelect("All")}
          >
            <span>View All Gear</span>
            <span className="kz-link-arrow">→</span>
          </button>
        </div>

        <div className="kz-category-cards-grid">
          {CATEGORIES.map((cat) => {
            const meta = CATEGORY_META[cat];
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                className={`kz-category-card ${isSelected ? "active" : ""}`}
                onClick={() => onCategorySelect(cat)}
                aria-label={`Shop ${cat}`}
              >
                <div className="kz-category-card-img-wrap">
                  <img
                    src={meta.image}
                    alt={cat}
                    className="kz-category-card-img"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="kz-category-card-overlay" />
                  <span className="kz-category-card-tag">{meta.tag}</span>
                </div>
                <div className="kz-category-card-info">
                  <div className="kz-cat-header">
                    <h3>{cat}</h3>
                  </div>
                  <p>{meta.desc}</p>
                  <span className="kz-category-explore-link">
                    Explore collection →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
