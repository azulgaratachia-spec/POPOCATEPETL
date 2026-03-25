import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "SCM Connect - Supply Chain Management",
  description: "Gestión de cadena de suministro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <div className="flex min-h-screen bg-background">
          <Sidebar />
          <div className="flex-1 flex flex-col ml-[280px]">
            <Header />
            <main className="flex-1 p-6 mt-16">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
