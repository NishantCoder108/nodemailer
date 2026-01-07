import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <main className="flex flex-1 items-center justify-center px-6">
        <div className="text-center w-full lg:max-w-md">
          <h1 className="text-3xl font-semibold">Nodemailer App</h1>

          <p className="mt-4 text-base-content/60">
            A simple contact setup to send emails securely.
          </p>

          <Link href="/contact" className="btn btn-primary btn-sm mt-8">
            Go to Contact
          </Link>
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-base-content/50">
        Next.js • Nodemailer
      </footer>
    </div>
  );
}
