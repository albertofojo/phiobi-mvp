import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Database, TrendingUp } from "lucide-react";

export const metadata = {
  title: "Market Explorer | PHIOBI",
  description: "Explora los activos financieros del mercado continuo, BME Growth e IBEX 35 en PHIOBI.",
};

export default async function AssetsPage() {
  const supabase = await createClient();

  const { data: assets, error } = await supabase
    .from("assets")
    .select("*")
    .order("symbol", { ascending: true });

  if (error) {
    console.error("Error fetching assets:", error);
    // Ideally, we'd have error boundaries, but for now we'll just show an empty list or error state.
  }

  const hasAssets = assets && assets.length > 0;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200 font-sans p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center gap-3 border-b border-neutral-800 pb-4">
          <TrendingUp className="w-6 h-6 text-emerald-500" />
          <h1 className="text-2xl font-medium text-white tracking-tight">Market Explorer</h1>
        </header>

        {!hasAssets ? (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-neutral-800 rounded-lg bg-neutral-900/30">
            <Database className="w-12 h-12 text-neutral-600 mb-4" strokeWidth={1.5} />
            <h2 className="text-lg font-medium text-white mb-2">El mercado está cerrado</h2>
            <p className="text-neutral-400 text-sm max-w-md">
              Aún no hay activos en la base de datos. Pídele al administrador que ejecute el seed de datos financieros para comenzar a invertir.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-neutral-800 rounded-lg bg-[#0A0A0A]">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-neutral-400 bg-neutral-900/50 uppercase border-b border-neutral-800">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Ticker</th>
                  <th scope="col" className="px-4 py-3 font-medium">Empresa</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden sm:table-cell">Sector</th>
                  <th scope="col" className="px-4 py-3 font-medium">Mercado</th>
                  <th scope="col" className="px-4 py-3 font-medium text-right">Precio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {assets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="hover:bg-neutral-800/50 transition-colors group"
                  >
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 h-full w-full outline-none"
                      >
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-800 text-neutral-300 group-hover:bg-neutral-700 transition-colors">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 h-full w-full font-medium text-neutral-200 outline-none"
                      >
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden sm:table-cell">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 h-full w-full text-neutral-400 outline-none"
                      >
                        {asset.sector || "—"}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 h-full w-full text-neutral-400 outline-none"
                      >
                        {asset.market || "—"}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 h-full w-full text-right font-mono text-neutral-300 outline-none"
                      >
                        {asset.last_price !== null && asset.last_price !== undefined
                          ? `${asset.last_price.toFixed(2)} €`
                          : "—"}
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
