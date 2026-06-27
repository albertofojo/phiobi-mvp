import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Activity, ArrowRight, ServerCrash } from 'lucide-react'

export const metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explora y analiza los activos del mercado español.',
}

export default async function AssetsPage() {
  const supabase = await createClient()

  // Fetching assets from Supabase
  const { data: assets, error } = await supabase
    .from('assets')
    .select('*')
    .order('symbol')

  if (error) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center space-y-4 text-center">
        <ServerCrash className="h-10 w-10 text-neutral-600" />
        <div className="space-y-2">
          <h2 className="text-xl font-medium text-neutral-200">Error cargando el mercado</h2>
          <p className="text-sm text-neutral-500">No se pudieron obtener los datos de los activos.</p>
        </div>
      </div>
    )
  }

  const hasAssets = assets && assets.length > 0

  return (
    <div className="min-h-screen bg-[#0A0A0A] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl space-y-8">

        <header className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-neutral-400" />
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-100 font-sans">
              Market Explorer
            </h1>
          </div>
          <p className="text-sm text-neutral-500 font-sans max-w-2xl">
            Explora el mercado bursátil. Datos del IBEX 35, Mercado Continuo y BME Growth.
          </p>
        </header>

        {!hasAssets ? (
          <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-12 text-center">
            <h3 className="text-lg font-medium text-neutral-200 mb-2 font-sans">El mercado está vacío</h3>
            <p className="text-sm text-neutral-500 font-sans">
              Actualmente no hay activos registrados en la base de datos.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-md border border-neutral-800 bg-[#0A0A0A]">
            <table className="w-full text-left text-sm text-neutral-400">
              <thead className="border-b border-neutral-800 bg-neutral-900/50 text-xs uppercase tracking-wider text-neutral-500 font-sans">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Ticker</th>
                  <th scope="col" className="px-4 py-3 font-medium">Empresa</th>
                  <th scope="col" className="hidden px-4 py-3 font-medium md:table-cell">Sector</th>
                  <th scope="col" className="hidden px-4 py-3 font-medium sm:table-cell">Mercado</th>
                  <th scope="col" className="px-4 py-3 font-medium text-right">Precio</th>
                  <th scope="col" className="px-4 py-3 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {assets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="group transition-colors hover:bg-neutral-900/50 font-sans"
                  >
                    <td className="p-0 whitespace-nowrap">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 w-full h-full"
                      >
                        <span className="inline-flex items-center rounded-md bg-neutral-800/80 px-2 py-1 text-xs font-medium text-neutral-300 font-mono ring-1 ring-inset ring-neutral-700">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 w-full h-full text-neutral-200 font-medium truncate max-w-[150px] sm:max-w-xs"
                      >
                        {asset.name}
                      </Link>
                    </td>
                    <td className="hidden p-0 md:table-cell">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 w-full h-full text-neutral-500"
                      >
                        {asset.sector || '-'}
                      </Link>
                    </td>
                    <td className="hidden p-0 sm:table-cell">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 w-full h-full"
                      >
                        <span className="text-xs text-neutral-400">
                          {asset.market || '-'}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0 text-right whitespace-nowrap">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 w-full h-full font-mono text-neutral-300"
                      >
                        {asset.last_price !== null
                          ? `${Number(asset.last_price).toFixed(2)} €`
                          : '-'}
                      </Link>
                    </td>
                    <td className="p-0 whitespace-nowrap text-right">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 w-full h-full"
                      >
                        <ArrowRight className="inline h-4 w-4 text-neutral-600 opacity-0 transition-opacity group-hover:opacity-100" />
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
