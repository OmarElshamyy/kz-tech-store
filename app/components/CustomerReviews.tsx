"use client";

import React, { useState } from "react";
import { DEFAULT_STOREFRONT_CONFIG, type StorefrontConfig } from "../../storefrontConfig";

export function CustomerReviews({
  reviewsConfig = DEFAULT_STOREFRONT_CONFIG.reviews,
}: {
  reviewsConfig?: StorefrontConfig["reviews"];
}) {
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  const items =
    reviewsConfig.items?.length > 0
      ? reviewsConfig.items
      : DEFAULT_STOREFRONT_CONFIG.reviews.items;

  if (!reviewsConfig.enabled || items.length === 0) return null;

  return (
    <section className="kz-reviews-section" aria-label="Customer Reviews">
      <div className="kz-section-container">
        <div className="kz-reviews-header">
          <div className="kz-reviews-header-left">
            <span className="kz-section-kicker">{reviewsConfig.kicker}</span>
            <h2 className="kz-section-title">{reviewsConfig.title}</h2>
          </div>

          <div className="kz-reviews-score-badge">
            <div className="kz-stars" aria-label="5 out of 5 stars">
              ★★★★★
            </div>
            <div className="kz-score-text">
              <strong>{reviewsConfig.overallRating}</strong>
              <span>{reviewsConfig.overallSubtext}</span>
            </div>
          </div>
        </div>

        <div className="kz-reviews-grid">
          {items.map((r, i) => (
            <div
              key={r.id + i}
              className={`kz-review-card ${i === activeReviewIdx ? "highlighted" : ""}`}
              onMouseEnter={() => setActiveReviewIdx(i)}
            >
              <div className="kz-review-top">
                <div className="kz-review-stars">{"★".repeat(Math.max(1, Math.min(5, r.rating || 5)))}</div>
                <span className="kz-review-date">{r.date}</span>
              </div>

              <h3 className="kz-review-headline">&ldquo;{r.headline}&rdquo;</h3>
              <p className="kz-review-text">{r.text}</p>

              <div className="kz-review-footer">
                <div className="kz-review-author-info">
                  <strong className="kz-review-author">{r.author}</strong>
                  <span className="kz-review-city">{r.city}</span>
                </div>
                <div className="kz-review-product-tag">
                  {r.verified && <span className="kz-verified-pill">✓ Verified</span>}
                  <span className="kz-product-name">{r.product}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
