import { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
}

export default async function AssetsPage() {
  const supabase = await createClient()

  const { data: assets, error } = await supabase
    .from('assets')
    .select('*')
    .eq('is_active', true)
    .order('symbol', { ascending: true })

  if (error) {
    console.error('Error fetching assets:', error)
  }

  const hasAssets = assets && assets.length > 0

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-white tracking-tight">Market Explorer</h1>
          <p className="text-sm text-gray-400 mt-1">
            Real-time insights on Spanish stock market assets.
          </p>
        </header>

        {!hasAssets ? (
          <div className="flex flex-col items-center justify-center p-16 border border-gray-800 rounded-lg bg-gray-900/50">
            <AlertCircle className="w-8 h-8 text-gray-500 mb-4" />
            <h2 className="text-lg font-medium text-gray-300">No assets found</h2>
            <p className="text-sm text-gray-500 mt-1 text-center max-w-md">
              The market database is currently empty. Assets will appear here once the market data has been populated.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-gray-800 rounded-lg bg-[#0A0A0A]">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-900/50 border-b border-gray-800 text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Ticker</th>
                  <th scope="col" className="px-4 py-3 font-medium">Name</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden md:table-cell">Sector</th>
                  <th scope="col" className="px-4 py-3 font-medium">Market</th>
                  <th scope="col" className="px-4 py-3 font-medium text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {assets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="hover:bg-gray-800/50 transition-colors group"
                  >
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3"
                      >
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-200 group-hover:bg-gray-700 transition-colors">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-gray-300 group-hover:text-white transition-colors truncate max-w-[200px] md:max-w-xs"
                      >
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden md:table-cell">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-gray-500"
                      >
                        {asset.sector || '-'}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-gray-400"
                      >
                        {asset.market || '-'}
                      </Link>
                    </td>
                    <td className="p-0 text-right">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 font-mono text-gray-300 group-hover:text-white transition-colors"
                      >
                        {asset.last_price != null ? (
                          <span>{asset.last_price.toFixed(2)}</span>
                        ) : (
                          <span className="text-gray-600">-</span>
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
