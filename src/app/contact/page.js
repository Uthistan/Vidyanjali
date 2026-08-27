import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/layout/Section";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import { contact } from "@/content/site";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  const hasDetails = Boolean(contact.email || contact.phone || contact.address);

  return (
    <>
      <PageHeader eyebrow="Contact" title="Get in touch" motifTone="teal" />

      <Section containerClassName="flex flex-col items-center">
        {hasDetails ? (
          <Reveal>
            <dl className="grid gap-10 sm:grid-cols-2">
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

        <Reveal delay={100} className="mt-8 w-full">
          <div className="w-full flex justify-center">
            <ContactForm />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
