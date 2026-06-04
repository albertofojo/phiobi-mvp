import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { AlertCircle, FolderOpen } from 'lucide-react'

export const metadata = {
  title: "Market Explorer | PHIOBI",
}

export default async function MarketExplorer() {
  const supabase = await createClient()

  const { data: assets, error } = await supabase
    .from('assets')
    .select('*')
    .eq('is_active', true)
    .order('symbol', { ascending: true })

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-200 font-sans p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Market Explorer</h1>
          <p className="text-sm text-zinc-400 mt-1">Discover and track listed assets across markets.</p>
        </div>

        {error ? (
          <div className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-4 rounded-md border border-red-400/20">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">Failed to load market data.</span>
          </div>
        ) : !assets || assets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 border border-zinc-800 rounded-lg bg-[#0A0A0A] text-center">
            <FolderOpen className="w-8 h-8 text-zinc-600 mb-3" />
            <h3 className="text-sm font-medium text-zinc-300">No assets available</h3>
            <p className="text-sm text-zinc-500 mt-1 max-w-sm">
              The market is currently empty. Assets will appear here once they are added to the database.
            </p>
          </div>
        ) : (
          <div className="border border-zinc-800 rounded-lg overflow-hidden bg-black/50">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs uppercase bg-zinc-900/50 text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Ticker</th>
                  <th scope="col" className="px-4 py-3 font-medium">Company</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden md:table-cell">Sector</th>
                  <th scope="col" className="px-4 py-3 font-medium">Market</th>
                  <th scope="col" className="px-4 py-3 font-medium text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {assets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="hover:bg-zinc-800/30 transition-colors group"
                  >
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 outline-none"
                      >
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700 group-hover:border-zinc-500 transition-colors">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 font-medium text-zinc-200 outline-none"
                      >
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden md:table-cell">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-zinc-400 truncate max-w-[200px] outline-none"
                      >
                        {asset.sector || '-'}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-zinc-400 outline-none"
                      >
                        {asset.market || '-'}
                      </Link>
                    </td>
                    <td className="p-0 text-right">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 font-mono text-zinc-200 outline-none"
                      >
                        {asset.last_price != null ? (
                          <span>
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'EUR'
                            }).format(asset.last_price)}
                          </span>
                        ) : (
                          <span className="text-zinc-600">-</span>
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
