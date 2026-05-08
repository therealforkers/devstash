import Link from "next/link";
import { buttonVariants, Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-6xl font-extrabold tracking-tighter sm:text-7xl">
          Dev<span className="text-primary">Stash</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-[600px]">
          The centralized developer knowledge hub for your snippets, prompts, and commands.
        </p>
        <div className="flex gap-4 mt-8">
          <Link 
            href="/dashboard" 
            className={cn(buttonVariants({ size: "lg" }), "rounded-full px-8 h-12")}
          >
            Go to Dashboard
          </Link>
          <Button variant="outline" size="lg" className="rounded-full px-8 h-12">
            Learn More
          </Button>
        </div>
      </div>
    </main>
  );
}
