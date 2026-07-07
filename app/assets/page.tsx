import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { TrendingUp, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explora y descubre activos financieros del mercado.',
};

export default async function AssetsPage() {
  const supabase = await createClient();

  const { data: assets, error } = await supabase
    .from('assets')
    .select('*')
    .order('symbol', { ascending: true });

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-gray-200 flex items-center justify-center p-4">
        <div className="flex flex-col items-center text-center space-y-4 max-w-md">
          <AlertCircle className="w-8 h-8 text-red-500" />
          <h2 className="text-xl font-medium font-sans">Error al cargar el mercado</h2>
          <p className="text-sm text-gray-500 font-sans">{error.message}</p>
        </div>
      </div>
    );
  }

  const isEmpty = !assets || assets.length === 0;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">

        <header className="space-y-2">
          <h1 className="text-3xl font-medium tracking-tight text-gray-100 flex items-center gap-3">
            <TrendingUp className="w-7 h-7 text-gray-400" />
            Market Explorer
          </h1>
          <p className="text-gray-500 text-sm">
            Cotizaciones del Mercado Continuo y BME Growth.
          </p>
        </header>

        {isEmpty ? (
          <div className="border border-neutral-800 bg-neutral-900/50 rounded-lg p-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-300">El mercado está vacío</h3>
            <p className="text-sm text-gray-500 max-w-sm">
              Actualmente no hay activos en la base de datos. Añade empresas al mercado para comenzar a rastrearlas.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-md border border-neutral-800">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-900/80 text-gray-400">
                  <th className="font-medium p-4 whitespace-nowrap">Ticker</th>
                  <th className="font-medium p-4">Empresa</th>
                  <th className="font-medium p-4 hidden md:table-cell">Sector</th>
                  <th className="font-medium p-4">Mercado</th>
                  <th className="font-medium p-4 text-right">Precio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800 bg-[#0A0A0A]">
                {assets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="hover:bg-neutral-900/50 transition-colors group"
                  >
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block p-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-neutral-800 text-gray-300 border border-neutral-700 group-hover:border-neutral-500 transition-colors">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block p-4 text-gray-300 font-medium truncate max-w-[150px] md:max-w-none">
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden md:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block p-4 text-gray-500 truncate max-w-[200px]">
                        {asset.sector || '—'}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block p-4 text-gray-400 whitespace-nowrap">
                        {asset.market || '—'}
                      </Link>
                    </td>
                    <td className="p-0 text-right">
                      <Link href={`/assets/${asset.symbol}`} className="block p-4 font-mono text-gray-300">
                        {asset.last_price !== null ? (
                          <span>
                            {Number(asset.last_price).toLocaleString('es-ES', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 4
                            })}
                            <span className="text-gray-500 ml-1 text-xs">€</span>
                          </span>
                        ) : (
                          <span className="text-gray-600">—</span>
                        )}
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
