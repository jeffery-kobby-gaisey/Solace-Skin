import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-6 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-3 font-serif text-5xl text-ink">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          The page you're looking for has drifted away. Let's get you back to
          your moment of calm.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/">Back Home</Button>
          <Button href="/book" variant="outline">
            Book Appointment
          </Button>
        </div>
      </div>
    </section>
  );
}
