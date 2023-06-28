// Created an array of states (Starting with 13 Colonies)
const states = [
  {
    state: "Connecticut",
    flagImage: "TriviaImages/Flags/Connecticut_Flag.png",
    flowerImage: "TriviaImages/Flowers/Mountain_Laurel.jpeg",
  },
  {
    state: "Delaware",
    flagImage: "TriviaImages/Flags/Delaware_Flag.png",
    flowerImage: "TriviaImages/Flowers/Peach_Blossom.jpeg",
  },
  {
    state: "Virginia",
    flagImage: "TriviaImages/Flags/Virginia_Flag.png",
    flowerImage: "TriviaImages/Flowers/American_Dogwood.jpeg",
  },
  {
    state: "New York",
    flagImage: "TriviaImages/Flags/NewYork_Flag.png",
    flowerImage: "TriviaImages/Flowers/Rose.jpeg",
  },
  {
    state: "Maryland",
    flagImage: "TriviaImages/Flags/Maryland_Flag.png",
    flowerImage: "TriviaImages/Flowers/Black_Eyed_Susan.jpeg",
  },
  {
    state: "New Hampshire",
    flagImage: "TriviaImages/Flags/NewHampshire_Flag.png",
    flowerImage: "TriviaImages/Flowers/Purple_Lilac.jpeg",
  },
  {
    state: "South Carolina",
    flagImage: "TriviaImages/Flags/SouthCarolina_Flag.png",
    flowerImage: "TriviaImages/Flowers/Yellow_Jessamine.jpeg",
  },
  {
    state: "Massachusetts",
    flagImage: "TriviaImages/Flags/Massachusetts_Flag.png",
    flowerImage: "TriviaImages/Flowers/Mountain_Laurel.jpeg",
  },
  {
    state: "Georgia",
    flagImage: "TriviaImages/Flags/Georgia_Flag.png",
    flowerImage: "TriviaImages/Flowers/Cherokee_Rose.jpeg",
  },
  {
    state: "Rhode Island",
    flagImage: "TriviaImages/Flags/RhodeIsland_Flag.png",
    flowerImage: "TriviaImages/Flowers/Violet.jpeg",
  },
  {
    state: "Pennsylvania",
    flagImage: "TriviaImages/Flags/Pennsylvania_Flag.png",
    flowerImage: "TriviaImages/Flowers/Mountain_Laurel.jpeg",
  },
  {
    state: "North Carolina",
    flagImage: "TriviaImages/Flags/NorthCarolina_Flag.png",
    flowerImage: "TriviaImages/Flowering_Dogwood.jpeg",
  },
  {
    state: "New Jersey",
    flagImage: "TriviaImages/Flags/NewJersey_Flag.png",
    flowerImage: "TriviaImages/Flowers/Violet.jpeg",
  },
];

let currQuestion = 0;
// console.log(currQuestion);
let currCategory = "flags";
console.log(currCategory);

//Gets the id question in HTML
const questionElement = document.getElementById("question");
//Gets the id image in HTML
const imageElement = document.getElementById("image");
//Gets the id buttons-container in HTML
const buttonsContainer = document.getElementById("buttons-container");
//Gets the id result in HTML
const resultElement = document.getElementById("result");

//Creating a function to load a specific category, and adding a question and image element to the corresponding category question
loadQuestions = (category) => {
  currCategory = category;

  if (category === "flags") {
    questionElement.textContent = "What state does this flag belong too?";
    imageElement.src = states[currQuestion].flagimage;
  }
};
