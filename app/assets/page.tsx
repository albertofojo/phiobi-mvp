import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { TrendingUp, Info } from 'lucide-react'

export const metadata = {
  title: 'Market Explorer | PHIOBI',
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

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-medium flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gray-400" />
            Market Explorer
          </h1>
        </header>

        <div className="border border-gray-800 rounded-md overflow-hidden bg-[#0A0A0A]">
          {assets && assets.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead className="bg-gray-900/50 border-b border-gray-800 text-gray-400">
                  <tr>
                    <th className="font-medium p-3">Ticker</th>
                    <th className="font-medium p-3">Name</th>
                    <th className="font-medium p-3 hidden sm:table-cell">Sector</th>
                    <th className="font-medium p-3">Market</th>
                    <th className="font-medium p-3 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {assets.map((asset) => (
                    <tr
                      key={asset.id}
                      className="group hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="p-0">
                        <Link href={`/assets/${asset.symbol}`} className="block p-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-gray-800 text-gray-300 group-hover:bg-gray-700">
                            {asset.symbol}
                          </span>
                        </Link>
                      </td>
                      <td className="p-0">
                        <Link href={`/assets/${asset.symbol}`} className="block p-3 text-gray-200 truncate max-w-[150px] sm:max-w-none">
                          {asset.name}
                        </Link>
                      </td>
                      <td className="p-0 hidden sm:table-cell">
                        <Link href={`/assets/${asset.symbol}`} className="block p-3 text-gray-400">
                          {asset.sector || '-'}
                        </Link>
                      </td>
                      <td className="p-0">
                        <Link href={`/assets/${asset.symbol}`} className="block p-3 text-gray-400 text-xs">
                          {asset.market || '-'}
                        </Link>
                      </td>
                      <td className="p-0 text-right">
                        <Link href={`/assets/${asset.symbol}`} className="block p-3 font-mono text-gray-200">
                          {asset.last_price !== null ? asset.last_price.toFixed(4) : '-'}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center space-y-3">
              <Info className="w-8 h-8 text-gray-600" />
              <div className="space-y-1">
                <p className="text-gray-300 font-medium">The market is currently empty</p>
                <p className="text-gray-500 text-sm">Waiting for new assets to be populated in the database.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
