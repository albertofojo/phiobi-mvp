import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Building2, TrendingUp, Inbox } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explore the stock market assets available on PHIOBI.',
}

export default async function AssetsPage() {
  const supabase = await createClient()

  // Fetch assets
  const { data: assets, error } = await supabase
    .from('assets')
    .select('symbol, name, sector, market, last_price, is_active')
    .order('symbol', { ascending: true })

  if (error) {
    console.error('Error fetching assets:', error)
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center space-y-4 text-neutral-400 font-sans bg-[#0A0A0A]">
        <p>Error loading market data. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-4 md:p-8 text-neutral-200 font-sans">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-neutral-400" />
            Market Explorer
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Browse and discover assets across IBEX 35, Mercado Continuo, and BME Growth.
          </p>
        </header>

        {!assets || assets.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/50 py-24 px-6 text-center">
            <Inbox className="h-10 w-10 text-neutral-500 mb-4" />
            <h2 className="text-lg font-medium text-white mb-2">The market is quiet</h2>
            <p className="text-sm text-neutral-400 max-w-sm">
              There are no assets currently tracked in the database. Be the first to populate the market explorer.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-md border border-neutral-800 bg-[#0A0A0A]">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="border-b border-neutral-800 bg-neutral-900/50 text-neutral-400">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Ticker</th>
                  <th scope="col" className="px-4 py-3 font-medium">Company</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden md:table-cell">Sector</th>
                  <th scope="col" className="px-4 py-3 font-medium">Market</th>
                  <th scope="col" className="px-4 py-3 font-medium text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {assets.map((asset) => (
                  <tr
                    key={asset.symbol}
                    className="group transition-colors hover:bg-neutral-800/50"
                  >
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3">
                        <span className="inline-flex items-center rounded bg-neutral-800 px-2 py-0.5 text-xs font-semibold text-neutral-300 group-hover:bg-neutral-700">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-neutral-500" />
                        <span className="font-medium text-neutral-200 truncate max-w-[150px] sm:max-w-xs">{asset.name}</span>
                      </Link>
                    </td>
                    <td className="p-0 hidden md:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-neutral-400">
                        {asset.sector || '—'}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-neutral-400">
                        {asset.market || '—'}
                      </Link>
                    </td>
                    <td className="p-0 text-right">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 font-mono text-neutral-300">
                        {asset.last_price !== null ? (
                          <span>€{asset.last_price.toFixed(2)}</span>
                        ) : (
                          <span className="text-neutral-600">—</span>
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
