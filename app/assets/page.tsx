import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { Database } from '@/types/database';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explora y descubre activos financieros del Mercado Continuo y BME Growth.',
};

type Asset = Database['public']['Tables']['assets']['Row'];

export default async function AssetsPage() {
  const supabase = await createClient();

  const { data: assets, error } = await supabase
    .from('assets')
    .select('*')
    .order('symbol', { ascending: true });

  if (error) {
    console.error('Error fetching assets:', error);
  }

  const typedAssets: Asset[] = assets || [];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">Market Explorer</h1>
          <p className="text-neutral-400 text-sm">Activos financieros disponibles en la plataforma.</p>
        </header>

        <main>
          {typedAssets.length === 0 ? (
            <div className="border border-neutral-800 rounded-lg p-12 text-center bg-[#111]">
              <h3 className="text-lg font-medium text-white mb-2">El mercado está vacío</h3>
              <p className="text-neutral-500 text-sm max-w-sm mx-auto">
                No se encontraron activos en la base de datos. Comienza a poblar el mercado para iniciar el análisis.
              </p>
            </div>
          ) : (
            <div className="border border-neutral-800 rounded-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-800 bg-[#111] text-xs uppercase tracking-wider text-neutral-400">
                      <th className="font-medium p-4 w-32">Ticker</th>
                      <th className="font-medium p-4">Empresa</th>
                      <th className="font-medium p-4 hidden md:table-cell">Sector</th>
                      <th className="font-medium p-4">Mercado</th>
                      <th className="font-medium p-4 text-right">Precio</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800 text-sm">
                    {typedAssets.map((asset) => (
                      <tr key={asset.id} className="group hover:bg-[#161616] transition-colors">
                        <td className="p-0">
                          <Link href={`/assets/${asset.symbol}`} className="block p-4 h-full w-full">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-800 text-neutral-200 border border-neutral-700">
                              {asset.symbol}
                            </span>
                          </Link>
                        </td>
                        <td className="p-0">
                          <Link href={`/assets/${asset.symbol}`} className="block p-4 h-full w-full text-neutral-300 font-medium group-hover:text-white transition-colors">
                            {asset.name}
                          </Link>
                        </td>
                        <td className="p-0 hidden md:table-cell">
                          <Link href={`/assets/${asset.symbol}`} className="block p-4 h-full w-full text-neutral-500">
                            {asset.sector || '—'}
                          </Link>
                        </td>
                        <td className="p-0">
                          <Link href={`/assets/${asset.symbol}`} className="block p-4 h-full w-full text-neutral-400">
                            {asset.market || '—'}
                          </Link>
                        </td>
                        <td className="p-0">
                          <Link href={`/assets/${asset.symbol}`} className="block p-4 h-full w-full text-right font-mono text-neutral-300">
                            {asset.last_price ? `${asset.last_price.toFixed(2)} €` : '—'}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
