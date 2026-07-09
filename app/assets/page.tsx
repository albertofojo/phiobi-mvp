import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { TrendingUp, PackageSearch } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explore the market assets',
};

export default async function AssetsPage() {
  const supabase = await createClient();
  const { data: assets, error } = await supabase
    .from('assets')
    .select('*')
    .order('symbol', { ascending: true });

  if (error) {
    console.error('Error fetching assets:', error);
  }

  const hasAssets = assets && assets.length > 0;

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-gray-200 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex items-center gap-3">
          <TrendingUp className="text-emerald-500 w-8 h-8" />
          <h1 className="text-3xl font-semibold text-white tracking-tight">Market Explorer</h1>
        </header>

        {!hasAssets ? (
          <div className="flex flex-col items-center justify-center p-16 border border-gray-800 rounded-lg bg-[#111] text-center">
            <PackageSearch className="w-16 h-16 text-gray-600 mb-4" />
            <h2 className="text-xl font-medium text-white mb-2">No assets found</h2>
            <p className="text-gray-400 max-w-md">
              The market is currently empty. Be the first to add assets and start tracking your favorite companies.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-gray-800 rounded-lg bg-[#111]">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#1a1a1a] border-b border-gray-800 text-gray-400 font-medium">
                <tr>
                  <th scope="col" className="px-4 py-3">Ticker</th>
                  <th scope="col" className="px-4 py-3">Company</th>
                  <th scope="col" className="px-4 py-3 hidden sm:table-cell">Market</th>
                  <th scope="col" className="px-4 py-3 hidden md:table-cell">Sector</th>
                  <th scope="col" className="px-4 py-3 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {assets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="hover:bg-[#1a1a1a] transition-colors group"
                  >
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3"
                      >
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700 group-hover:bg-gray-700 group-hover:text-white transition-colors">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-gray-300 font-medium group-hover:text-white transition-colors truncate max-w-[150px] sm:max-w-none"
                      >
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden sm:table-cell">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-gray-500"
                      >
                        {asset.market || '-'}
                      </Link>
                    </td>
                    <td className="p-0 hidden md:table-cell">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-gray-500"
                      >
                        {asset.sector || '-'}
                      </Link>
                    </td>
                    <td className="p-0 text-right">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 font-mono text-gray-300"
                      >
                        {asset.last_price !== null ? (
                          <span>
                            {Number(asset.last_price).toLocaleString('es-ES', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                            <span className="text-gray-500 ml-1">€</span>
                          </span>
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
    </main>
  );
}
