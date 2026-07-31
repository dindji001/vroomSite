import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import AppProviders from "@/components/providers/app-providers";
import { TopBar } from "@/components/layout/topbar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DrawerRenderer } from "@/components/layout/drawer-renderer";
import { ModalRenderer } from "@/components/layout/modal-renderer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vroomcar.com"),
  title: {
    default: "VroomCar — L'Excellence Automobile",
    template: "%s | VroomCar",
  },
  description:
    "VroomCar redéfinit l'expérience automobile premium. Découvrez notre collection de véhicules d'exception, nos services sur-mesure et notre engagement envers l'excellence.",
  keywords: [
    "VroomCar",
    "voiture premium",
    "automobile de luxe",
    "véhicule électrique",
    "concession haut de gamme",
    "Tesla",
    "Mercedes",
    "Porsche",
    "BMW",
    "Rivian",
  ],
  authors: [{ name: "VroomCar", url: "https://vroomcar.com" }],
  creator: "VroomCar",
  publisher: "VroomCar",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://vroomcar.com",
    siteName: "VroomCar",
    title: "VroomCar — L'Excellence Automobile",
    description:
      "VroomCar redéfinit l'expérience automobile premium. Découvrez notre collection de véhicules d'exception.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VroomCar — L'Excellence Automobile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VroomCar — L'Excellence Automobile",
    description: "VroomCar redéfinit l'expérience automobile premium.",
    images: ["/og-image.png"],
    creator: "@vroomcar",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#101418" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <AppProviders>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-primary-foreground focus:shadow-lg"
          >
            Aller au contenu principal
          </a>
          <TopBar />
          <Navbar />
          <main id="main-content" className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
          <DrawerRenderer />
          <ModalRenderer />
        </AppProviders>
      </body>
    </html>
  );
}
