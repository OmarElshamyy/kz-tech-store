"use client";
import { useEffect, useState } from "react";
import { DEFAULT_STOREFRONT_CONFIG, type StorefrontConfig } from "../../storefrontConfig";

export function AnnouncementBar({
  config = DEFAULT_STOREFRONT_CONFIG.announcement,
}: {
  config?: StorefrontConfig["announcement"];
}) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  const messages = config.messages?.length > 0 ? config.messages : DEFAULT_STOREFRONT_CONFIG.announcement.messages;
  const intervalMs = Math.max(2, Number(config.intervalSeconds) || 4) * 1000;

  useEffect(() => {
    if (!config.enabled || messages.length <= 1) return;
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setVisible(true);
      }, 300);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [config.enabled, intervalMs, messages.length]);

  if (dismissed || !config.enabled || messages.length === 0) return null;

  const currentMsg = messages[index % messages.length] || messages[0];

  return (
    <div className="announcement-bar" role="banner">
      <div className={`announcement-text ${visible ? "visible" : "hidden"}`}>
        {currentMsg}
      </div>
      <button
        className="announcement-close"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
      >
        ×
      </button>
    </div>
  );
}
