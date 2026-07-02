import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { TrendingUp, FolderSearch } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explora y descubre activos del mercado español.',
};

export default async function AssetsPage() {
  const supabase = await createClient();

  const { data: assets, error } = await supabase
    .from('assets')
    .select('symbol, name, sector, market, last_price')
    .eq('is_active', true)
    .order('symbol', { ascending: true });

  if (error) {
    console.error('Error fetching assets:', error);
  }

  const hasAssets = assets && assets.length > 0;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-500" />
              Market Explorer
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Explora los activos del IBEX 35, Mercado Continuo y BME Growth.
            </p>
          </div>
        </header>

        {hasAssets ? (
          <div className="border border-gray-800 rounded-lg overflow-hidden bg-[#0A0A0A]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="border-b border-gray-800 text-xs uppercase tracking-wider text-gray-500 bg-[#0A0A0A]">
                    <th className="px-4 py-3 font-medium">Ticker</th>
                    <th className="px-4 py-3 font-medium">Empresa</th>
                    <th className="px-4 py-3 font-medium hidden sm:table-cell">Sector</th>
                    <th className="px-4 py-3 font-medium">Mercado</th>
                    <th className="px-4 py-3 font-medium text-right">Precio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 text-sm">
                  {assets.map((asset) => (
                    <tr
                      key={asset.symbol}
                      className="hover:bg-gray-800/50 transition-colors group"
                    >
                      <td className="p-0">
                        <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 h-full w-full">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700 group-hover:border-gray-600 transition-colors">
                            {asset.symbol}
                          </span>
                        </Link>
                      </td>
                      <td className="p-0">
                        <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 h-full w-full font-medium text-gray-200 group-hover:text-white transition-colors">
                          {asset.name}
                        </Link>
                      </td>
                      <td className="p-0 hidden sm:table-cell">
                        <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 h-full w-full text-gray-400">
                          {asset.sector || '—'}
                        </Link>
                      </td>
                      <td className="p-0">
                        <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 h-full w-full text-gray-400">
                          {asset.market || '—'}
                        </Link>
                      </td>
                      <td className="p-0 text-right">
                        <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 h-full w-full font-mono text-gray-200">
                          {asset.last_price !== null && asset.last_price !== undefined
                            ? `${Number(asset.last_price).toFixed(2)} €`
                            : '—'}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 border border-gray-800 rounded-lg bg-[#0A0A0A] text-center">
            <FolderSearch className="w-12 h-12 text-gray-600 mb-4" />
            <h2 className="text-lg font-medium text-gray-200 mb-2">
              El mercado está vacío
            </h2>
            <p className="text-gray-400 text-sm max-w-md">
              Aún no hay activos registrados en la base de datos.
              Comienza a poblar el mercado para ver la lista de empresas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
