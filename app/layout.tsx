import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppProvider } from '@/contexts/app-context';
import { ThemeProvider } from './theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Crypto UX Playground - Web3 Interface Simulator',
  description: 'Safe, interactive environment for exploring Web3 user interfaces and crypto UX patterns',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <ThemeProvider>
            {children}
            <footer className="text-center text-sm text-muted-foreground py-6">
              ⚡ Built with <a
                href="https://bolt.new"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold"
              >
                Bolt.new
              </a>
            </footer>
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
