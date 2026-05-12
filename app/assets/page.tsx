import { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { cn } from '@/lib/utils'
import { ArrowRight, Database } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explora y descubre activos financieros del mercado español.',
}

export default async function AssetsPage() {
  const supabase = await createClient()

  // Fetch all active assets ordered by name
  const { data: assets, error } = await supabase
    .from('assets')
    .select('id, symbol, name, sector, market, last_price, is_active')
    .eq('is_active', true)
    .order('symbol', { ascending: true })

  if (error) {
    console.error('Error fetching assets:', error)
  }

  const hasAssets = assets && assets.length > 0

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        <header>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Market Explorer</h1>
          <p className="text-gray-400 text-sm mt-1">
            Mercado Continuo, IBEX 35 y BME Growth
          </p>
        </header>

        {!hasAssets ? (
          <div className="flex flex-col items-center justify-center py-24 border border-gray-800 border-dashed rounded-lg bg-[#111]">
            <Database className="w-8 h-8 text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-300">No hay activos disponibles</h3>
            <p className="text-sm text-gray-500 mt-2">
              La base de datos aún no ha sido poblada con el mercado.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="border-b border-gray-800 text-gray-500">
                  <th className="py-3 px-4 font-medium w-1/4">Ticker</th>
                  <th className="py-3 px-4 font-medium w-1/3">Empresa</th>
                  <th className="py-3 px-4 font-medium hidden md:table-cell">Sector</th>
                  <th className="py-3 px-4 font-medium hidden sm:table-cell">Mercado</th>
                  <th className="py-3 px-4 font-medium text-right">Precio</th>
                  <th className="py-3 px-4 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {assets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="group hover:bg-[#111] transition-colors duration-200"
                  >
                    <td className="py-3 px-4">
                      <Link href={`/assets/${asset.symbol}`} className="block">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-gray-800 text-gray-200 group-hover:bg-gray-700 transition-colors">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-300 group-hover:text-white transition-colors truncate max-w-[200px]">
                      <Link href={`/assets/${asset.symbol}`} className="block truncate">
                        {asset.name}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-gray-500 hidden md:table-cell truncate max-w-[150px]">
                      <Link href={`/assets/${asset.symbol}`} className="block truncate">
                        {asset.sector || '—'}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-gray-500 hidden sm:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block">
                        {asset.market || '—'}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-gray-300">
                      <Link href={`/assets/${asset.symbol}`} className="block">
                        {asset.last_price !== null && asset.last_price !== undefined
                          ? `€${asset.last_price.toFixed(2)}`
                          : '—'}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link href={`/assets/${asset.symbol}`} className="block text-gray-600 group-hover:text-gray-300 transition-colors">
                        <ArrowRight className="w-4 h-4 inline-block" />
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
