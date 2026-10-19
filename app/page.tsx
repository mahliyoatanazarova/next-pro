import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import ImagesSection from "@/components/ImagesSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-5">
        <h1 className="text-xl font-bold text-blue-600">Appliances</h1>

        <div className="hidden flex-1 justify-center md:flex">
          <div className="w-full max-w-md rounded-full border border-slate-200 bg-white shadow-sm">
            <input
              className="w-full rounded-full bg-transparent px-4 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400"
              type="text"
              placeholder="Search here..."
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin">
            <Button variant="outline">Admin panel</Button>
          </Link>
          <Link href="/sign-in">
            <Button variant="outline">Log In</Button>
          </Link>
          <Link href="/sign-up">
            <Button className="px-5 py-3">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="bg-gradient-to-br from-blue-100 via-white to-violet-100">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-6 px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
            <Sparkles className="h-4 w-4" />
            Smart appliances for modern homes
          </div>

          <h1 className="max-w-4xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-7xl">
            Best Appliances for your home
          </h1>

          <p className="max-w-2xl text-base text-slate-600 sm:text-lg">
            Discover premium kitchen, home, and smart devices designed to improve comfort,
            convenience, and everyday life.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/sign-up">
              <Button className="px-6 py-5 text-base">Get Started</Button>
            </Link>
            <Link href="/sign-in">
              <Button variant="outline" className="px-6 py-5 text-base">
                Sign In
              </Button>
            </Link>
            <Link href="/admin">
              <Button variant="secondary" className="px-6 py-5 text-base">
                Admin panel
              </Button>
            </Link>
          </div>

          <div className="mt-6 grid w-full max-w-3xl gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
              <Zap className="mb-3 h-8 w-8 text-blue-600" />
              <p className="text-lg font-semibold">Fast delivery</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
              <ShieldCheck className="mb-3 h-8 w-8 text-blue-600" />
              <p className="text-lg font-semibold">Certified quality</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
              <Sparkles className="mb-3 h-8 w-8 text-blue-600" />
              <p className="text-lg font-semibold">Smart living</p>
            </div>
          </div>
        </div>
      </main>

      <ImagesSection />
    </div>
  );
}
