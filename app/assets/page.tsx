import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Database } from '@/types/database';

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explora y descubre activos del Mercado Continuo y BME Growth.',
};

export default async function AssetsPage() {
  const supabase = await createClient();

  const { data: assets, error } = await supabase
    .from('assets')
    .select('symbol, name, sector, market, last_price')
    .eq('is_active', true)
    .order('symbol');

  if (error) {
    console.error('Error fetching assets:', error);
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-100 font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">Market Explorer</h1>
          <p className="text-sm text-gray-400">Descubre y analiza empresas del mercado español.</p>
        </header>

        {(!assets || assets.length === 0) ? (
          <div className="border border-gray-800 rounded-lg p-12 text-center bg-[#111]">
            <p className="text-gray-400 text-sm mb-4">No hay activos disponibles en este momento.</p>
            <p className="text-gray-500 text-xs">El mercado está esperando a ser poblado.</p>
          </div>
        ) : (
          <div className="border border-gray-800 rounded-md overflow-hidden bg-[#0A0A0A]">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="text-xs uppercase bg-[#111] text-gray-400 border-b border-gray-800">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Ticker</th>
                  <th scope="col" className="px-4 py-3 font-medium">Empresa</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden md:table-cell">Sector</th>
                  <th scope="col" className="px-4 py-3 font-medium">Mercado</th>
                  <th scope="col" className="px-4 py-3 font-medium text-right">Precio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {assets.map((asset) => (
                  <tr
                    key={asset.symbol}
                    className="hover:bg-[#161616] transition-colors group"
                  >
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 h-full w-full">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-200 border border-gray-700">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 h-full w-full font-medium text-gray-200 group-hover:text-white transition-colors">
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden md:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 h-full w-full text-gray-400">
                        {asset.sector || '-'}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 h-full w-full text-gray-400">
                        {asset.market || '-'}
                      </Link>
                    </td>
                    <td className="p-0 text-right">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 h-full w-full font-mono text-gray-300">
                        {asset.last_price !== null ? (
                          <span>{Number(asset.last_price).toFixed(2)} €</span>
                        ) : (
                          <span className="text-gray-600">-</span>
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
