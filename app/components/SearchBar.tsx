"use client";
import { useEffect, useRef } from "react";

export function SearchBar({
  value,
  onChange,
  onClose,
}: {
  value: string;
  onChange: (v: string) => void;
  onClose: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="search-overlay" role="search">
      <div className="search-box">
        <span className="search-icon" aria-hidden="true">⌕</span>
        <input
          ref={inputRef}
          type="search"
          placeholder="Search products, categories..."
          value={value}
          onChange={e => onChange(e.target.value)}
          className="search-input"
          aria-label="Search products"
        />
        {value && (
          <button className="search-clear" onClick={() => onChange('')} aria-label="Clear search">×</button>
        )}
      </div>
      <button className="search-backdrop" onClick={onClose} aria-label="Close search" />
    </div>
  );
}