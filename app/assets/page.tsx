import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { TrendingUp, FolderX } from 'lucide-react';

export const metadata = {
  title: "Market Explorer | PHIOBI",
};

export default async function AssetsPage() {
  const supabase = await createClient();

  // Fetch active assets, sorted by symbol
  const { data: assets, error } = await supabase
    .from('assets')
    .select('symbol, name, sector, market, last_price')
    .eq('is_active', true)
    .order('symbol');

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 flex items-center justify-between border-b border-neutral-800 pb-3">
          <div>
            <h1 className="text-xl font-medium tracking-tight text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-neutral-400" />
              Market Explorer
            </h1>
          </div>
        </header>

        {(!assets || assets.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-20 border border-neutral-800 rounded bg-neutral-950/50">
            <FolderX className="w-6 h-6 text-neutral-600 mb-2" />
            <h3 className="text-sm font-medium text-neutral-300">No assets found</h3>
            <p className="text-xs text-neutral-500 mt-1">The market database is currently empty. Please populate the assets.</p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-neutral-800 rounded bg-neutral-950/30">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#111] border-b border-neutral-800 text-neutral-400 text-xs">
                <tr>
                  <th className="px-3 py-2 font-medium">Ticker</th>
                  <th className="px-3 py-2 font-medium">Company</th>
                  <th className="px-3 py-2 font-medium hidden md:table-cell">Sector</th>
                  <th className="px-3 py-2 font-medium">Market</th>
                  <th className="px-3 py-2 font-medium text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/50">
                {assets.map((asset) => (
                  <tr key={asset.symbol} className="hover:bg-neutral-800/40 transition-colors group">
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-3 py-2">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium bg-neutral-800 text-neutral-300 border border-neutral-700 font-mono">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-3 py-2 text-neutral-300 group-hover:text-white transition-colors truncate max-w-[200px] sm:max-w-xs">
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden md:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block px-3 py-2 text-neutral-500 truncate max-w-[150px]">
                        {asset.sector || '-'}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-3 py-2 text-neutral-400 text-xs">
                        {asset.market || '-'}
                      </Link>
                    </td>
                    <td className="p-0 text-right">
                      <Link href={`/assets/${asset.symbol}`} className="block px-3 py-2 font-mono text-neutral-300">
                        {asset.last_price != null ? `€${asset.last_price.toFixed(2)}` : '-'}
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
