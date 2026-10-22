import type { ProductCategory } from "../../types";

const BANNERS = [
  { id: 'new-drops', tag: 'New Releases', title: 'Fresh drops, just landed.', sub: 'New IEMs and audio gear added to the catalog.', cta: 'Shop New', category: null as ProductCategory | null, anchorId: 'catalog', bgClass: 'promo-banner-cyan', image: '/products/moondrop-ultrasonic.png' },
  { id: 'gaming', tag: 'Gaming Setup', title: 'Hear what others miss.', sub: 'IEMs and DACs tuned for competitive gaming and positional accuracy.', cta: 'Shop IEMs', category: 'IEMs' as ProductCategory, anchorId: 'catalog', bgClass: 'promo-banner-purple', image: '/products/kz-castor-bass.png' },
  { id: 'wireless', tag: 'Go Wireless', title: 'Cut the cable. Keep the quality.', sub: 'Bluetooth adapters and wireless IEM systems for a tangle-free setup.', cta: 'Shop Wireless', category: 'Wireless' as ProductCategory, anchorId: 'catalog', bgClass: 'promo-banner-cyan', image: '/products/kz-az09-wireless.png' },
  { id: 'accessories', tag: 'Accessories', title: 'Complete the setup.', sub: 'Cables, tips, cases, and DAC dongles for the full audio kit.', cta: 'Shop Accessories', category: 'Cables' as ProductCategory, anchorId: 'catalog', bgClass: 'promo-banner-purple', image: '/products/kz-t8-silver-cable.png' },
];

export function PromoBanners({ onCategorySelect }: { onCategorySelect: (cat: ProductCategory | 'All') => void; }) {
  return (
    <section className="promo-banners" aria-label="Featured collections">
      {BANNERS.map((banner, i) => (
        <div key={banner.id} className={`promo-banner ${banner.bgClass} ${i % 2 === 1 ? 'promo-banner-reverse' : ''}`}>
          <div className="promo-banner-content">
            <span className="promo-banner-tag">{banner.tag}</span><h2>{banner.title}</h2><p>{banner.sub}</p>
            <button className="primary-button" onClick={() => { onCategorySelect(banner.category || 'All'); document.getElementById(banner.anchorId)?.scrollIntoView({ behavior: 'smooth' }); }}>{banner.cta} →</button>
          </div>
          <div className="promo-banner-img-wrap"><img src={banner.image} alt={banner.title} loading="lazy" decoding="async" className="promo-banner-img" /></div>
        </div>
      ))}
    </section>
  );
}