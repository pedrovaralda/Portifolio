import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-zinc-100 px-4 font-mono">
      <div className="max-w-md w-full text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
          404 · Error
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
          Page Not Found
        </h1>
        <p className="text-sm text-zinc-400">
          The requested resource could not be found or has been moved.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs rounded-md border border-zinc-800 bg-zinc-900 hover:bg-zinc-850 text-zinc-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
