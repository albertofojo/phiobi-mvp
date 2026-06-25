import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { TrendingUp } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explore financial assets on the PHIOBI platform.',
}

export default async function AssetsPage() {
  const supabase = await createClient()

  // Fetch active assets from Supabase
  const { data: assets, error } = await supabase
    .from('assets')
    .select('symbol, name, sector, market, last_price')
    .eq('is_active', true)
    .order('symbol')

  if (error) {
    console.error('Error fetching assets:', error)
  }

  const hasAssets = assets && assets.length > 0

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200 font-sans p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Market Explorer</h1>
        </header>

        {!hasAssets ? (
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-neutral-800 rounded-lg bg-neutral-900/50">
            <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-neutral-400" />
            </div>
            <h2 className="text-lg font-medium text-white mb-2">No assets found</h2>
            <p className="text-neutral-400 max-w-sm">
              The market is currently empty. Populate the database with assets to start exploring the market.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-md border border-neutral-800">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-neutral-900 text-neutral-400 border-b border-neutral-800">
                <tr>
                  <th className="px-4 py-3 font-medium">Ticker</th>
                  <th className="px-4 py-3 font-medium">Company Name</th>
                  <th className="px-4 py-3 font-medium hidden sm:table-cell">Sector</th>
                  <th className="px-4 py-3 font-medium hidden md:table-cell">Market</th>
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
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-800 text-neutral-300 group-hover:bg-neutral-700 transition-colors">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-neutral-300 group-hover:text-white transition-colors truncate max-w-[150px] sm:max-w-none">
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden sm:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-neutral-500">
                        {asset.sector || '-'}
                      </Link>
                    </td>
                    <td className="p-0 hidden md:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-neutral-500">
                        {asset.market || '-'}
                      </Link>
                    </td>
                    <td className="p-0 text-right">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 font-mono text-neutral-300 group-hover:text-white transition-colors">
                        {asset.last_price !== null ? asset.last_price.toFixed(2) : '-'}
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
