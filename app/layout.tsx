import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0A0A0A] text-white">
        {children}
      </body>
    </html>
  )
}
