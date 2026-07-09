import { createClient } from '@/lib/supabase/server'
import { Metadata } from 'next'
import Link from 'next/link'
import { CircleOff } from 'lucide-react'

export const metadata: Metadata = {
  title: "Market Explorer | PHIOBI",
}

export default async function AssetsPage() {
  const supabase = await createClient()

  const { data: assets, error } = await supabase
    .from('assets')
    .select('*')
    .order('symbol')

  if (error) {
    console.error('Error fetching assets:', error)
  }

  const hasAssets = assets && assets.length > 0

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200 font-sans p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-xl font-semibold text-neutral-100 tracking-tight">Market Explorer</h1>
          <p className="text-sm text-neutral-400 mt-1">
            Spanish Stock Market Assets
          </p>
        </header>

        {!hasAssets ? (
          <div className="flex flex-col items-center justify-center py-16 border border-neutral-800 rounded-md bg-[#0d0d0d] text-center">
            <CircleOff className="w-8 h-8 text-neutral-600 mb-3" strokeWidth={1.5} />
            <h2 className="text-base font-medium text-neutral-300">Market empty</h2>
            <p className="text-sm text-neutral-500 mt-1 max-w-sm">
              There are currently no assets tracked in the database. Please populate the market to start exploring.
            </p>
          </div>
        ) : (
          <div className="border border-neutral-800 rounded-md overflow-hidden bg-[#0d0d0d]">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400">
                <tr>
                  <th className="font-medium px-4 py-2">Ticker</th>
                  <th className="font-medium px-4 py-2">Company Name</th>
                  <th className="font-medium px-4 py-2 hidden sm:table-cell">Sector</th>
                  <th className="font-medium px-4 py-2">Market</th>
                  <th className="font-medium px-4 py-2 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {assets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-neutral-900/50 transition-colors">
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-2.5">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-neutral-800 text-neutral-300 border border-neutral-700">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-2.5 text-neutral-200 truncate max-w-[150px] sm:max-w-[250px]">
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden sm:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-2.5 text-neutral-400 truncate max-w-[200px]">
                        {asset.sector || '—'}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-2.5 text-neutral-400">
                        {asset.market || '—'}
                      </Link>
                    </td>
                    <td className="p-0 text-right">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-2.5 font-mono text-neutral-200">
                        {asset.last_price !== null && asset.last_price !== undefined
                          ? Number(asset.last_price).toFixed(2)
                          : '—'}
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
