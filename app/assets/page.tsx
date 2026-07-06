import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Metadata } from 'next'
import { AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explore active market assets on PHIOBI',
}

export default async function AssetsPage() {
  const supabase = await createClient()

  const { data: assets, error } = await supabase
    .from('assets')
    .select('id, symbol, name, sector, market, last_price')
    .eq('is_active', true)
    .order('symbol', { ascending: true })

  if (error) {
    console.error('Error fetching assets:', error)
  }

  const hasAssets = assets && assets.length > 0

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Market Explorer</h1>
          <p className="text-sm text-gray-400 mt-1">
            Browse and discover active market assets.
          </p>
        </div>

        {!hasAssets ? (
          <div className="flex flex-col items-center justify-center p-12 border border-gray-800 rounded-lg bg-[#111111] text-center">
            <AlertCircle className="w-10 h-10 text-gray-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-200">No assets found</h3>
            <p className="text-sm text-gray-400 mt-2 max-w-sm">
              The market is currently empty. Assets will appear here once they are added to the database.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-gray-800 rounded-lg">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-gray-400 uppercase bg-[#111111] border-b border-gray-800">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Ticker</th>
                  <th scope="col" className="px-4 py-3 font-medium">Name</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden sm:table-cell">Sector</th>
                  <th scope="col" className="px-4 py-3 font-medium">Market</th>
                  <th scope="col" className="px-4 py-3 font-medium text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {assets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="hover:bg-[#1A1A1A] transition-colors group"
                  >
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-200 border border-gray-700">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 font-medium text-gray-200 truncate max-w-[150px] sm:max-w-[200px]">
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden sm:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-gray-400 truncate max-w-[150px]">
                        {asset.sector || '-'}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-gray-400">
                        {asset.market || '-'}
                      </Link>
                    </td>
                    <td className="p-0 text-right">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 font-mono text-gray-200">
                        {asset.last_price !== null && asset.last_price !== undefined
                          ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(asset.last_price)
                          : '-'}
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
