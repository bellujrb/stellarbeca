import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { WalletProvider } from '@/contexts/wallet-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Stellarbeca',
  description: 'La nueva generación de financiación científica con Blockchain y Stellar.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}