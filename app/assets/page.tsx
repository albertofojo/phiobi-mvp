import { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Database } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explora y descubre activos del mercado español.',
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
    <div className="min-h-screen bg-[#0A0A0A] text-white p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight mb-2">Market Explorer</h1>
          <p className="text-sm text-neutral-400">
            Cotizaciones y análisis de empresas del mercado español.
          </p>
        </header>

        {!hasAssets ? (
          <div className="flex flex-col items-center justify-center p-12 border border-neutral-800 rounded-lg bg-neutral-900/50">
            <Database className="w-12 h-12 text-neutral-600 mb-4" />
            <h2 className="text-lg font-medium text-neutral-200 mb-2">El mercado está vacío</h2>
            <p className="text-sm text-neutral-400 text-center max-w-md">
              Aún no hay activos registrados en la base de datos. Los administradores están poblando el mercado, vuelve pronto.
            </p>
          </div>
        ) : (
          <div className="border border-neutral-800 rounded-lg overflow-hidden bg-neutral-900/30">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-800 bg-neutral-900/50 text-xs uppercase tracking-wider text-neutral-400">
                    <th className="font-medium p-0">
                      <span className="block px-4 py-3">Ticker</span>
                    </th>
                    <th className="font-medium p-0">
                      <span className="block px-4 py-3">Empresa</span>
                    </th>
                    <th className="font-medium p-0 hidden md:table-cell">
                      <span className="block px-4 py-3">Sector</span>
                    </th>
                    <th className="font-medium p-0 hidden sm:table-cell">
                      <span className="block px-4 py-3">Mercado</span>
                    </th>
                    <th className="font-medium p-0 text-right">
                      <span className="block px-4 py-3">Precio</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-neutral-800">
                  {assets.map((asset) => (
                    <tr
                      key={asset.id}
                      className="group hover:bg-neutral-800/50 transition-colors"
                    >
                      <td className="p-0">
                        <Link
                          href={`/assets/${asset.symbol}`}
                          className="block px-4 py-3"
                        >
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-neutral-800 text-neutral-200 group-hover:bg-neutral-700 transition-colors">
                            {asset.symbol}
                          </span>
                        </Link>
                      </td>
                      <td className="p-0">
                        <Link
                          href={`/assets/${asset.symbol}`}
                          className="block px-4 py-3 font-medium text-neutral-200 group-hover:text-white transition-colors"
                        >
                          {asset.name}
                        </Link>
                      </td>
                      <td className="p-0 hidden md:table-cell">
                        <Link
                          href={`/assets/${asset.symbol}`}
                          className="block px-4 py-3 text-neutral-400"
                        >
                          {asset.sector || '-'}
                        </Link>
                      </td>
                      <td className="p-0 hidden sm:table-cell">
                        <Link
                          href={`/assets/${asset.symbol}`}
                          className="block px-4 py-3 text-neutral-400"
                        >
                          {asset.market || '-'}
                        </Link>
                      </td>
                      <td className="p-0 text-right">
                        <Link
                          href={`/assets/${asset.symbol}`}
                          className="block px-4 py-3 font-mono text-neutral-300"
                        >
                          {asset.last_price !== null
                            ? `${Number(asset.last_price).toFixed(2)} €`
                            : '-'}
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
