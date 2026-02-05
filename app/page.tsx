import Link from "next/link";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/layout";
import { Database, Lock, Zap, ArrowRight } from "lucide-react";

const Page = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="animate-slide-up text-5xl font-bold leading-tight md:text-7xl">
            FULL-STACK
            <br />
            <span className="inline-block border-b-4 border-foreground">AUTHENTICATION</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl animate-fade-in text-lg text-muted-foreground md:text-xl font-space">
            Practice building real authentication flows with Neon, Prisma, Next.js, and Auth.js. 
            Sharp, minimal, production-ready.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto font-space">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto font-space">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="border-t-2 border-border bg-secondary py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center font-heading text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Built With
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {["NEON", "PRISMA", "NEXT.JS", "AUTH.JS", "BCRYPT"].map((tech) => (
              <span
                key={tech}
                className="font-space text-xl font-bold tracking-tight md:text-2xl"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">
          WHAT YOU&apos;LL BUILD
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <FeatureCard
            icon={<Lock className="h-8 w-8" />}
            title="SECURE AUTH"
            description="User registration, login, and session management with bcrypt password hashing."
          />
          <FeatureCard
            icon={<Database className="h-8 w-8" />}
            title="DATABASE"
            description="PostgreSQL with Neon for serverless, scalable data persistence via Prisma ORM."
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8" />}
            title="SERVER ACTIONS"
            description="Next.js server actions and API routes for seamless backend integration."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t-2 border-border py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            READY TO START?
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-muted-foreground">
            Create your account and start practicing full-stack authentication patterns.
          </p>
          <Link href="/register">
            <Button size="lg">
              Create Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="font-heading text-sm uppercase tracking-wider text-muted-foreground">
            AuthStack Practice Project
          </p>
        </div>
      </footer>
    </Layout>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="group border-2 border-border bg-background p-8 shadow-sharp transition-all duration-150 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-sharp-hover">
      <div className="mb-6 inline-block border-2 border-foreground p-4">
        {icon}
      </div>
      <h3 className="mb-3 font-heading text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Page;
