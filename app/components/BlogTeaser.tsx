"use client";

import React from "react";
import { DEFAULT_STOREFRONT_CONFIG, type StorefrontConfig } from "../../storefrontConfig";

export function BlogTeaser({
  blogConfig = DEFAULT_STOREFRONT_CONFIG.blog,
}: {
  blogConfig?: StorefrontConfig["blog"];
}) {
  const articles =
    blogConfig.articles?.length > 0
      ? blogConfig.articles
      : DEFAULT_STOREFRONT_CONFIG.blog.articles;

  if (!blogConfig.enabled || articles.length === 0) return null;

  return (
    <section className="blog-teaser" aria-label="Audio guides">
      <div className="section-heading">
        <p className="category-label">{blogConfig.kicker}</p>
        <h2>{blogConfig.title}</h2>
        <p className="section-sub">{blogConfig.subtitle}</p>
      </div>

      <div className="blog-grid">
        {articles.map((a, idx) => (
          <article key={a.id + idx} className="blog-card">
            <div className="blog-card-img-wrap">
              <img
                src={a.image}
                alt={a.title}
                loading="lazy"
                decoding="async"
                className="blog-card-img"
              />
            </div>
            <div className="blog-card-content">
              <span className="blog-card-tag">{a.tag}</span>
              <h3>{a.title}</h3>
              <p>{a.excerpt}</p>
              <span className="blog-card-read-more">{a.readMoreText || "Read Guide →"}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
