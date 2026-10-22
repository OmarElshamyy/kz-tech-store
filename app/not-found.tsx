import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <p className="category-label">Not found</p>
      <h1>This product page is not on the shelf.</h1>
      <p>Return to the catalog to keep browsing KZ headphones and accessories.</p>
      <Link className="primary-link" href="/#catalog">
        Back to catalog
      </Link>
    </main>
  );
}
