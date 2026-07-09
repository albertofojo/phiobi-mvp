import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Market Explorer | PHIOBI",
  description: "Explora los activos disponibles en el mercado.",
};

export default async function AssetsPage() {
  const supabase = await createClient();

  const { data: assets, error } = await supabase
    .from("assets")
    .select("*")
    .order("symbol", { ascending: true });

  if (error) {
    console.error("Error fetching assets:", error);
    return (
      <div className="flex h-screen items-center justify-center bg-[#0A0A0A] text-white">
        <p className="text-red-500 font-sans">Error al cargar los activos.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex items-center justify-between border-b border-gray-800 pb-4">
          <h1 className="text-2xl font-bold tracking-tight">Market Explorer</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar ticker..."
              className="pl-9 pr-4 py-1.5 bg-gray-900 border border-gray-800 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-transparent transition-all w-48 md:w-64"
              disabled
            />
          </div>
        </header>

        {(!assets || assets.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-gray-800 rounded-lg bg-gray-900/30">
            <div className="h-12 w-12 rounded-full bg-gray-800 flex items-center justify-center mb-4">
              <span className="text-gray-400 text-xl font-mono">0</span>
            </div>
            <h2 className="text-lg font-medium text-gray-100 mb-2">Mercado Vacío</h2>
            <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
              Aún no se han añadido activos a la base de datos. Sé el primero en poblar el mercado y comenzar la discusión.
            </p>
          </div>
        ) : (
          <div className="border border-gray-800 rounded-lg overflow-hidden bg-gray-950">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 border-b border-gray-800 bg-gray-900/50 text-xs font-medium text-gray-400 uppercase tracking-wider">
              <div>Ticker</div>
              <div className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-2">Empresa</div>
              <div className="hidden md:block">Sector</div>
              <div className="hidden sm:block md:hidden lg:block">Mercado</div>
              <div className="text-right">Precio</div>
            </div>

            <div className="divide-y divide-gray-800/50">
              {assets.map((asset) => (
                <Link
                  key={asset.id}
                  href={`/assets/${asset.symbol}`}
                  className="block hover:bg-gray-900/80 transition-colors group"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 items-center">
                    <div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-gray-800 text-gray-200 group-hover:bg-gray-700 transition-colors">
                        {asset.symbol}
                      </span>
                    </div>

                    <div className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-2 truncate font-medium text-gray-100">
                      {asset.name}
                    </div>

                    <div className="hidden md:block text-sm text-gray-400 truncate">
                      {asset.sector || "—"}
                    </div>

                    <div className="hidden sm:block md:hidden lg:block">
                      <span className="text-xs text-gray-400">
                        {asset.market || "—"}
                      </span>
                    </div>

                    <div className="text-right font-mono text-sm">
                      {asset.last_price !== null ? (
                        <span className="text-gray-100">{asset.last_price.toFixed(2)} €</span>
                      ) : (
                        <span className="text-gray-600">—</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
