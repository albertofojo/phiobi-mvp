import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Metadata } from 'next';
import { TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explore Spanish stock market assets on PHIOBI.',
};

export default async function AssetsPage() {
  const supabase = await createClient();
  const { data: assets, error } = await supabase
    .from('assets')
    .select('id, symbol, name, sector, market, last_price')
    .order('symbol');

  if (error) {
    console.error('Error fetching assets:', error);
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200 font-sans p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center space-x-3 border-b border-neutral-800 pb-4">
          <TrendingUp className="w-6 h-6 text-neutral-400" />
          <h1 className="text-2xl font-semibold tracking-tight text-white">Market Explorer</h1>
        </div>

        {!assets || assets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-neutral-800 rounded-lg bg-neutral-900/20">
            <TrendingUp className="w-10 h-10 text-neutral-600 mb-4" />
            <h2 className="text-lg font-medium text-neutral-300 mb-2">No assets found</h2>
            <p className="text-sm text-neutral-500 max-w-md">
              The market is currently empty. Populate the database to start tracking Spanish stock market assets.
            </p>
          </div>
        ) : (
          <div className="border border-neutral-800 rounded-lg overflow-hidden bg-[#0A0A0A]">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-neutral-900/50 border-b border-neutral-800 text-neutral-400 uppercase text-xs tracking-wider">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Ticker</th>
                  <th scope="col" className="px-4 py-3 font-medium">Name</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden md:table-cell">Sector</th>
                  <th scope="col" className="px-4 py-3 font-medium">Market</th>
                  <th scope="col" className="px-4 py-3 font-medium text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/50">
                {assets.map((asset) => (
                  <tr key={asset.id} className="group hover:bg-neutral-900/50 transition-colors">
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-800 text-neutral-200 group-hover:bg-neutral-700 transition-colors">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-neutral-300 group-hover:text-white transition-colors truncate max-w-[200px] sm:max-w-none">
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden md:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-neutral-500">
                        {asset.sector || '—'}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-neutral-500">
                        {asset.market || '—'}
                      </Link>
                    </td>
                    <td className="p-0 text-right">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 font-mono text-neutral-300">
                        {asset.last_price !== null ? (
                          <>
                            €{asset.last_price.toFixed(2)}
                          </>
                        ) : (
                          <span className="text-neutral-600">—</span>
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
