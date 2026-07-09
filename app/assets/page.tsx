import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowRight, Database } from "lucide-react";

export const metadata = {
  title: "Market Explorer | PHIOBI",
  description: "Explora los activos del mercado español en PHIOBI.",
};

export default async function AssetsPage() {
  const supabase = createClient();
  const { data: assets, error } = await supabase
    .from("assets")
    .select("*")
    .order("symbol");

  if (error) {
    console.error("Error fetching assets:", error);
    return (
      <div className="flex h-screen items-center justify-center bg-[#0A0A0A] text-red-500">
        <p>Error loading market data. Please try again later.</p>
      </div>
    );
  }

  const hasAssets = assets && assets.length > 0;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-300 font-sans p-6 md:p-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 border-b border-zinc-800 pb-4">
          <h1 className="text-2xl font-semibold text-white tracking-tight">Market Explorer</h1>
          <p className="text-zinc-500 mt-2 text-sm">Explora las empresas cotizadas del mercado español.</p>
        </div>

        {!hasAssets ? (
          <div className="flex flex-col items-center justify-center py-24 border border-zinc-800 rounded-lg bg-zinc-900/30">
            <Database className="w-10 h-10 text-zinc-600 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Sin activos en el mercado</h3>
            <p className="text-zinc-400 text-sm max-w-md text-center mb-6">
              La base de datos aún no contiene información de las empresas del mercado.
              Por favor, inicia la carga de datos para poblar el mercado.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-zinc-800">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/50">
                  <th className="font-medium text-zinc-400 py-3 px-4">Ticker</th>
                  <th className="font-medium text-zinc-400 py-3 px-4">Empresa</th>
                  <th className="font-medium text-zinc-400 py-3 px-4 hidden md:table-cell">Sector</th>
                  <th className="font-medium text-zinc-400 py-3 px-4">Mercado</th>
                  <th className="font-medium text-zinc-400 py-3 px-4 text-right">Precio</th>
                  <th className="py-3 px-4 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50 bg-zinc-900/20">
                {assets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="hover:bg-zinc-800/50 transition-colors group"
                  >
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block py-3 px-4">
                        <span className="inline-block px-2 py-1 text-xs font-mono font-medium rounded-md bg-zinc-800 text-zinc-200 border border-zinc-700">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block py-3 px-4 text-zinc-200 font-medium truncate max-w-[200px] sm:max-w-xs">
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden md:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block py-3 px-4 text-zinc-500 truncate max-w-[150px]">
                        {asset.sector || "—"}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block py-3 px-4 text-zinc-400">
                        {asset.market || "—"}
                      </Link>
                    </td>
                    <td className="p-0 text-right">
                      <Link href={`/assets/${asset.symbol}`} className="block py-3 px-4 font-mono text-zinc-200">
                        {asset.last_price !== null ? (
                          <span className="flex items-center justify-end gap-1">
                            {Number(asset.last_price).toFixed(2)}
                            <span className="text-zinc-600 text-xs">€</span>
                          </span>
                        ) : (
                          <span className="text-zinc-600">—</span>
                        )}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block py-3 px-4 flex justify-end">
                        <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
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
