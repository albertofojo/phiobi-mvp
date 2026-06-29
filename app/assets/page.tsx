import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explore assets, tickers, and companies in the Spanish stock market.',
};

export default async function AssetsPage() {
  const supabase = await createClient();
  const { data: assets, error } = await supabase
    .from('assets')
    .select('symbol, name, sector, market, last_price')
    .eq('is_active', true)
    .order('symbol', { ascending: true });

  if (error) {
    console.error('Error fetching assets:', error);
    // You might want to handle this more gracefully in a real app
  }

  const formatPrice = (price: number | null) => {
    if (price === null) return '-';
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 p-4 md:p-8 font-sans selection:bg-gray-800 selection:text-white">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 border-b border-gray-800 pb-4">
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Market Explorer</h1>
          <p className="text-sm text-gray-400">
            Real-time insights and tracking for Spanish equities.
          </p>
        </header>

        {(!assets || assets.length === 0) ? (
          <div className="text-center py-20 border border-dashed border-gray-800 rounded-lg bg-gray-900/20">
            <h3 className="text-lg font-medium text-gray-300 mb-2">Market is empty</h3>
            <p className="text-sm text-gray-500 mb-4 max-w-sm mx-auto">
              There are currently no active assets tracked in the database.
              The market explorer awaits data.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-gray-800 rounded-md bg-[#0A0A0A]">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-900/50 text-gray-400 border-b border-gray-800">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium w-1/4">Ticker</th>
                  <th scope="col" className="px-4 py-3 font-medium w-1/3">Company</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden md:table-cell">Sector</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden sm:table-cell">Market</th>
                  <th scope="col" className="px-4 py-3 font-medium text-right w-1/5">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {assets.map((asset) => (
                  <tr key={asset.symbol} className="hover:bg-gray-800/30 transition-colors group">
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 h-full w-full outline-none focus:bg-gray-800/50">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-gray-800 text-gray-200 border border-gray-700 group-hover:border-gray-500 transition-colors">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 h-full w-full outline-none focus:bg-gray-800/50 text-gray-300 truncate">
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden md:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 h-full w-full outline-none focus:bg-gray-800/50 text-gray-500 truncate">
                        {asset.sector || '-'}
                      </Link>
                    </td>
                    <td className="p-0 hidden sm:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 h-full w-full outline-none focus:bg-gray-800/50 text-gray-500">
                        {asset.market || '-'}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 h-full w-full outline-none focus:bg-gray-800/50 text-right font-mono text-gray-300">
                        {formatPrice(asset.last_price)}
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
