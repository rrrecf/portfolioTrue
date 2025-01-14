import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import { Raleway } from "next/font/google";
import "./globals.css";
import "./styles/customStyles.css";
import Navbar from "./components/Navbar";
import ParticlesBackground from "./components/ParticlesBackground";
import { ThemeProvider } from 'next-themes';
import PageTransition from "./components/PageTransition";
import Footer from "./components/Footer";

const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway" });
const robotoMono = Roboto_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: "Portfolio - Développeur Web",
  description: "Portfolio professionnel présentant mes projets et compétences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${robotoMono.variable} ${raleway.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="relative min-h-screen bg-gradient-to-b from-white to-purple-100 dark:from-black dark:to-purple-900/20 text-black dark:text-white transition-colors duration-300">
            <ParticlesBackground />
            <Navbar />
            <PageTransition>
              <main className="relative z-10">
                {children}
              </main>
            </PageTransition>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
