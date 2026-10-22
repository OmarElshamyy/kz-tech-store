import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KZ Audio Store",
  description: "KZ headphones and portable audio accessories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ background: "#05070d", colorScheme: "dark" }}>
      <head>
        {/* Critical: dark background & baseline resets before ANY CSS loads */}
        <style>{`
          *,html,body{margin:0;box-sizing:border-box;}
          html{background:#05070d;color-scheme:dark;}
          body{
            background:linear-gradient(180deg,#05070d 0%,#08111f 45%,#05070d 100%);
            color:#f4f8ff;
            font-family:Inter,ui-sans-serif,system-ui,-apple-system,sans-serif;
          }
          img{max-width:100%;height:auto;display:block;}
          a{color:inherit;text-decoration:none;}
        `}</style>
      </head>
      <body style={{ background: "linear-gradient(180deg,#05070d 0%,#08111f 45%,#05070d 100%)", color: "#f4f8ff", margin: 0 }}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
