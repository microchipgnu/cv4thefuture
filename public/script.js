// model: https://s3.amazonaws.com/readyplayerbaker/avatars_baked/947910ed-f13e-44d8-bba5-873d3f738c9c.glb

let session = newSession();
let step = 0;

const title = document.querySelector("#title");
const description = document.querySelector("#description");
const upButton = document.querySelector("#upButton");
const downButton = document.querySelector("#downButton");
const modelViewer = document.querySelector("#avatar");

const typeColors = {
  greeting: "linear-gradient(#ffffff, #ada996)",
  goodbye: "linear-gradient(#ffffff, #ada996)",
  personal: "linear-gradient(#ffffff, #ada996)",
  achievements: "linear-gradient(#ffffff, #ada996)",
  work: "linear-gradient(#ffffff, #ada996)"
};

const interaction = [
  {
    id: 0,
    title: "Hey, I'm Luís! ",
    type: "greeting",
    description: "To learn more about me, press thumbs up.",
    animation: "Wave"
  },
  {
    id: 1,
    title: "Skateboarding is one of my passion hobbies!",
    description: "Is this cool? Feed me with your feedback.",
    type: "personal",
    link: "",
    media: "image",
    media_url: "",
    animation: "Running"
  },
  {
    id: 2,
    title: "I have built multiple applications.",
    description: "Is this cool? Feed me with your feedback.",
    type: "work",
    link: "",
    media: "",
    animation: "Dance"
  },
  {
    id: 3,
    title:
      "I have won TEN THOUSAND EUROS on a hackathon organized by Mercedes-Benz.io",
    description: "Is this cool? Feed me with your feedback.",
    type: "achievements",
    link: "",
    media: "",
    animation: "Jump"
  },
  {
    id: 4,
    title: "I practiced ballet for 7 years. Went to the national school.",
    description: "Is this cool? Feed me with your feedback.",
    type: "personal",
    link: "",
    media: "",
    animation: "Dance"
  },
  {
    id: 5,
    title: "That's all.",
    type: "goodbye",
    description: "Thanks for your honest feedback.",
    animation: "ThumbsUp"
  }
];

let answers = [];

/*fetch("https://luiscv.glitch.me/answer", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(session)
}) 
*/

const up = () => {
  load(true);
};

const down = () => {
  load(false);
};

const load = (up = true) => {
  if (step < interaction.length) {
    answers.push([{ id: interaction[step].id, answer: up ? "up" : "down" }]);

    if (step === interaction.length - 1) {
      fetch("https://luiscv.glitch.me/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ session, answers })
      });
    }

    const data = interaction[step];
    title.textContent = data.title;
    description.textContent = data.description;
    avatar.animationName = data.animation;
    modelViewer.style.setProperty("background", typeColors[data.type]);
  }
  step++;
};

load();
