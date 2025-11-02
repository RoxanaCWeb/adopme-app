import Link from "next/link";

export function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-slate-800">
          Adopme
        </Link>
        <nav>
          {/* Placeholder for login/logout buttons */}
          <div className="flex items-center space-x-4">
            <button className="bg-slate-800 text-white px-4 py-2 rounded-md">Login</button>
          </div>
        </nav>
      </div>
    </header>
  );
}
