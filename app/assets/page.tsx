import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { TrendingUp, AlertCircle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Market Explorer | PHIOBI",
  description: "Explora los activos del mercado en PHIOBI",
};

export default async function AssetsPage() {
  const supabase = await createClient();

  const { data: assets, error } = await supabase
    .from("assets")
    .select("symbol, name, sector, market, last_price")
    .eq("is_active", true)
    .order("symbol");

  if (error) {
    console.error("Error fetching assets:", error);
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-neutral-400">
        <AlertCircle className="w-12 h-12 mb-4 text-red-500/50" />
        <p>Hubo un problema al cargar los activos.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200 font-sans p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-neutral-400" />
            Market Explorer
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Mercado Continuo, BME Growth e IBEX 35
          </p>
        </header>

        {!assets || assets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 border border-neutral-800 rounded-lg bg-neutral-900/30">
            <TrendingUp className="w-10 h-10 text-neutral-600 mb-4" />
            <h3 className="text-lg font-medium text-neutral-300">
              El mercado está vacío
            </h3>
            <p className="text-sm text-neutral-500 mt-2">
              Aún no hay activos registrados. ¡Invita a poblar el mercado!
            </p>
          </div>
        ) : (
          <div className="border border-neutral-800 rounded-md overflow-hidden bg-neutral-950">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-neutral-900/80 text-neutral-400 border-b border-neutral-800">
                <tr>
                  <th className="px-4 py-3 font-medium">Ticker</th>
                  <th className="px-4 py-3 font-medium">Empresa</th>
                  <th className="px-4 py-3 font-medium hidden sm:table-cell">
                    Sector
                  </th>
                  <th className="px-4 py-3 font-medium hidden md:table-cell">
                    Mercado
                  </th>
                  <th className="px-4 py-3 font-medium text-right">Precio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {assets.map((asset) => (
                  <tr
                    key={asset.symbol}
                    className="hover:bg-neutral-900/50 transition-colors group"
                  >
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3"
                      >
                        <span className="inline-flex items-center rounded-md bg-neutral-800/80 px-2 py-1 text-xs font-mono font-medium text-neutral-300 ring-1 ring-inset ring-neutral-700/50 group-hover:bg-neutral-700 group-hover:text-white transition-colors">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 font-medium text-neutral-300 group-hover:text-white truncate max-w-[150px] sm:max-w-none"
                      >
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden sm:table-cell">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-neutral-500 group-hover:text-neutral-400"
                      >
                        {asset.sector || "-"}
                      </Link>
                    </td>
                    <td className="p-0 hidden md:table-cell">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-neutral-500 group-hover:text-neutral-400"
                      >
                        {asset.market || "-"}
                      </Link>
                    </td>
                    <td className="p-0 text-right font-mono">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-neutral-300 group-hover:text-white"
                      >
                        {asset.last_price != null ? (
                          <span>
                            {Number(asset.last_price).toLocaleString("es-ES", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 4,
                            })}
                            <span className="text-neutral-600 ml-1">€</span>
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
        )}
      </div>
    </div>
  );
}
