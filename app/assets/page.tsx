import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { TrendingUp, Activity } from 'lucide-react'

export const metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Listado de activos y valores del mercado bursátil',
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
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-zinc-400" />
            Market Explorer
          </h1>
          <p className="text-zinc-400 mt-2 text-sm">Explora empresas del Mercado Continuo y BME Growth.</p>
        </header>

        {!hasAssets ? (
          <div className="flex flex-col items-center justify-center py-24 border border-zinc-800/50 rounded-lg bg-zinc-900/20">
            <TrendingUp className="w-12 h-12 text-zinc-600 mb-4" />
            <h2 className="text-lg font-medium text-zinc-300">Mercado vacío</h2>
            <p className="text-zinc-500 mt-2 text-sm text-center max-w-sm">
              Aún no hay activos en la base de datos. Comienza a poblar el mercado para ver la lista de empresas.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-md border border-zinc-800">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-zinc-400 bg-zinc-900 border-b border-zinc-800 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 font-medium">Ticker</th>
                  <th className="px-4 py-3 font-medium">Empresa</th>
                  <th className="px-4 py-3 font-medium hidden md:table-cell">Sector</th>
                  <th className="px-4 py-3 font-medium">Mercado</th>
                  <th className="px-4 py-3 font-medium text-right">Precio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 bg-[#0A0A0A]">
                {assets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-zinc-900/50 transition-colors group">
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-zinc-800 text-zinc-300 group-hover:bg-zinc-700 transition-colors">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-zinc-200 font-medium">
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden md:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-zinc-400">
                        {asset.sector || '-'}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-zinc-400">
                        {asset.market || '-'}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-right font-mono text-zinc-300">
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
