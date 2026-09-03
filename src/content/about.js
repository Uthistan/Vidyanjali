/**
 * Vidyanjali's own words about itself.
 *
 * SOURCE: "VIDYANJALI WEBSITE CONTENT" supplied by the client. Everything in
 * this file is the client's wording. The only edits applied are mechanical —
 * sentence spacing, capitalisation, hyphenation and UK spelling — plus, in the
 * bios, dropping the leading "Dr. X is..." clause because the name is already
 * rendered as the heading directly above it.
 *
 * Nothing here is invented. If a fact is not in the source document it is not
 * in this file, and it must not be added without the client supplying it.
 */

/** The origin story. Rendered on /about, and its first line leads the home hero. */
export const journey = [
  "Established in 2003, Vidyanjali began as a therapy centre and transformed into a school for children with autism and many other neurodevelopmental conditions.",
  "Vidyanjali has now rebranded into Vidyanjali Learning Centre.",
];

/** The mission statement, in full. Shown on the home page and on /about. */
export const mission = [
  "At Vidyanjali, our mission is to empower children with special needs to become independent, confident and valued individuals in the world, just like everyone.",
  "We strive to cultivate the skills, confidence and independence that enable children to reach their full potential in their own ways.",
  "Having worked with over 100 children, we are proud that many of our students have gone on to play meaningful roles in society. We remain committed to creating opportunities that help every child.",
];

/**
 * The homepage headline.
 *
 * NOT new copy. It is the opening clause of `mission[0]` — "…empower children
 * with special needs to become independent, confident and valued individuals"
 * — lifted out and put into the present participle so it stands alone as a
 * statement rather than reading as a sentence fragment. The trailing "in the
 * world, just like everyone" is dropped because at display size the line
 * needs to land, and the full mission is set out in full further down the
 * page anyway.
 *
 * This is the one line on the site that is a rewording rather than a
 * quotation, and it is here rather than inline in the component so that it is
 * obvious and easy to replace. If the client writes a real headline, swap it.
 */
export const heroStatement =
  "Empowering children with special needs to become independent, confident and valued individuals.";

/**
 * The four vision statements, kept as separate lines because that is how they
 * were written — four parallel "To ..." clauses, not one paragraph.
 */
export const vision = [
  "To create an inclusive world where every child with special needs is empowered to reach their full potential.",
  "To inspire confidence, independence and lifelong learning through compassionate education.",
  "To enable every child to become an active and valued member of society.",
  "To be a trusted centre of excellence that transforms every child.",
];

export const founders = [
  {
    name: "Dr. Vidhya Lakshmi Harikrishnan",
    credentials: "BOT",
    role: "Founder and Director",
    bio: [
      "A certified professional in Foundation Course in Curative Education, she brings over 23 years of experience in special education and therapeutic support services.",
      "Her work focuses on fostering holistic development, inclusion, and individualised learning opportunities for children with diverse needs.",
      "She is also an educationalist who supports and motivates students with learning disabilities and low self-esteem to appear for their Cambridge IGCSE and NIOS examinations.",
    ],
  },
  {
    name: "Dr. John Miller",
    credentials: "B.Sc., BOT, AOT – Germany, RMT – USA",
    role: "Co Founder and Therapeutic Patron",
    bio: [
      "A highly experienced occupational therapy professional with over 25 years of expertise in working with children with Autism Spectrum Disorder (ASD).",
      "His extensive international training and clinical experience have enabled him to support children and families through evidence-based therapeutic interventions aimed at maximising independence and quality of life.",
      "He currently conducts parental awareness and teacher training workshops. He also does consultations in diet planning for special needs children and adults.",
    ],
  },
];

export const team = [
  {
    name: "Mrs. Abirami",
    credentials: "B.Sc. Psychology",
    role: "Academic Programme Facilitator",
    bio: [
      "She has over 8 years of experience working with children with special needs. She teaches academics to children with special needs, including functional mathematics, life skills and the NIOS curriculum.",
      "She specialises in working with young adults with emotional outbursts. She has a strong foundation in leading a team of teachers. Her strength is to take academics with therapeutic movement.",
    ],
  },
  {
    name: "Ms. Anjali",
    credentials: "BA. TTM",
    role: "Remedial Programme Facilitator",
    bio: [
      "She has over 7 years of experience working with children with special needs. She specialises in working with young children.",
      "Her unique way of soulful understanding of children’s difficulty has helped her to bond and move them miles afar. Her speciality is working with children with any severity of neurodevelopmental conditions.",
    ],
  },
  {
    name: "Mr. Baskar",
    credentials: "D.ECE",
    role: "Baking Teacher",
    bio: [
      "He has 7 years of experience in baking and confectionery and 2 years of experience teaching children with special needs.",
      "He specialises in baking organically, catering to each child’s dietary restrictions, and takes regular baking workshops.",
    ],
  },
];
