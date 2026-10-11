import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Indoor Vertical Farming | Plenty",
  description: "Plenty is rewriting the rules of agriculture with indoor vertical farms that grow fresh, flavorful, pesticide free greens – all while using just a fraction of the water and land compared to conventional farms.",
  icons: {
    icon: "https://www.plenty.ag/wp-content/uploads/2022/05/footer-logo.png",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-white text-[#121212] selection:bg-[#FF391B] selection:text-white">
        {children}
      </body>
    </html>
  );
}
