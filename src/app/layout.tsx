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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ParticlesBackground />
          <Navbar />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
