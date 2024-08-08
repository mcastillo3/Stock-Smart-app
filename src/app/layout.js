import { Inter } from "next/font/google";
import "../styles/globals.css";
import ThemeProvider from "./providers/ThemeProvider";
import Navigation from "./_components/Navigation";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pantry App",
  description: "Generated by Mauro Castillo using create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider>
            <div style={{ display: "flex", minHeight: "100vh" }}>
              <Navigation />
              <main style={{ flex: 1, overflow: "auto" }}>{children}</main>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
