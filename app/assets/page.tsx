import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explore market assets in PHIOBI, the investor-first forum.',
};

export default async function AssetsPage() {
  const supabase = await createClient();
  const { data: assets, error } = await supabase
    .from('assets')
    .select('symbol, name, sector, market, last_price')
    .order('symbol', { ascending: true });

  if (error) {
    console.error('Error fetching assets:', error);
  }

  const hasAssets = assets && assets.length > 0;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200 p-4 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">Market Explorer</h1>
          <p className="text-neutral-400 mt-1 text-sm">
            Track and explore assets on the Spanish stock market.
          </p>
        </header>

        {!hasAssets ? (
          <div className="border border-neutral-800 rounded-md p-12 text-center bg-neutral-900/50">
            <h2 className="text-lg font-medium mb-2">No assets found</h2>
            <p className="text-neutral-400 text-sm">
              The market is currently empty. Please populate the database to start exploring.
            </p>
          </div>
        ) : (
          <div className="border border-neutral-800 rounded-md overflow-hidden bg-neutral-900/20">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Ticker</th>
                  <th scope="col" className="px-4 py-3 font-medium">Company</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden sm:table-cell">Sector</th>
                  <th scope="col" className="px-4 py-3 font-medium">Market</th>
                  <th scope="col" className="px-4 py-3 font-medium text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {assets.map((asset) => (
                  <tr key={asset.symbol} className="hover:bg-neutral-800/50 transition-colors group">
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-800 text-neutral-200 border border-neutral-700 group-hover:border-neutral-500 transition-colors">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 font-medium text-neutral-200">
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden sm:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-neutral-400">
                        {asset.sector || '-'}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-neutral-400">
                        {asset.market || '-'}
                      </Link>
                    </td>
                    <td className="p-0 text-right">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 font-mono">
                        {asset.last_price !== null ? (
                          <span>{asset.last_price.toFixed(2)}€</span>
                        ) : (
                          <span className="text-neutral-500">-</span>
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
