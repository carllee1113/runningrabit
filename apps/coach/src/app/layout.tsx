import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/auth-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RunningRabbit Coach',
  description: 'Coaching dashboard for RunningRabbit athletes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.className} bg-white text-gray-900`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}