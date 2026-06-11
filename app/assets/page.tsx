import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Market Explorer | PHIOBI",
  description: "Explore Spanish stock market assets (IBEX 35, Mercado Continuo, BME Growth).",
};

export default async function MarketExplorer() {
  const supabase = await createClient();

  const { data: assets, error } = await supabase
    .from("assets")
    .select("symbol, name, sector, market, last_price, is_active")
    .eq("is_active", true)
    .order("symbol");

  if (error) {
    console.error("Error fetching assets:", error);
    // Optionally render a nice error state
  }

  const formatPrice = (price: number | null) => {
    if (price === null) return "—";
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
            Market Explorer
          </h1>
          <p className="text-sm text-gray-500">
            Explora activos financieros españoles e internacionales.
          </p>
        </div>

        {assets && assets.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-gray-800 bg-[#111]">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#1A1A1A] text-gray-400 border-b border-gray-800">
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
              <tbody className="divide-y divide-gray-800">
                {assets.map((asset) => (
                  <tr
                    key={asset.symbol}
                    className="hover:bg-[#1A1A1A] transition-colors group"
                  >
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3"
                      >
                        <span className="inline-flex items-center rounded-md bg-gray-800/50 px-2 py-1 text-xs font-medium text-gray-300 ring-1 ring-inset ring-gray-700/50 group-hover:bg-gray-700/50 transition-colors">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-gray-100 font-medium"
                      >
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden sm:table-cell">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-gray-400"
                      >
                        {asset.sector || "—"}
                      </Link>
                    </td>
                    <td className="p-0 hidden md:table-cell">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-gray-500"
                      >
                        {asset.market || "—"}
                      </Link>
                    </td>
                    <td className="p-0 text-right">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 font-mono text-gray-100"
                      >
                        {formatPrice(asset.last_price)}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20 px-4 rounded-lg border border-dashed border-gray-800 bg-[#111]">
            <h3 className="text-lg font-medium text-gray-300 mb-2">
              Mercado Vacío
            </h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Aún no hay activos registrados en la plataforma. Comienza a poblar
              el mercado para ver información en tiempo real.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
