import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/layout/Section";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import { contact } from "@/content/site";
import ClosingCTA from "@/components/layout/ClosingCTA";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  const hasDetails = Boolean(contact.email || contact.phone || contact.address);

  return (
    <>
      <PageHeader eyebrow="Contact" title="Get in touch" motifTone="teal" />

      <Section>
        {hasDetails ? (
          <Reveal>
            <dl className="mb-14 grid gap-10 border-t-[3px] border-gold pt-7 sm:grid-cols-2">
              {contact.email && (
                <div>
                  <dt className="text-eyebrow font-sans uppercase text-teal">
                    Email
                  </dt>
                  <dd className="mt-2 text-body">
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-ink no-underline transition-colors duration-300 hover:text-teal"
                    >
                      {contact.email}
                    </a>
                  </dd>
                </div>
              )}

              {contact.phone && (
                <div>
                  <dt className="text-eyebrow font-sans uppercase text-teal">
                    Phone
                  </dt>
                  <dd className="mt-2 text-body">
                    <a
                      href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                      className="text-ink no-underline transition-colors duration-300 hover:text-teal"
                    >
                      {contact.phone}
                    </a>
                  </dd>
                </div>
              )}

              {contact.address && (
                <div className="sm:col-span-2">
                  <dt className="text-eyebrow font-sans uppercase text-teal">
                    Visit
                  </dt>
                  <dd className="mt-2 max-w-measure text-body whitespace-pre-line">
                    {contact.address}
                  </dd>
                </div>
              )}
            </dl>
          </Reveal>
        ) : null}

        {/* Eight of twelve columns, flush left. The form used to be centred at
            384px in the full page width, which read as a widget dropped into
            an empty screen rather than as part of the layout. */}
        <Reveal delay={100} className="lg:w-8/12">
          <ContactForm />
        </Reveal>
      </Section>

      {/* <ClosingCTA /> */}
    </>
  );
}
