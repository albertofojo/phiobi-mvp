import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ArrowRight, Activity } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explora y descubre activos del mercado bursátil en PHIOBI.',
};

export default async function MarketExplorerPage() {
  const supabase = await createClient();
  const { data: assets, error } = await supabase
    .from('assets')
    .select('*')
    .eq('is_active', true)
    .order('symbol');

  if (error) {
    console.error('Error fetching assets:', error);
  }

  const hasAssets = assets && assets.length > 0;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-800 pb-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-neutral-400" />
              Market Explorer
            </h1>
            <p className="text-sm text-neutral-400 mt-1">
              Directorio de activos de la bolsa española
            </p>
          </div>
        </header>

        {!hasAssets ? (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-neutral-800 rounded-lg bg-neutral-900/20">
            <Activity className="w-10 h-10 text-neutral-600 mb-4" />
            <h2 className="text-lg font-medium text-neutral-300">Mercado sin activos</h2>
            <p className="text-sm text-neutral-500 mt-2 max-w-sm">
              Actualmente no hay empresas registradas en la base de datos.
              Por favor, inicia la sincronización del mercado para poblar el directorio.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-neutral-800 rounded-md bg-[#0D0D0D]">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 bg-[#0A0A0A]">
                  <th className="font-medium p-0">
                    <div className="px-4 py-3">Ticker</div>
                  </th>
                  <th className="font-medium p-0">
                    <div className="px-4 py-3">Nombre de la Empresa</div>
                  </th>
                  <th className="font-medium p-0 hidden sm:table-cell">
                    <div className="px-4 py-3">Sector</div>
                  </th>
                  <th className="font-medium p-0 hidden md:table-cell">
                    <div className="px-4 py-3">Mercado</div>
                  </th>
                  <th className="font-medium p-0 text-right">
                    <div className="px-4 py-3">Precio</div>
                  </th>
                  <th className="font-medium p-0 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/50">
                {assets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="group hover:bg-neutral-800/30 transition-colors"
                  >
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3"
                      >
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-800 text-neutral-300 border border-neutral-700 font-mono">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 font-medium text-neutral-200 group-hover:text-white transition-colors"
                      >
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden sm:table-cell">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-neutral-400"
                      >
                        {asset.sector || '-'}
                      </Link>
                    </td>
                    <td className="p-0 hidden md:table-cell">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-neutral-400"
                      >
                        {asset.market || '-'}
                      </Link>
                    </td>
                    <td className="p-0 text-right font-mono">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3"
                      >
                        {asset.last_price !== null ? (
                          <span className="text-neutral-200">
                            {Number(asset.last_price).toFixed(2)}€
                          </span>
                        ) : (
                          <span className="text-neutral-600">-</span>
                        )}
                      </Link>
                    </td>
                    <td className="p-0 text-right">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3"
                      >
                        <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-neutral-300 transition-colors inline-block" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
