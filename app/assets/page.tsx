import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Market Explorer | PHIOBI',
};

export default async function AssetsPage() {
  const supabase = await createClient();

  const { data: assets, error } = await supabase
    .from('assets')
    .select('symbol, name, sector, market, last_price, is_active')
    .eq('is_active', true)
    .order('symbol');

  if (error) {
    console.error('Error fetching assets:', error);
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-gray-200 p-8">
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center py-20 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="text-xl font-medium mb-2">Error loading market data</h2>
          <p className="text-gray-400">Please try again later.</p>
        </div>
      </div>
    );
  }

  const hasAssets = assets && assets.length > 0;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 font-sans p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-1">Market Explorer</h1>
          <p className="text-sm text-gray-400">Browse and analyze listed companies</p>
        </header>

        {!hasAssets ? (
          <div className="border border-neutral-800 rounded-md bg-neutral-900/50 flex flex-col items-center justify-center py-20 text-center">
            <AlertCircle className="w-10 h-10 text-neutral-500 mb-4" />
            <h2 className="text-lg font-medium text-neutral-300 mb-2">No assets found</h2>
            <p className="text-sm text-neutral-500 max-w-md">
              The market database is currently empty. Assets will appear here once they are populated.
            </p>
          </div>
        ) : (
          <div className="border border-neutral-800 rounded-md overflow-hidden bg-neutral-900/30">
            <table className="w-full text-sm text-left">
              <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-4 py-3 font-medium">Ticker</th>
                  <th className="px-4 py-3 font-medium">Company</th>
                  <th className="px-4 py-3 font-medium hidden md:table-cell">Sector</th>
                  <th className="px-4 py-3 font-medium hidden sm:table-cell">Market</th>
                  <th className="px-4 py-3 font-medium text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {assets.map((asset) => (
                  <tr
                    key={asset.symbol}
                    className="hover:bg-neutral-800/50 transition-colors group"
                  >
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3"
                      >
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-800 text-neutral-300 group-hover:bg-neutral-700 transition-colors font-mono">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-neutral-200 font-medium truncate max-w-[150px] sm:max-w-xs"
                      >
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden md:table-cell">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-neutral-500 truncate max-w-[120px]"
                      >
                        {asset.sector || '-'}
                      </Link>
                    </td>
                    <td className="p-0 hidden sm:table-cell">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-neutral-500 truncate"
                      >
                        {asset.market || '-'}
                      </Link>
                    </td>
                    <td className="p-0 text-right">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 font-mono text-neutral-300"
                      >
                        {asset.last_price !== null && asset.last_price !== undefined
                          ? asset.last_price.toFixed(2)
                          : '-'}
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
