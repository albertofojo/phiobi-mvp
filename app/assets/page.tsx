import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { PackageOpen } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explore the stock market assets on PHIOBI.',
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

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-white tracking-tight">Market Explorer</h1>

        {(!assets || assets.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-24 border border-zinc-800 rounded-lg bg-[#111] text-center">
            <PackageOpen className="w-12 h-12 text-zinc-600 mb-4" strokeWidth={1.5} />
            <h3 className="text-lg font-medium text-zinc-300 mb-2">No assets found</h3>
            <p className="text-zinc-500 text-sm max-w-md">
              The market is currently empty. Assets will appear here once the database is populated with market data.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-zinc-800 rounded-md">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-zinc-500 bg-zinc-900/50 uppercase border-b border-zinc-800">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Ticker</th>
                  <th scope="col" className="px-4 py-3 font-medium">Company</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden md:table-cell">Sector</th>
                  <th scope="col" className="px-4 py-3 font-medium">Market</th>
                  <th scope="col" className="px-4 py-3 font-medium text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50 bg-[#0A0A0A]">
                {assets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-zinc-900/30 transition-colors group">
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3"
                      >
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zinc-800 text-zinc-300 group-hover:bg-zinc-700 transition-colors">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 font-medium text-zinc-200"
                      >
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden md:table-cell">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-zinc-500"
                      >
                        {asset.sector || '-'}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-zinc-400 text-xs"
                      >
                        {asset.market || '-'}
                      </Link>
                    </td>
                    <td className="p-0 text-right">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 font-mono text-zinc-300"
                      >
                        {asset.last_price !== null ? asset.last_price.toFixed(2) : '-'}
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
