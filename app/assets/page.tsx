import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Metadata } from 'next'
import { TrendingUp, Activity } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explora y analiza activos del mercado de valores español',
}

export default async function AssetsPage() {
  const supabase = await createClient()

  // Fetching assets prioritizing those that are active and ordered by symbol
  const { data: assets, error } = await supabase
    .from('assets')
    .select('*')
    .eq('is_active', true)
    .order('symbol', { ascending: true })

  // Error handling
  if (error) {
    console.error('Error fetching assets:', error)
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-gray-200 p-8 flex items-center justify-center">
        <p className="text-red-400">Error al cargar los activos del mercado. Por favor, inténtalo de nuevo más tarde.</p>
      </div>
    )
  }

  // Empty state
  if (!assets || assets.length === 0) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-gray-200 p-8 flex flex-col items-center justify-center space-y-4">
        <Activity className="w-12 h-12 text-gray-600 mb-2" />
        <h2 className="text-xl font-medium tracking-tight text-gray-300">El mercado está vacío</h2>
        <p className="text-sm text-gray-500 max-w-md text-center">
          Actualmente no hay activos listados en la base de datos. Comienza a poblar el mercado para habilitar las funcionalidades del foro.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-800 pb-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-gray-400" />
              Market Explorer
            </h1>
            <p className="text-sm text-gray-500 mt-1">Explora empresas del IBEX 35, Mercado Continuo y BME Growth.</p>
          </div>
          <div className="mt-4 md:mt-0 text-xs font-mono text-gray-500">
            {assets.length} Activos Listados
          </div>
        </div>

        {/* Dense Financial Table */}
        <div className="overflow-x-auto rounded-md border border-gray-800 bg-[#111]">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-gray-900/50 text-gray-400 border-b border-gray-800">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">Ticker</th>
                <th scope="col" className="px-4 py-3 font-medium">Empresa</th>
                <th scope="col" className="px-4 py-3 font-medium hidden md:table-cell">Sector</th>
                <th scope="col" className="px-4 py-3 font-medium hidden sm:table-cell">Mercado</th>
                <th scope="col" className="px-4 py-3 font-medium text-right">Precio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {assets.map((asset) => (
                <tr
                  key={asset.id}
                  className="hover:bg-gray-800/40 transition-colors group"
                >
                  <td className="p-0">
                    <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700">
                        {asset.symbol}
                      </span>
                    </Link>
                  </td>
                  <td className="p-0">
                    <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 font-medium text-gray-300 group-hover:text-white transition-colors">
                      {asset.name}
                    </Link>
                  </td>
                  <td className="p-0 hidden md:table-cell">
                    <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-gray-500 text-xs truncate max-w-[150px]">
                      {asset.sector || '—'}
                    </Link>
                  </td>
                  <td className="p-0 hidden sm:table-cell">
                    <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-gray-500 text-xs">
                      {asset.market || '—'}
                    </Link>
                  </td>
                  <td className="p-0 text-right">
                    <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 font-mono text-gray-300">
                      {asset.last_price !== null
                        ? `${Number(asset.last_price).toFixed(2)} €`
                        : <span className="text-gray-600">—</span>}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
