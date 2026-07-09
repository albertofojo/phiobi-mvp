import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Database } from '@/types/database';
import { Database as DatabaseIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
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
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-medium tracking-tight text-neutral-100">Market Explorer</h1>
            <p className="text-sm text-neutral-500 mt-1">Spanish stock market assets and pricing</p>
          </div>
        </header>

        {!hasAssets ? (
          <div className="flex flex-col items-center justify-center py-20 border border-neutral-800 rounded-md bg-[#0A0A0A]">
            <DatabaseIcon className="w-8 h-8 text-neutral-700 mb-4" />
            <h2 className="text-sm font-medium text-neutral-300">No assets found</h2>
            <p className="text-xs text-neutral-500 mt-2 max-w-sm text-center">
              The market database is currently empty. Populate the assets to begin tracking the Spanish stock market.
            </p>
          </div>
        ) : (
          <div className="border border-neutral-800 rounded-md overflow-hidden bg-[#0A0A0A]">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-neutral-900/50 border-b border-neutral-800 text-neutral-500 uppercase tracking-wider text-xs">
                <tr>
                  <th className="font-medium px-4 py-2.5">Ticker</th>
                  <th className="font-medium px-4 py-2.5">Company</th>
                  <th className="font-medium px-4 py-2.5 hidden sm:table-cell">Sector</th>
                  <th className="font-medium px-4 py-2.5">Market</th>
                  <th className="font-medium px-4 py-2.5 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/50">
                {assets.map((asset) => (
                  <tr key={asset.id} className="group hover:bg-neutral-900 transition-colors">
                    <td className="p-0 align-middle">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-2.5">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium bg-neutral-800 text-neutral-300 border border-neutral-700 group-hover:border-neutral-600 transition-colors">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0 align-middle">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-2.5 text-neutral-300 group-hover:text-neutral-100 transition-colors truncate max-w-[150px] sm:max-w-[250px]">
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden sm:table-cell align-middle">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-2.5 text-neutral-500">
                        {asset.sector || '-'}
                      </Link>
                    </td>
                    <td className="p-0 align-middle">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-2.5 text-neutral-500">
                        {asset.market || '-'}
                      </Link>
                    </td>
                    <td className="p-0 align-middle text-right">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-2.5 font-mono text-sm">
                        {asset.last_price !== null ? (
                          <span className="text-neutral-200">{asset.last_price.toFixed(4)}</span>
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
