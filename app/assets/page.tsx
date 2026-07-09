import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { AlertCircle, TrendingUp } from 'lucide-react'

export const metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explore active stock market assets',
}

export default async function MarketExplorer() {
  const supabase = await createClient()

  // Fetch active assets, sorted by symbol
  const { data: assets, error } = await supabase
    .from('assets')
    .select('id, symbol, name, sector, market, last_price')
    .eq('is_active', true)
    .order('symbol', { ascending: true })

  if (error) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center text-red-500">
        <AlertCircle className="mb-2 h-8 w-8" />
        <p>Error loading market data. Please try again later.</p>
      </div>
    )
  }

  const hasAssets = assets && assets.length > 0

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-4 font-sans text-gray-200 sm:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-semibold text-white">
              <TrendingUp className="h-6 w-6 text-gray-400" />
              Market Explorer
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              Discover and analyze listed assets.
            </p>
          </div>
        </header>

        {!hasAssets ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-gray-800 bg-gray-900/50">
            <TrendingUp className="mb-4 h-10 w-10 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-300">Market is Empty</h3>
            <p className="mt-2 text-sm text-gray-500">
              No assets available yet. The market is waiting to be populated.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-md border border-gray-800">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="bg-gray-900 text-xs font-medium uppercase tracking-wider text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">Ticker</th>
                  <th scope="col" className="px-4 py-3">Company</th>
                  <th scope="col" className="hidden px-4 py-3 sm:table-cell">Sector</th>
                  <th scope="col" className="hidden px-4 py-3 md:table-cell">Market</th>
                  <th scope="col" className="px-4 py-3 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {assets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="group transition-colors hover:bg-gray-800/50"
                  >
                    <td className="whitespace-nowrap p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3"
                      >
                        <span className="rounded bg-gray-800 px-2 py-1 text-xs font-semibold text-gray-200 group-hover:bg-gray-700">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 font-medium text-gray-100"
                      >
                        {asset.name}
                      </Link>
                    </td>
                    <td className="hidden p-0 sm:table-cell">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-gray-400"
                      >
                        {asset.sector || '—'}
                      </Link>
                    </td>
                    <td className="hidden p-0 md:table-cell">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-gray-400"
                      >
                        {asset.market || '—'}
                      </Link>
                    </td>
                    <td className="p-0 text-right">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 font-mono"
                      >
                        {asset.last_price != null ? (
                          <span>€{asset.last_price.toFixed(2)}</span>
                        ) : (
                          <span className="text-gray-600">—</span>
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
  )
}
