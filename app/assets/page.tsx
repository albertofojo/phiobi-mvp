import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

export const metadata = {
  title: "Market Explorer | PHIOBI",
  description: "Explora los activos del mercado español.",
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

  const hasAssets = assets && assets.length > 0

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Market Explorer</h1>
          <p className="text-gray-400">Seguimiento de activos del mercado español.</p>
        </header>

        {!hasAssets ? (
          <div className="flex flex-col items-center justify-center p-12 border border-neutral-800 rounded-lg bg-neutral-900/30">
            <AlertCircle className="w-12 h-12 text-neutral-600 mb-4" />
            <h2 className="text-xl font-medium text-white mb-2">Mercado Vacío</h2>
            <p className="text-neutral-400 text-center max-w-md">
              Actualmente no hay activos registrados en la base de datos.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-neutral-800 rounded-lg bg-neutral-900/20">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-neutral-900/50 text-neutral-400 border-b border-neutral-800">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Ticker</th>
                  <th scope="col" className="px-4 py-3 font-medium">Empresa</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden md:table-cell">Sector</th>
                  <th scope="col" className="px-4 py-3 font-medium">Mercado</th>
                  <th scope="col" className="px-4 py-3 font-medium text-right">Precio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/50">
                {assets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="hover:bg-neutral-800/50 transition-colors group"
                  >
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3"
                      >
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-800 text-neutral-300 group-hover:bg-neutral-700 group-hover:text-white transition-colors">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-neutral-200 font-medium"
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
                    <td className="p-0">
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
                        className="block px-4 py-3 font-mono text-neutral-200"
                      >
                        {asset.last_price !== null
                          ? new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(asset.last_price)
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
