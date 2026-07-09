import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Metadata } from 'next';
import { TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explore the Spanish stock market assets on PHIOBI.',
};

export default async function MarketExplorer() {
  const supabase = await createClient();
  const { data: assets, error } = await supabase
    .from('assets')
    .select('*')
    .order('symbol', { ascending: true });

  if (error) {
    console.error('Error fetching assets:', error);
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex items-center justify-between border-b border-gray-800 pb-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-500" />
              Market Explorer
            </h1>
            <p className="text-gray-400 text-sm mt-1">Spanish Stock Market Assets</p>
          </div>
        </header>

        {(!assets || assets.length === 0) ? (
          <div className="text-center py-20 border border-gray-800 rounded-lg bg-gray-900/30">
            <TrendingUp className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No assets found</h2>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              The market database is currently empty. Assets will appear here once populated.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-gray-800 rounded-lg">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-900/80 border-b border-gray-800 text-xs uppercase tracking-wider text-gray-400">
                  <th className="font-medium p-4">Ticker</th>
                  <th className="font-medium p-4">Company</th>
                  <th className="font-medium p-4 hidden md:table-cell">Sector</th>
                  <th className="font-medium p-4">Market</th>
                  <th className="font-medium p-4 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {assets.map((asset) => (
                  <tr key={asset.id} className="group hover:bg-gray-800/50 transition-colors">
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block p-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-200 border border-gray-700 group-hover:border-gray-500 transition-colors">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block p-4 font-medium text-gray-200">
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden md:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block p-4 text-sm text-gray-400">
                        {asset.sector || '-'}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block p-4 text-sm text-gray-400">
                        {asset.market || '-'}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block p-4 text-right font-mono text-sm">
                        {asset.last_price !== null ? (
                          <span>€{Number(asset.last_price).toFixed(2)}</span>
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
