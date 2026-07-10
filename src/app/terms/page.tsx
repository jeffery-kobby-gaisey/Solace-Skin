import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms governing your use of the Solace Skin website and services.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        crumb="Terms"
        title="Terms & Conditions"
        image="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=2000&q=80"
      />
      <article className="container-wide max-w-3xl py-20">
        <div className="space-y-6 text-muted [&_h2]:mt-8 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-ink">
          <p>
            By using the Solace Skin website and booking our services, you agree
            to the following terms.
          </p>
          <h2>Appointments</h2>
          <p>
            Submitting the booking form is a request, not a guaranteed
            reservation. We will confirm your appointment by email or phone.
            Please arrive a few minutes early.
          </p>
          <h2>Cancellations</h2>
          <p>
            Kindly give at least 24 hours' notice to reschedule or cancel so we
            can offer your slot to another client.
          </p>
          <h2>Treatments</h2>
          <p>
            Results vary by individual. For medical skin conditions, please
            consult a physician. Inform your therapist of any allergies or
            medical concerns before treatment.
          </p>
          <h2>Liability</h2>
          <p>
            Solace Skin is not liable for reactions arising from undisclosed
            allergies or medical conditions.
          </p>
          <h2>Contact</h2>
          <p>
            For any questions about these terms, contact us at {site.email} or{" "}
            {site.phone}.
          </p>
        </div>
      </article>
    </>
  );
}
