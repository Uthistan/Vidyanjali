/**
 * The programmes Vidyanjali offers.
 *
 * SOURCE: the "PROGRAMS OFFERED" section of the client's content document,
 * in the order it was written. Descriptions are the client's own words.
 *
 * IMPORTANT: several entries have no description because the client supplied
 * none. Those render as a name alone — deliberately. Do NOT write copy for
 * them; ask the client. `description` and `points` are both optional and the
 * page handles either being absent.
 */
export const programmes = [
  {
    name: "Individual therapy",
    /* No description supplied. */
  },
  {
    name: "Group therapy",
    description:
      "A carefully curated 3 hour programme with five children and 2 teachers.",
    points: [
      "Supports children’s various sensory needs and therapy",
      "Enhances functional ability to handle day to day living",
      "Socialisation",
      "Independence in daily skills",
    ],
  },
  {
    name: "Baking",
    /* The source also carries the fragment "Program professional baker", which
       is too ambiguous to publish as written — left out pending clarification. */
    description:
      "Curates baking classes based on children’s ability with money concepts and exchanges.",
  },
  {
    name: "Park day",
    /* Source reads "meet the word" — corrected to "world". */
    description: "Encountering nature helps children to meet the world.",
    points: ["Grounding"],
  },
  {
    name: "Beach walk",
    description: "An organic active sensory therapy.",
  },
  {
    name: "Dance",
    /* No description supplied. */
  },
  {
    name: "One day events",
    /* The source lists these two beneath the heading with no further detail;
       reading them as the events themselves is an inference to confirm. */
    points: ["Ula", "Baking"],
  },
];

/** Just the names — used by the marquee on the home page. */
export const programmeNames = programmes.map((programme) => programme.name);
