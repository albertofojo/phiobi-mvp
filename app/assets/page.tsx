import { createClient } from '@/lib/supabase/server'
import { Database } from '@/types/database'
import { Metadata } from 'next'
import Link from 'next/link'
import { Building2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explore assets in the stock market.',
}

export default async function AssetsPage() {
  const supabase = await createClient()

  // Fetch assets
  const { data: assets, error } = await supabase
    .from('assets')
    .select('*')
    .order('symbol', { ascending: true })

  if (error) {
    console.error('Error fetching assets:', error)
    return (
      <div className="flex h-screen items-center justify-center bg-[#0A0A0A] text-white font-sans">
        <p className="text-red-500">Failed to load market data.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight text-white">Market Explorer</h1>
          <p className="text-gray-400 text-sm">Browse listed companies and assets.</p>
        </header>

        {!assets || assets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-gray-800 rounded-lg bg-[#0f0f0f]">
            <Building2 className="w-12 h-12 text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-200 mb-1">No assets found</h3>
            <p className="text-gray-500 text-sm max-w-sm">
              The market is currently empty. Assets will appear here once they are added to the database.
            </p>
          </div>
        ) : (
          <div className="border border-gray-800 rounded-lg overflow-hidden bg-[#0f0f0f]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#1a1a1a] border-b border-gray-800 text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium">Ticker</th>
                    <th scope="col" className="px-4 py-3 font-medium">Company</th>
                    <th scope="col" className="px-4 py-3 font-medium hidden md:table-cell">Sector</th>
                    <th scope="col" className="px-4 py-3 font-medium">Market</th>
                    <th scope="col" className="px-4 py-3 font-medium text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {assets.map((asset) => (
                    <tr
                      key={asset.id}
                      className="group hover:bg-[#1a1a1a] transition-colors"
                    >
                      <td className="p-0">
                        <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3">
                          <span className="inline-flex items-center rounded-md bg-gray-800/50 px-2 py-1 text-xs font-medium text-gray-300 ring-1 ring-inset ring-gray-700/50 font-mono">
                            {asset.symbol}
                          </span>
                        </Link>
                      </td>
                      <td className="p-0">
                        <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-gray-200 font-medium">
                          {asset.name}
                        </Link>
                      </td>
                      <td className="p-0 hidden md:table-cell">
                        <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-gray-400">
                          {asset.sector || '—'}
                        </Link>
                      </td>
                      <td className="p-0">
                        <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-gray-400">
                          {asset.market || '—'}
                        </Link>
                      </td>
                      <td className="p-0 text-right">
                        <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 font-mono text-gray-200">
                          {asset.last_price !== null ? (
                            <span>
                              {Number(asset.last_price).toLocaleString('es-ES', {
                                style: 'currency',
                                currency: 'EUR',
                              })}
                            </span>
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
          </div>
        )}
      </div>
    </div>
  )
}
