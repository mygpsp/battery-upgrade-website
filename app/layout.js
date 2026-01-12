import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "BatteryUpgrade - Bosch 4Ah to Tesla 10Ah Battery Upgrade",
  description: "Upgrade your Bosch 4Ah battery to a powerful 10Ah Tesla-powered battery. Professional service with 1-year warranty.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-slate-950 text-white">
        <LanguageProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
