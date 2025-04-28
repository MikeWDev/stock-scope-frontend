import { Inter } from "next/font/google";
import "../sass/index.scss";
import { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stock Scope | Real-Time Stock Tracking",
  description:
    "Track your favorite stocks easily and stay informed with Stock Scope.",
  keywords: [
    "Stock Scope",
    "stock tracking",
    "real-time stocks",
    "finance",
    "investment",
  ],
  authors: [{ name: "Stock Scope Team" }],
  creator: "Stock Scope",
};

export const viewport: Viewport = {
  themeColor: "#3679f5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: "#282832",
              color: "#ffffff",
              fontSize: "1.6rem",
              border: "1px solid transparent",
              backgroundImage: `
                linear-gradient(#282832, #282832), 
                linear-gradient(90deg, #3679f5, #9f19f5, #9c4bf8)
              `,
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              boxShadow: "0 0 15px rgba(54, 121, 245, 0.4)",
              borderRadius: "10px",
            },
            position: "top-right",
          }}
        />
      </body>
    </html>
  );
}
