"use client";
import { useState } from "react";
import type { Product } from "../../types";

export function useProductCompare() {
  const [compareList, setCompareList] = useState<Product[]>([]);
  function toggleCompare(product: Product) {
    setCompareList(prev => {
      if (prev.find(p => p.id === product.id)) return prev.filter(p => p.id !== product.id);
      if (prev.length >= 3) return prev;
      return [...prev, product];
    });
  }
  function clearCompare() { setCompareList([]); }
  return { compareList, toggleCompare, clearCompare };
}

export function CompareBar({ compareList, onClear, onOpenModal }: { compareList: Product[]; onClear: () => void; onOpenModal: () => void; }) {
  if (compareList.length < 1) return null;
  return (
    <div className="compare-bar" role="status" aria-live="polite">
      <span className="compare-bar-label">{compareList.length} product{compareList.length !== 1 ? 's' : ''} selected to compare</span>
      <div className="compare-bar-actions">
        <button className="primary-button compare-bar-btn" onClick={onOpenModal} disabled={compareList.length < 2}>Compare {compareList.length < 2 ? '(select 2+)' : 'Now'}</button>
        <button className="ghost-button" onClick={onClear}>Clear</button>
      </div>
    </div>
  );
}

export function CompareModal({ products, onClose, onViewProduct }: { products: Product[]; onClose: () => void; onViewProduct: (p: Product) => void; }) {
  const formatCurrency = (price: number) => `EGP${price.toLocaleString()}`;
  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Compare products">
      <div className="compare-modal" onClick={e => e.stopPropagation()}>
        <div className="compare-modal-header"><h2>Product Comparison</h2><button className="modal-close" onClick={onClose} aria-label="Close comparison">×</button></div>
        <div className="compare-modal-body">
          <div className="compare-table">
            <div className="compare-row compare-header-row">
              <div className="compare-label-cell">Product</div>
              {products.map(p => (
                <div key={p.id} className="compare-product-cell">
                  <img src={p.imageUrl || p.imageUrls?.[0] || ''} alt={p.name} loading="lazy" decoding="async" className="compare-product-img"/>
                  <h3>{p.name}</h3>
                  <button className="primary-link" onClick={() => { onClose(); onViewProduct(p); }}>View Details</button>
                </div>
              ))}
            </div>
            <div className="compare-row"><div className="compare-label-cell">Category</div>{products.map(p => <div key={p.id} className="compare-data-cell">{p.category}</div>)}</div>
            <div className="compare-row"><div className="compare-label-cell">Price</div>{products.map(p => <div key={p.id} className="compare-data-cell compare-price">{formatCurrency(p.price)}</div>)}</div>
            <div className="compare-row"><div className="compare-label-cell">Availability</div>{products.map(p => <div key={p.id} className={`compare-data-cell ${p.inStock ? 'compare-instock' : 'compare-outstock'}`}>{p.inStock ? `✓ In Stock (${p.stockQuantity})` : '✗ Out of Stock'}</div>)}</div>
            {[0, 1, 2, 3].map(specIndex => {
              if (!products.some(p => p.specs?.[specIndex])) return null;
              return (
                <div key={specIndex} className="compare-row">
                  <div className="compare-label-cell">Spec {specIndex + 1}</div>
                  {products.map(p => <div key={p.id} className="compare-data-cell">{p.specs?.[specIndex] || '—'}</div>)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}