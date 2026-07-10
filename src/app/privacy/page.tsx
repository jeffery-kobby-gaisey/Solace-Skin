import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Solace Skin collects, uses and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        crumb="Privacy"
        title="Privacy Policy"
        image="https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=2000&q=80"
      />
      <article className="container-wide max-w-3xl py-20">
        <div className="space-y-6 text-muted [&_h2]:mt-8 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-ink">
          <p>
            Your privacy matters to us. This policy explains what information
            Solace Skin collects and how we use it.
          </p>
          <h2>Information We Collect</h2>
          <p>
            When you book an appointment or contact us, we collect your name,
            email, phone number and any details you choose to share. We use this
            solely to respond to you and manage your appointments.
          </p>
          <h2>How We Use Your Data</h2>
          <p>
            We use your information to confirm bookings, send appointment-related
            emails, respond to enquiries and, if you opt in, share occasional
            offers. We never sell your data.
          </p>
          <h2>Cookies</h2>
          <p>
            We use minimal cookies to improve your browsing experience and
            understand site traffic. You can accept or decline non-essential
            cookies via our banner.
          </p>
          <h2>Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of your
            personal data at any time by emailing{" "}
            <a href={`mailto:${site.email}`} className="text-sage-dark underline">
              {site.email}
            </a>
            .
          </p>
          <h2>Contact</h2>
          <p>
            Questions about this policy? Reach us at {site.email} or {site.phone}.
          </p>
        </div>
      </article>
    </>
  );
}
