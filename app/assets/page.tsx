import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import Link from "next/link";
import { TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Market Explorer | PHIOBI",
  description: "Explora activos del mercado bursátil en PHIOBI",
};

export default async function AssetsPage() {
  const supabase = await createClient();
  const { data: assets, error } = await supabase
    .from("assets")
    .select("*")
    .eq("is_active", true)
    .order("symbol");

  if (error) {
    console.error("Error fetching assets:", error);
    return (
      <div className="flex h-[50vh] items-center justify-center bg-[#0A0A0A] text-white font-sans">
        <p className="text-red-500">Error al cargar los activos del mercado.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 font-sans p-4 sm:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">
            Market Explorer
          </h1>
          <p className="text-sm text-gray-400">
            Mercado Continuo, BME Growth e IBEX 35
          </p>
        </header>

        {!assets || assets.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 border border-gray-800 rounded-lg bg-[#111] text-center">
            <TrendingUp className="w-8 h-8 text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-300 mb-2">
              El mercado está vacío
            </h3>
            <p className="text-sm text-gray-500 max-w-md">
              Actualmente no hay activos listados en la base de datos. Los
              activos aparecerán aquí una vez que el mercado sea poblado.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-gray-800 rounded-lg bg-[#0F0F0F]">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#151515] text-gray-400 border-b border-gray-800 text-xs uppercase tracking-wider">
                <tr>
                  <th scope="col" className="px-6 py-4 font-medium">
                    Ticker
                  </th>
                  <th scope="col" className="px-6 py-4 font-medium">
                    Empresa
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium hidden sm:table-cell"
                  >
                    Sector
                  </th>
                  <th scope="col" className="px-6 py-4 font-medium">
                    Mercado
                  </th>
                  <th scope="col" className="px-6 py-4 font-medium text-right">
                    Precio
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {assets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="hover:bg-[#1A1A1A] transition-colors group"
                  >
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-6 py-4 w-full h-full"
                      >
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-gray-800 text-gray-300 group-hover:bg-gray-700 transition-colors border border-gray-700">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-6 py-4 w-full h-full font-medium text-gray-200"
                      >
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden sm:table-cell">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-6 py-4 w-full h-full text-gray-400"
                      >
                        {asset.sector || "—"}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-6 py-4 w-full h-full text-gray-400"
                      >
                        {asset.market || "—"}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="flex px-6 py-4 w-full h-full justify-end items-center font-mono"
                      >
                        {asset.last_price !== null ? (
                          <span className="text-gray-200">
                            {Number(asset.last_price).toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-gray-600">—</span>
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
  );
}
