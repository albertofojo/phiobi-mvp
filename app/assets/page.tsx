import { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
}

export default async function AssetsPage() {
  const supabase = await createClient()

  const { data: assets } = await supabase
    .from('assets')
    .select('id, symbol, name, sector, market, last_price')
    .order('symbol', { ascending: true })

  const assetsList = assets || []

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-neutral-100 tracking-tight">Market Explorer</h1>
          <p className="text-neutral-400 mt-1 text-sm">
            Activos financieros del mercado. Selecciona un ticker para ver los detalles.
          </p>
        </header>

        {assetsList.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 border border-neutral-800/50 rounded-lg bg-neutral-900/20">
            <TrendingUp className="w-8 h-8 text-neutral-500 mb-3" />
            <h3 className="text-base font-medium text-neutral-300">Mercado vacío</h3>
            <p className="text-neutral-500 mt-1 text-sm text-center max-w-sm">
              Aún no hay activos registrados. Añade activos a la base de datos para comenzar a explorar el mercado.
            </p>
          </div>
        ) : (
          <div className="border border-neutral-800 rounded-lg bg-neutral-900/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-neutral-900/50 text-neutral-400 border-b border-neutral-800">
                  <tr>
                    <th className="px-4 py-3 font-medium">Ticker</th>
                    <th className="px-4 py-3 font-medium">Empresa</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Sector</th>
                    <th className="px-4 py-3 font-medium hidden sm:table-cell">Mercado</th>
                    <th className="px-4 py-3 font-medium text-right">Precio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/50">
                  {assetsList.map((asset) => (
                    <tr
                      key={asset.id}
                      className="hover:bg-neutral-800/40 transition-colors group"
                    >
                      <td className="p-0">
                        <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3">
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-mono font-medium bg-neutral-800/80 text-neutral-300 group-hover:bg-neutral-700 group-hover:text-white transition-colors">
                            {asset.symbol}
                          </span>
                        </Link>
                      </td>
                      <td className="p-0">
                        <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 font-medium text-neutral-200 group-hover:text-white transition-colors">
                          {asset.name}
                        </Link>
                      </td>
                      <td className="p-0 hidden md:table-cell">
                        <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-neutral-400 group-hover:text-neutral-300 transition-colors">
                          {asset.sector || '-'}
                        </Link>
                      </td>
                      <td className="p-0 hidden sm:table-cell">
                        <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-neutral-400 group-hover:text-neutral-300 transition-colors">
                          {asset.market || '-'}
                        </Link>
                      </td>
                      <td className="p-0">
                        <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-right font-mono text-neutral-300 group-hover:text-white transition-colors">
                          {asset.last_price !== null && asset.last_price !== undefined ? (
                            <span>
                              {Number(asset.last_price).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                            </span>
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
          </div>
        )}
      </div>
    </div>
  )
}
