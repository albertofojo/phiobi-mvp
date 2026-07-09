import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { ArrowRight, BarChart3, Search } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explore Spanish stock market assets (IBEX 35, Mercado Continuo, BME Growth)',
};

export default async function MarketExplorerPage() {
  const supabase = await createClient();

  const { data: assets, error } = await supabase
    .from('assets')
    .select('symbol, name, sector, market, last_price, is_active')
    .order('symbol', { ascending: true });

  const formatPrice = (price: number | null) => {
    if (price === null) return '-';
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex items-end justify-between border-b border-neutral-800 pb-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-neutral-400" />
              Market Explorer
            </h1>
            <p className="text-sm text-neutral-400 mt-1">
              Spanish Stock Market Assets (IBEX 35, Mercado Continuo, BME Growth)
            </p>
          </div>
          <div className="relative hidden sm:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Filter assets..."
              className="bg-neutral-900 border border-neutral-800 rounded-md py-1.5 pl-9 pr-4 text-sm outline-none focus:border-neutral-600 transition-colors"
              disabled
            />
          </div>
        </header>

        {!assets || assets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-neutral-800 rounded-lg bg-neutral-900/30">
            <BarChart3 className="w-12 h-12 text-neutral-600 mb-4" />
            <h3 className="text-lg font-medium text-neutral-300 mb-2">No assets found</h3>
            <p className="text-sm text-neutral-500 max-w-sm mb-6">
              The market database is currently empty. Assets will appear here once the market data is populated.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-neutral-800 bg-[#0A0A0A]">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Ticker</th>
                  <th scope="col" className="px-4 py-3 font-medium">Company</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden md:table-cell">Sector</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden sm:table-cell">Market</th>
                  <th scope="col" className="px-4 py-3 font-medium text-right">Price</th>
                  <th scope="col" className="px-4 py-3 font-medium w-8"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {assets.map((asset) => (
                  <tr
                    key={asset.symbol}
                    className="hover:bg-neutral-900/50 transition-colors group"
                  >
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3">
                        <span className="inline-flex items-center rounded-sm bg-neutral-800 px-2 py-0.5 text-xs font-mono font-medium text-neutral-300 group-hover:bg-neutral-700 transition-colors">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 font-medium text-neutral-200">
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden md:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-neutral-400">
                        {asset.sector || '-'}
                      </Link>
                    </td>
                    <td className="p-0 hidden sm:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-neutral-400">
                        {asset.market || '-'}
                      </Link>
                    </td>
                    <td className="p-0 text-right">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 font-mono text-neutral-300">
                        {formatPrice(asset.last_price)}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-neutral-600 group-hover:text-neutral-400 transition-colors">
                        <ArrowRight className="w-4 h-4 ml-auto" />
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
