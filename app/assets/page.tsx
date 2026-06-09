import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Browse and discover financial assets.',
};

export default async function AssetsPage() {
  const supabase = await createClient();
  const { data: assets, error } = await supabase
    .from('assets')
    .select('*')
    .order('symbol');

  if (error) {
    console.error('Error fetching assets:', error);
  }

  const hasAssets = assets && assets.length > 0;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 font-sans p-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-zinc-400" />
            Market Explorer
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Browse and discover market assets.
          </p>
        </header>

        {!hasAssets ? (
          <div className="border border-zinc-800 rounded-lg p-12 text-center bg-zinc-900/50">
            <h2 className="text-lg font-medium mb-2">No assets found</h2>
            <p className="text-sm text-zinc-400">
              The market is currently empty. Start by adding some assets to track.
            </p>
          </div>
        ) : (
          <div className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/50">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/80">
                  <th className="font-medium text-zinc-400 p-3">Ticker</th>
                  <th className="font-medium text-zinc-400 p-3">Company</th>
                  <th className="font-medium text-zinc-400 p-3 hidden sm:table-cell">Sector</th>
                  <th className="font-medium text-zinc-400 p-3">Market</th>
                  <th className="font-medium text-zinc-400 p-3 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {assets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="group hover:bg-zinc-800/50 transition-colors"
                  >
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block p-3 font-mono text-zinc-200"
                      >
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block p-3 font-medium text-zinc-200 truncate"
                      >
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden sm:table-cell">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block p-3 text-zinc-400 truncate"
                      >
                        {asset.sector || '—'}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block p-3 text-zinc-400"
                      >
                        {asset.market || '—'}
                      </Link>
                    </td>
                    <td className="p-0 text-right">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block p-3 font-mono text-zinc-200"
                      >
                        {asset.last_price !== null && asset.last_price !== undefined
                          ? asset.last_price.toFixed(2)
                          : '—'}
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
