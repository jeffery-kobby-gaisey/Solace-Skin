import { Resend } from "resend";
import { site } from "./site";
import type { Booking, Enquiry } from "./store";

/**
 * Email layer with graceful degradation.
 * With RESEND_API_KEY set, real emails are sent via Resend.
 * Without it, emails are logged to the server console instead.
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM = process.env.RESEND_FROM || `Solace Skin <onboarding@resend.dev>`;

async function send(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) {
    // eslint-disable-next-line no-console
    console.log(
      `\n📧 [email fallback] would send to ${to}\n   subject: ${subject}\n`
    );
    return;
  }
  const resend = new Resend(RESEND_API_KEY);
  await resend.emails.send({ from: FROM, to, subject, html });
}

const wrap = (inner: string) => `
  <div style="font-family:Georgia,serif;max-width:560px;margin:auto;color:#3A3730">
    <div style="background:#8A9A82;color:#fff;padding:28px;border-radius:16px 16px 0 0">
      <h1 style="margin:0;font-size:22px">Solace Skin</h1>
      <p style="margin:6px 0 0;opacity:.85;font-size:13px">${site.tagline}</p>
    </div>
    <div style="background:#FBF8F3;padding:28px;border-radius:0 0 16px 16px;font-size:15px;line-height:1.6">
      ${inner}
      <hr style="border:none;border-top:1px solid #E7DACb;margin:24px 0" />
      <p style="font-size:12px;color:#7A756B">Solace Skin · ${site.location} · ${site.phone}</p>
    </div>
  </div>`;

export async function sendBookingEmails(b: Booking) {
  // 1) Confirmation to the client.
  await send(
    b.email,
    "Your Solace Skin appointment request",
    wrap(`
      <p>Hi ${b.full_name.split(" ")[0]},</p>
      <p>Thank you for choosing <strong>Solace Skin</strong>. We've received your request and our team will confirm your slot shortly.</p>
      <p><strong>Service:</strong> ${b.service}<br/>
         <strong>Date:</strong> ${b.date}<br/>
         <strong>Time:</strong> ${b.time}</p>
      <p>We can't wait to help you reveal your best skin.</p>
    `)
  );

  // 2) Notification to the business.
  await send(
    site.email,
    `New booking — ${b.service} (${b.full_name})`,
    wrap(`
      <p><strong>New appointment request</strong></p>
      <p><strong>Name:</strong> ${b.full_name}<br/>
         <strong>Phone:</strong> ${b.phone}<br/>
         <strong>Email:</strong> ${b.email}<br/>
         <strong>Service:</strong> ${b.service}<br/>
         <strong>Date:</strong> ${b.date} at ${b.time}</p>
      ${b.notes ? `<p><strong>Notes:</strong> ${b.notes}</p>` : ""}
    `)
  );
}

export async function sendEnquiryEmail(e: Enquiry) {
  await send(
    site.email,
    `New enquiry from ${e.name}`,
    wrap(`
      <p><strong>New contact enquiry</strong></p>
      <p><strong>Name:</strong> ${e.name}<br/>
         <strong>Email:</strong> ${e.email}<br/>
         ${e.phone ? `<strong>Phone:</strong> ${e.phone}<br/>` : ""}</p>
      <p><strong>Message:</strong><br/>${e.message}</p>
    `)
  );
}
