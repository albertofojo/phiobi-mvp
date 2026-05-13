import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { TrendingUp, Activity } from 'lucide-react'

export const metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explora y descubre activos en el mercado.',
}

export default async function AssetsPage() {
  const supabase = await createClient()

  // Fetch all assets, order by symbol
  const { data: assets, error } = await supabase
    .from('assets')
    .select('*')
    .order('symbol')

  if (error) {
    console.error('Error fetching assets:', error)
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-gray-200 p-8 flex items-center justify-center">
        <p className="text-red-400">Error al cargar el mercado.</p>
      </div>
    )
  }

  const hasAssets = assets && assets.length > 0

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 font-sans p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
          <Activity className="w-6 h-6 text-gray-400" />
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Market Explorer
          </h1>
        </div>

        {!hasAssets ? (
          <div className="flex flex-col items-center justify-center py-24 border border-gray-800 rounded-lg bg-[#0f0f0f]">
            <TrendingUp className="w-12 h-12 text-gray-600 mb-4" />
            <h2 className="text-xl font-medium text-gray-300 mb-2">
              Mercado Vacío
            </h2>
            <p className="text-sm text-gray-500 max-w-md text-center">
              No hay activos disponibles en la base de datos en este momento.
              Sé el primero en poblar el mercado.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-md border border-gray-800 bg-[#0f0f0f]">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-[#141414] text-gray-400 border-b border-gray-800">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Ticker</th>
                  <th scope="col" className="px-4 py-3 font-medium">Empresa</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden md:table-cell">Sector</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden sm:table-cell">Mercado</th>
                  <th scope="col" className="px-4 py-3 font-medium text-right">Precio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {assets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="hover:bg-[#1a1a1a] transition-colors group cursor-pointer"
                  >
                    <td className="p-0 whitespace-nowrap">
                      <Link href={`/assets/${asset.symbol}`} className="block w-full h-full px-4 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-gray-800 text-gray-300 group-hover:bg-gray-700 transition-colors">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0 font-medium text-gray-200">
                       <Link href={`/assets/${asset.symbol}`} className="block w-full h-full px-4 py-3">
                         {asset.name}
                       </Link>
                    </td>
                    <td className="p-0 text-gray-400 hidden md:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block w-full h-full px-4 py-3">
                        {asset.sector || '-'}
                      </Link>
                    </td>
                    <td className="p-0 text-gray-400 hidden sm:table-cell">
                       <Link href={`/assets/${asset.symbol}`} className="block w-full h-full px-4 py-3">
                         {asset.market || '-'}
                       </Link>
                    </td>
                    <td className="p-0 text-right font-mono text-gray-300">
                      <Link href={`/assets/${asset.symbol}`} className="block w-full h-full px-4 py-3">
                        {asset.last_price !== null && asset.last_price !== undefined
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
