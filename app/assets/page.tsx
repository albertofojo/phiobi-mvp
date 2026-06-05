import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Database } from '@/types/database';
import { TrendingUp, FolderPlus } from 'lucide-react';

export const metadata: Metadata = {
  title: "Market Explorer | PHIOBI",
  description: "Explore Spanish stock market assets on PHIOBI.",
};

type Asset = Database['public']['Tables']['assets']['Row'];

export default async function MarketExplorer() {
  const supabase = await createClient();

  const { data: assets, error } = await supabase
    .from('assets')
    .select('*')
    .eq('is_active', true)
    .order('symbol', { ascending: true });

  if (error) {
    console.error('Error fetching assets:', error);
    return (
      <div className="flex h-[50vh] items-center justify-center text-red-500">
        Error loading market data. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 font-sans p-4 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-white flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-emerald-500" />
              Market Explorer
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Tracking Spanish market assets (IBEX 35, Mercado Continuo, BME Growth).
            </p>
          </div>
        </header>

        {!assets || assets.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-gray-800 bg-gray-900/50 py-24 text-center">
            <FolderPlus className="mb-4 h-12 w-12 text-gray-500" />
            <h3 className="text-lg font-medium text-white">No assets found</h3>
            <p className="mt-2 max-w-sm text-sm text-gray-400">
              The market is currently empty. Assets will appear here once they are added to the database.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-md border border-gray-800 bg-[#0F0F0F]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#141414] border-b border-gray-800 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  <tr>
                    <th scope="col" className="px-4 py-3">Ticker</th>
                    <th scope="col" className="px-4 py-3">Company</th>
                    <th scope="col" className="px-4 py-3 hidden sm:table-cell">Sector</th>
                    <th scope="col" className="px-4 py-3 hidden md:table-cell">Market</th>
                    <th scope="col" className="px-4 py-3 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {assets.map((asset) => (
                    <tr
                      key={asset.id}
                      className="group hover:bg-[#1A1A1A] transition-colors"
                    >
                      <td className="p-0">
                        <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3">
                          <span className="inline-flex items-center rounded-sm bg-gray-800 px-2 py-0.5 text-xs font-medium text-gray-200 group-hover:bg-gray-700 transition-colors">
                            {asset.symbol}
                          </span>
                        </Link>
                      </td>
                      <td className="p-0">
                        <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-gray-300 group-hover:text-white transition-colors">
                          {asset.name}
                        </Link>
                      </td>
                      <td className="p-0 hidden sm:table-cell">
                        <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-gray-500">
                          {asset.sector || '—'}
                        </Link>
                      </td>
                      <td className="p-0 hidden md:table-cell">
                        <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-gray-500">
                          {asset.market || '—'}
                        </Link>
                      </td>
                      <td className="p-0 text-right font-mono">
                        <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-gray-300 group-hover:text-emerald-400 transition-colors">
                          {asset.last_price !== null ? asset.last_price.toFixed(4) : '—'}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
