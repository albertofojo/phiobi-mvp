import { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { SearchX, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explore the stock market assets available on PHIOBI.',
}

export default async function AssetsPage() {
  const supabase = await createClient()

  const { data: assets, error } = await supabase
    .from('assets')
    .select('*')
    .order('symbol', { ascending: true })

  // Error handling or empty state
  if (error || !assets || assets.length === 0) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] text-neutral-200 p-6 md:p-12 font-sans selection:bg-neutral-800">
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center h-[60vh] border border-neutral-800/50 rounded-xl bg-neutral-900/20">
          <SearchX className="w-12 h-12 text-neutral-600 mb-4" />
          <h2 className="text-xl font-medium text-neutral-300 mb-2">Market Empty</h2>
          <p className="text-sm text-neutral-500 max-w-sm text-center">
            There are currently no assets tracking in the database. Please populate the market data to start exploring.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-neutral-200 p-6 md:p-12 font-sans selection:bg-neutral-800">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex items-center justify-between border-b border-neutral-800 pb-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-500" />
              Market Explorer
            </h1>
            <p className="text-sm text-neutral-400 mt-1">Spanish stock market tracking.</p>
          </div>
        </header>

        <div className="overflow-x-auto rounded-md border border-neutral-800">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-neutral-900/50">
              <tr className="border-b border-neutral-800 text-neutral-400">
                <th className="py-3 px-4 font-medium whitespace-nowrap">Ticker</th>
                <th className="py-3 px-4 font-medium whitespace-nowrap">Company</th>
                <th className="py-3 px-4 font-medium whitespace-nowrap hidden md:table-cell">Sector</th>
                <th className="py-3 px-4 font-medium whitespace-nowrap hidden md:table-cell">Market</th>
                <th className="py-3 px-4 font-medium whitespace-nowrap text-right">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/50 bg-[#0A0A0A]">
              {assets.map((asset) => (
                <tr
                  key={asset.id}
                  className="group hover:bg-neutral-900/50 transition-colors"
                >
                  <td className="p-0">
                    <Link href={`/assets/${asset.symbol}`} className="flex items-center py-3 px-4 w-full h-full">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-800 text-neutral-300 group-hover:bg-neutral-700 transition-colors">
                        {asset.symbol}
                      </span>
                    </Link>
                  </td>
                  <td className="p-0">
                    <Link href={`/assets/${asset.symbol}`} className="flex items-center py-3 px-4 w-full h-full text-neutral-200 group-hover:text-white transition-colors truncate max-w-[200px] sm:max-w-none">
                      {asset.name}
                    </Link>
                  </td>
                  <td className="p-0 hidden md:table-cell">
                    <Link href={`/assets/${asset.symbol}`} className="flex items-center py-3 px-4 w-full h-full text-neutral-500">
                      {asset.sector || '—'}
                    </Link>
                  </td>
                  <td className="p-0 hidden md:table-cell">
                    <Link href={`/assets/${asset.symbol}`} className="flex items-center py-3 px-4 w-full h-full text-neutral-500">
                      {asset.market || '—'}
                    </Link>
                  </td>
                  <td className="p-0">
                    <Link href={`/assets/${asset.symbol}`} className="flex items-center justify-end py-3 px-4 w-full h-full font-mono text-neutral-300">
                      {asset.last_price !== null ? (
                        <>
                          <span className="text-neutral-500 mr-1">€</span>
                          {Number(asset.last_price).toFixed(2)}
                        </>
                      ) : (
                        '—'
                      )}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
