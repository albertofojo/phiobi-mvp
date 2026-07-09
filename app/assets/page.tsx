import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Database } from '@/types/database';
import { AlertCircle, TrendingUp } from 'lucide-react';

export const metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explore Spanish stock market assets on PHIOBI.',
};

type Asset = Database['public']['Tables']['assets']['Row'];

export default async function MarketExplorerPage() {
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
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200 font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-2 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-neutral-400" />
            Market Explorer
          </h1>
          <p className="text-neutral-400 text-sm">
            Track and analyze Spanish stock market assets.
          </p>
        </header>

        {!hasAssets ? (
          <div className="flex flex-col items-center justify-center p-16 border border-neutral-800 rounded-lg bg-neutral-900/50">
            <AlertCircle className="w-12 h-12 text-neutral-500 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No assets found</h3>
            <p className="text-neutral-400 text-sm text-center max-w-md">
              The market is currently empty. Populate the database to start tracking assets and discussions.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-900/20">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-neutral-900/80 border-b border-neutral-800 text-neutral-400">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Ticker</th>
                  <th scope="col" className="px-4 py-3 font-medium">Company</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden sm:table-cell">Sector</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden md:table-cell">Market</th>
                  <th scope="col" className="px-4 py-3 font-medium text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/50">
                {assets.map((asset: Asset) => (
                  <tr
                    key={asset.id}
                    className="group hover:bg-neutral-800/40 transition-colors"
                  >
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3"
                      >
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-800 text-neutral-300 group-hover:bg-neutral-700 transition-colors">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 font-medium text-neutral-200 truncate max-w-[200px] lg:max-w-none"
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
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-right font-mono text-neutral-200"
                      >
                        {asset.last_price !== null ? (
                          <span>€{Number(asset.last_price).toFixed(2)}</span>
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
        )}
      </div>
    </div>
  );
}
