import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import Link from "next/link";
import { LineChart } from "lucide-react";

export const metadata: Metadata = {
  title: "Market Explorer | PHIOBI",
  description: "Explora los activos del mercado en PHIOBI.",
};

export default async function AssetsPage() {
  const supabase = await createClient();
  const { data: assets, error } = await supabase
    .from("assets")
    .select("*")
    .order("symbol");

  if (error) {
    console.error("Error fetching assets:", error);
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-gray-200 p-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-red-400">Error loading market data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-white">Market Explorer</h1>
          <p className="text-sm text-gray-400 mt-1">
            Mercado Continuo, BME Growth e IBEX 35
          </p>
        </header>

        {!assets || assets.length === 0 ? (
          <div className="border border-gray-800 rounded-lg p-12 flex flex-col items-center justify-center text-center bg-[#111111]">
            <LineChart className="w-12 h-12 text-gray-600 mb-4" strokeWidth={1.5} />
            <h2 className="text-lg font-medium text-white mb-2">No hay activos disponibles</h2>
            <p className="text-sm text-gray-400 max-w-sm">
              El mercado está vacío en este momento. Por favor, vuelva más tarde o pueble la base de datos de activos.
            </p>
          </div>
        ) : (
          <div className="border border-gray-800 rounded-lg overflow-hidden bg-[#0A0A0A]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="border-b border-gray-800 bg-[#111111] text-xs uppercase tracking-wider text-gray-400">
                    <th className="px-4 py-3 font-medium">Ticker</th>
                    <th className="px-4 py-3 font-medium">Empresa</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Sector</th>
                    <th className="px-4 py-3 font-medium hidden sm:table-cell">Mercado</th>
                    <th className="px-4 py-3 font-medium text-right">Precio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {assets.map((asset) => (
                    <tr
                      key={asset.id}
                      className="group hover:bg-[#1A1A1A] transition-colors"
                    >
                      <td className="p-0">
                        <Link
                          href={`/assets/${asset.symbol}`}
                          className="block px-4 py-3 w-full h-full"
                        >
                          <span className="inline-block bg-gray-800/80 text-gray-200 text-xs px-2 py-1 rounded border border-gray-700 font-mono">
                            {asset.symbol}
                          </span>
                        </Link>
                      </td>
                      <td className="p-0">
                        <Link
                          href={`/assets/${asset.symbol}`}
                          className="block px-4 py-3 w-full h-full text-sm font-medium text-gray-200 group-hover:text-white truncate max-w-[200px] md:max-w-xs"
                        >
                          {asset.name}
                        </Link>
                      </td>
                      <td className="p-0 hidden md:table-cell">
                        <Link
                          href={`/assets/${asset.symbol}`}
                          className="block px-4 py-3 w-full h-full text-xs text-gray-400"
                        >
                          {asset.sector || "-"}
                        </Link>
                      </td>
                      <td className="p-0 hidden sm:table-cell">
                        <Link
                          href={`/assets/${asset.symbol}`}
                          className="block px-4 py-3 w-full h-full text-xs text-gray-400"
                        >
                          {asset.market || "-"}
                        </Link>
                      </td>
                      <td className="p-0 text-right">
                        <Link
                          href={`/assets/${asset.symbol}`}
                          className="block px-4 py-3 w-full h-full text-sm font-mono text-gray-200"
                        >
                          {asset.last_price !== null
                            ? asset.last_price.toFixed(2)
                            : "-"}
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
  );
}
