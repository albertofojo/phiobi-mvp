import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { TrendingUp, AlertCircle } from 'lucide-react'
import { Database } from '@/types/database'

export const metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explore assets, tickers, and market data.',
}

type Asset = Database['public']['Tables']['assets']['Row']

export default async function AssetsPage() {
  const supabase = await createClient()

  // Fetch active assets, sorted by symbol
  const { data: assets, error } = await supabase
    .from('assets')
    .select('*')
    .eq('is_active', true)
    .order('symbol', { ascending: true })

  if (error) {
    console.error('Error fetching assets:', error)
  }

  const assetList = assets as Asset[] || []

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-neutral-400" />
          <h1 className="text-2xl font-semibold tracking-tight text-white">Market Explorer</h1>
        </header>

        {assetList.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 border border-neutral-800 rounded-lg bg-neutral-900/30">
            <AlertCircle className="w-10 h-10 text-neutral-500 mb-4" />
            <h2 className="text-lg font-medium text-neutral-300 mb-2">No assets found</h2>
            <p className="text-sm text-neutral-500 text-center max-w-sm">
              The market is currently empty. Populate the database to start tracking tickers and market data.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-neutral-800 rounded-lg bg-neutral-900/20">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-neutral-900/50 text-neutral-400 uppercase tracking-wider text-xs font-medium border-b border-neutral-800">
                <tr>
                  <th scope="col" className="px-4 py-3">Ticker</th>
                  <th scope="col" className="px-4 py-3">Company</th>
                  <th scope="col" className="px-4 py-3 hidden md:table-cell">Sector</th>
                  <th scope="col" className="px-4 py-3">Market</th>
                  <th scope="col" className="px-4 py-3 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {assetList.map((asset) => (
                  <tr key={asset.id} className="hover:bg-neutral-800/40 transition-colors group">
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-800 text-neutral-300 border border-neutral-700 group-hover:border-neutral-500 transition-colors">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-neutral-300 font-medium">
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden md:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-neutral-500">
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
                          <span>€{Number(asset.last_price).toFixed(2)}</span>
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
