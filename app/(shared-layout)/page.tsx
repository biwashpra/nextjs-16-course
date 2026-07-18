import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col ">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center py-16 px-4 text-center ">
        <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/60">
            Welcome to My Blog
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A simple Next.js 16 tutorial project exploring the new features and
            best practices. Built with Convex, better-auth, Tailwind CSS, and
            love.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button size="lg" className="rounded-full px-8">
              <Link href="/blog">Start Reading</Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8">
              <Link href="/create">Write a Post</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
