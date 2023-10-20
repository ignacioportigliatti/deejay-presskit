import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { neobrutalism } from "@clerk/themes";
import { Toaster } from "@/components/ui/toaster";

const font = Inter({ subsets: ["latin"] });

export const colors = [
  "#007BFF",
  "#FF5733",
  "#28A745",
  "#FFC107",
  "#6F42C1",
  "#FD7E14",
  "#17A2B8",
  "#DC3545",
];


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <ClerkProvider
      appearance={{
        baseTheme: neobrutalism,
        variables: {
          colorBackground: "#121212da",
          colorText: "#ffffff",
          colorPrimary: colors[Math.floor(Math.random() * colors.length)],
          colorInputBackground: "#2323232b",
          colorInputText: "#ffffff",
        },
        elements: {
          userButtonPopoverActionButtonIcon: {
            color: "#ffffff",
          },
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className, "")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <main>{children}</main>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
