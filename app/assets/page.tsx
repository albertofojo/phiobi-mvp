import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explora y analiza activos del mercado financiero.',
}

export default async function AssetsPage() {
  const supabase = await createClient()

  const { data: assets, error } = await supabase
    .from('assets')
    .select('symbol, name, sector, market, last_price, is_active')
    .eq('is_active', true)
    .order('symbol', { ascending: true })

  if (error) {
    console.error('Error fetching assets:', error)
    // Could display an error state, but empty state handles no data gracefully below
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200 font-sans p-6 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">Market Explorer</h1>
          <p className="text-neutral-400 text-sm">Listado de activos del mercado continuo y BME Growth.</p>
        </header>

        {(!assets || assets.length === 0) ? (
          <div className="flex flex-col items-center justify-center p-12 border border-neutral-800 rounded-lg bg-neutral-900/50">
            <AlertCircle className="w-10 h-10 text-neutral-500 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Mercado Vacío</h3>
            <p className="text-neutral-400 text-sm text-center max-w-sm">
              No hay activos disponibles en este momento. La base de datos necesita ser poblada.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-neutral-800 rounded-md">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-neutral-900/80 text-neutral-400 border-b border-neutral-800">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Ticker</th>
                  <th scope="col" className="px-4 py-3 font-medium">Empresa</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden sm:table-cell">Sector</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden md:table-cell">Mercado</th>
                  <th scope="col" className="px-4 py-3 font-medium text-right">Precio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/50">
                {assets.map((asset) => (
                  <tr
                    key={asset.symbol}
                    className="hover:bg-neutral-800/50 transition-colors group"
                  >
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-800 text-neutral-200 border border-neutral-700 group-hover:border-neutral-500 transition-colors">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 font-medium text-neutral-200">
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden sm:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-neutral-400">
                        {asset.sector || '-'}
                      </Link>
                    </td>
                    <td className="p-0 hidden md:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-neutral-400">
                        {asset.market || '-'}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-right font-mono text-neutral-200">
                        {asset.last_price !== null ? (
                          <span>{Number(asset.last_price).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</span>
                        ) : (
                          <span className="text-neutral-600">-</span>
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
