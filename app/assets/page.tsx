import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { TrendingUp, SearchX } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
};

export default async function AssetsPage() {
  const supabase = await createClient();
  const { data: assets, error } = await supabase
    .from('assets')
    .select('*')
    .order('symbol');

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 flex items-center gap-3">
          <div className="p-2 bg-neutral-900 rounded-lg border border-neutral-800">
            <TrendingUp className="w-5 h-5 text-neutral-400" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white tracking-tight">Market Explorer</h1>
            <p className="text-neutral-400 text-sm mt-1">Explora empresas del mercado español.</p>
          </div>
        </header>

        {(!assets || assets.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 border border-neutral-800 rounded-lg bg-neutral-900/30">
            <SearchX className="w-10 h-10 text-neutral-600 mb-4" />
            <h2 className="text-lg font-medium text-neutral-300">No hay activos disponibles</h2>
            <p className="text-neutral-500 text-sm mt-2 text-center max-w-md">
              El mercado está vacío por el momento. Los datos del IBEX y Mercado Continuo se sincronizarán pronto.
            </p>
          </div>
        ) : (
          <div className="border border-neutral-800 rounded-lg bg-[#0A0A0A] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 bg-neutral-900/40 text-neutral-400">
                    <th className="font-medium p-4 whitespace-nowrap">Ticker</th>
                    <th className="font-medium p-4 whitespace-nowrap">Empresa</th>
                    <th className="font-medium p-4 hidden sm:table-cell whitespace-nowrap">Sector</th>
                    <th className="font-medium p-4 hidden md:table-cell whitespace-nowrap">Mercado</th>
                    <th className="font-medium p-4 text-right whitespace-nowrap">Precio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/50">
                  {assets.map((asset) => (
                    <tr key={asset.id} className="group hover:bg-neutral-900/60 transition-colors">
                      <td className="p-0">
                        <Link href={`/assets/${asset.symbol}`} className="block p-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-800 text-neutral-300 border border-neutral-700 group-hover:bg-neutral-700 transition-colors">
                            {asset.symbol}
                          </span>
                        </Link>
                      </td>
                      <td className="p-0">
                        <Link href={`/assets/${asset.symbol}`} className="block p-4 font-medium text-neutral-200 whitespace-nowrap">
                          {asset.name}
                        </Link>
                      </td>
                      <td className="p-0 hidden sm:table-cell">
                        <Link href={`/assets/${asset.symbol}`} className="block p-4 text-neutral-400 whitespace-nowrap">
                          {asset.sector || '-'}
                        </Link>
                      </td>
                      <td className="p-0 hidden md:table-cell">
                        <Link href={`/assets/${asset.symbol}`} className="block p-4 text-neutral-400 whitespace-nowrap">
                          {asset.market || '-'}
                        </Link>
                      </td>
                      <td className="p-0 text-right">
                        <Link href={`/assets/${asset.symbol}`} className="block p-4 font-mono whitespace-nowrap">
                          {asset.last_price !== null ? (
                            <span className="text-neutral-200">{Number(asset.last_price).toFixed(2)} €</span>
                          ) : (
                            <span className="text-neutral-600">-</span>
                          )}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
