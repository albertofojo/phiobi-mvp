import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/database";
import Link from "next/link";
import { Database as DatabaseIcon } from "lucide-react";

export const metadata = {
  title: "Market Explorer | PHIOBI",
};

type Asset = Database["public"]["Tables"]["assets"]["Row"];

export default async function AssetsPage() {
  const supabase = await createClient();

  const { data: assets, error } = await supabase
    .from("assets")
    .select("*")
    .order("symbol");

  if (error) {
    console.error("Error fetching assets:", error);
  }

  const hasAssets = assets && assets.length > 0;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="space-y-2 border-b border-neutral-800 pb-4">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Market Explorer</h1>
          <p className="text-sm text-neutral-400">
            Explora activos financieros, cotizaciones y tesis de inversión.
          </p>
        </header>

        {!hasAssets ? (
          <div className="flex flex-col items-center justify-center py-24 border border-dashed border-neutral-800 rounded-lg bg-neutral-900/30">
            <DatabaseIcon className="h-8 w-8 text-neutral-600 mb-4" />
            <h2 className="text-lg font-medium text-neutral-300">No hay activos disponibles</h2>
            <p className="text-sm text-neutral-500 mt-1 max-w-sm text-center">
              El mercado está vacío. Añade activos a la base de datos para comenzar a explorar el mercado.
            </p>
          </div>
        ) : (
          <div className="border border-neutral-800 rounded-lg overflow-hidden bg-[#0A0A0A]">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-neutral-900/50 text-neutral-400 border-b border-neutral-800">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Ticker</th>
                  <th scope="col" className="px-4 py-3 font-medium">Empresa</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden md:table-cell">Sector</th>
                  <th scope="col" className="px-4 py-3 font-medium">Mercado</th>
                  <th scope="col" className="px-4 py-3 font-medium text-right">Precio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {assets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="hover:bg-neutral-900/50 transition-colors group"
                  >
                    <td className="px-4 py-3">
                      <Link href={`/assets/${asset.symbol}`} className="block">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-800 text-neutral-300 group-hover:bg-neutral-700 transition-colors">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-neutral-300 font-medium">
                      <Link href={`/assets/${asset.symbol}`} className="block">
                        {asset.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-neutral-500 hidden md:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block">
                        {asset.sector || "—"}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-neutral-400 text-xs">
                      <Link href={`/assets/${asset.symbol}`} className="block">
                        {asset.market || "—"}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-neutral-300">
                      <Link href={`/assets/${asset.symbol}`} className="block">
                        {asset.last_price ? (
                          <span>€{asset.last_price.toFixed(2)}</span>
                        ) : (
                          <span className="text-neutral-600">—</span>
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
