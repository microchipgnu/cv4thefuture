// type: personal, work, achievements, entrepreneur

// associar animaçoes do avatar a factos

const facts = [
  {
    title: "Skateboarding is one of my passion hobbies!",
    description: "Feed me with your feedback",
    type: "personal",
    link: "",
    media: "",
    animation: ""
  },
  {
    title: "I have built multiple applications.",
    description: "Feed me with your feedback",
    type: "work",
    link: "",
    media: "",
    animation: ""
  },
  {
    title:
      "I have won TEN THOUSAND EUROS on a hackathon organized by Mercedes-Benz.io",
    description: "Feed me with your feedback",
    type: "achievements",
    link: "",
    media: "",
    animation: ""
  },
  {
    title: "I practiced ballet for 7 years. Went to the national school.",
    description: "Feed me with your feedback",
    type: "personal",
    link: "",
    media: "",
    animation: ""
  }
];


const getFact = () => facts[Math.floor(Math.random() * facts.length)];
