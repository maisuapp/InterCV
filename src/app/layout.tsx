import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'InterCV | Seu CV internacional',
  description: 'Crie um CV internacional claro, compatível com ATS e adaptado ao país da sua próxima oportunidade.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-50 text-slate-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}