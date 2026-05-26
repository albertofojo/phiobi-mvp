import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { AlertCircle, TrendingUp } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explore the latest market assets, stocks, and trends.',
}

export default async function AssetsPage() {
  const supabase = await createClient()
  const { data: assets, error } = await supabase
    .from('assets')
    .select('*')
    .order('symbol', { ascending: true })

  if (error) {
    console.error('Error fetching assets:', error)
  }

  const hasAssets = assets && assets.length > 0

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-300 font-sans p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-100 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-zinc-400" />
              Market Explorer
            </h1>
            <p className="text-sm text-zinc-500 mt-1">Spanish stock market assets (IBEX 35, Mercado Continuo, BME Growth)</p>
          </div>
        </header>

        {!hasAssets ? (
          <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-zinc-800 rounded-lg bg-zinc-900/20">
            <AlertCircle className="w-10 h-10 text-zinc-600 mb-4" />
            <h3 className="text-lg font-medium text-zinc-200">No assets found</h3>
            <p className="text-sm text-zinc-500 max-w-sm mt-2">
              The market is currently empty. Populate the database with stock market assets to start exploring.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-zinc-800 rounded-lg bg-zinc-900/50">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-zinc-500 uppercase bg-zinc-900/80 border-b border-zinc-800">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Ticker</th>
                  <th scope="col" className="px-4 py-3 font-medium">Empresa</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden sm:table-cell">Sector</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden md:table-cell">Mercado</th>
                  <th scope="col" className="px-4 py-3 font-medium text-right">Precio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {assets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-zinc-800/50 transition-colors group">
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 w-full h-full">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-zinc-800 text-zinc-300 group-hover:bg-zinc-700 group-hover:text-zinc-100 transition-colors">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 w-full h-full text-zinc-200 font-medium truncate max-w-[200px] sm:max-w-none">
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden sm:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 w-full h-full text-zinc-400">
                        {asset.sector || '-'}
                      </Link>
                    </td>
                    <td className="p-0 hidden md:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 w-full h-full text-zinc-400">
                        {asset.market || '-'}
                      </Link>
                    </td>
                    <td className="p-0 text-right">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 w-full h-full font-mono text-zinc-200">
                        {asset.last_price ? Number(asset.last_price).toFixed(2) : '-'}
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
