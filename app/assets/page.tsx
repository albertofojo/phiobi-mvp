import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Metadata } from 'next'
import { TrendingUp, FolderOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explora y descubre activos financieros del mercado español.',
}

export default async function AssetsPage() {
  const supabase = await createClient()

  const { data: assets, error } = await supabase
    .from('assets')
    .select('id, symbol, name, sector, market, last_price')
    .order('symbol')

  if (error) {
    console.error('Error fetching assets:', error)
  }

  const hasAssets = assets && assets.length > 0

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
          <TrendingUp className="w-6 h-6 text-gray-400" />
          <h1 className="text-2xl font-medium tracking-tight text-white">Market Explorer</h1>
        </div>

        {/* Content */}
        {!hasAssets ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 border border-dashed border-gray-800 rounded-lg bg-gray-900/20">
            <FolderOpen className="w-12 h-12 text-gray-600 mb-4" strokeWidth={1.5} />
            <h2 className="text-lg font-medium text-gray-300 mb-2">El mercado está vacío</h2>
            <p className="text-sm text-gray-500 max-w-md text-center">
              Aún no hay activos registrados en la base de datos. Los activos españoles (IBEX 35, Mercado Continuo, BME Growth) aparecerán aquí una vez configurados.
            </p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="text-xs uppercase bg-[#0A0A0A] text-gray-500 border-b border-gray-800">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Ticker</th>
                  <th scope="col" className="px-4 py-3 font-medium">Empresa</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden md:table-cell">Sector</th>
                  <th scope="col" className="px-4 py-3 font-medium">Mercado</th>
                  <th scope="col" className="px-4 py-3 font-medium text-right">Precio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {assets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-gray-900/50 transition-colors group">
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-gray-800 text-gray-300 border border-gray-700 group-hover:border-gray-600 group-hover:text-white transition-colors">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-gray-300 group-hover:text-white transition-colors truncate max-w-[150px] md:max-w-none">
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden md:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-gray-500 truncate max-w-[150px] lg:max-w-none">
                        {asset.sector || '—'}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-gray-500">
                        {asset.market || '—'}
                      </Link>
                    </td>
                    <td className="p-0 text-right">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 font-mono text-gray-300">
                        {asset.last_price !== null && asset.last_price !== undefined
                          ? new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(asset.last_price)
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
