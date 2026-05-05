import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ArrowRight, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explore and discover assets on the Spanish stock market.',
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
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex items-center justify-between border-b border-gray-800 pb-4">
          <div>
            <h1 className="text-2xl font-medium tracking-tight text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-gray-400" />
              Market Explorer
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Spanish stock market assets (IBEX 35, Mercado Continuo, BME Growth).
            </p>
          </div>
        </header>

        {!hasAssets ? (
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-dashed border-gray-800 rounded-lg bg-[#0f0f0f]">
            <TrendingUp className="w-12 h-12 text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-300 mb-2">No assets found</h3>
            <p className="text-sm text-gray-500 max-w-md">
              The market explorer is currently empty. Assets will appear here once they are populated in the database.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-md border border-gray-800 bg-[#0c0c0c]">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-900/50 text-gray-400 border-b border-gray-800">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Ticker</th>
                  <th scope="col" className="px-4 py-3 font-medium">Company</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden sm:table-cell">Sector</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden md:table-cell">Market</th>
                  <th scope="col" className="px-4 py-3 font-medium text-right">Price</th>
                  <th scope="col" className="px-4 py-3 font-medium text-right sr-only">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {assets.map((asset: any) => (
                  <tr
                    key={asset.id}
                    className="hover:bg-gray-800/30 transition-colors group relative"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Link href={`/assets/${asset.symbol}`} className="absolute inset-0 z-10">
                        <span className="sr-only">View {asset.symbol}</span>
                      </Link>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-gray-800 text-gray-300 border border-gray-700">
                        {asset.symbol}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-200">
                      {asset.name}
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell truncate max-w-[150px]">
                      {asset.sector || '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                      {asset.market || '—'}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-gray-300">
                      {asset.last_price ? (
                        <span>€{Number(asset.last_price).toFixed(2)}</span>
                      ) : (
                        <span className="text-gray-600">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-4 h-4 text-gray-500 inline-block" />
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
