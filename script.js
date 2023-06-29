//Changed the state array to a class to be able to randomize objects instead of everything being connected.
class State {
  constructor(state, flagImage, flowerImage) {
    this.state = state;
    this.flagImage = flagImage;
    this.flowerImage = flowerImage;
  }
}
//Newly created objects will be listed here
const states = [
  new State(
    "Virginia",
    "TriviaImages/Flags/Virginia_Flag.png",
    "TriviaImages/Flowers/Mountain_Laurel.jpeg"
  ),
  new State(
    "New York",
    "TriviaImages/Flags/NewYork_Flag.png",
    "TriviaImages/Flowers/Peach_Blossom.jpeg"
  ),
  new State(
    "Massachusetts",
    "TriviaImages/Flags/Massachusetts_Flag.png",
    "TriviaImages/Flowers/Mountain_Laurel.jpeg"
  ),
  new State(
    "Maryland",
    "TriviaImages/Flags/Maryland_Flag.png",
    "TriviaImages/Flowers/Peach_Blossom.jpeg"
  ),
  new State(
    "Rhode Island",
    "TriviaImages/Flags/RhodeIsland_Flag.png",
    "TriviaImages/Flowers/Mountain_Laurel.jpeg"
  ),
  new State(
    "Connecticut",
    "TriviaImages/Flags/Connecticut_Flag.png",
    "TriviaImages/Flowers/Peach_Blossom.jpeg"
  ),
  new State(
    "New Hampshire",
    "TriviaImages/Flags/NewHampshire_Flag.png",
    "TriviaImages/Flowers/Mountain_Laurel.jpeg"
  ),
  new State(
    "Delaware",
    "TriviaImages/Flags/Delaware_Flag.png",
    "TriviaImages/Flowers/Peach_Blossom.jpeg"
  ),
  new State(
    "North Carolina",
    "TriviaImages/Flags/NorthCarolina_Flag.png",
    "TriviaImages/Flowers/Peach_Blossom.jpeg"
  ),
  new State(
    "South Carolina",
    "TriviaImages/Flags/SouthCarolina_Flag.png",
    "TriviaImages/Flowers/Mountain_Laurel.jpeg"
  ),
  new State(
    "New Jersey",
    "TriviaImages/Flags/NewJersey_Flag.png",
    "TriviaImages/Flowers/Peach_Blossom.jpeg"
  ),
  new State(
    "Pennsylvania",
    "TriviaImages/Flags/Pennsylvania_Flag.png",
    "TriviaImages/Flowers/Mountain_Laurel.jpeg"
  ),
  new State(
    "Georgia",
    "TriviaImages/Flags/Georgia_Flag.png",
    "TriviaImages/Flowers/Peach_Blossom.jpeg"
  ),
];

//Initial variables
let currQuestion = 0;
let currCategory = "flags";
let livesLeft = 3;

//Getting elements from the html to be dynamicly add text and images
const questionElement = document.getElementById("question");
const imageElement = document.getElementById("image");
const buttonsContainer = document.getElementById("buttons-container");
const resultElement = document.getElementById("result");

//Function to load the categories with the corresponding randomized images and add the question to it
loadQuestions = (category) => {
  currCategory = category;

  //Category is flag and has a question text created for it in question id in the HTML
  if (category === "flags") {
    questionElement.textContent = "What state does this flag belong to?";
    generateRandomFlag();
  }
  generateButtons();
};

//Function to randomize the flagimage will be added into the image id in the HTML
generateRandomFlag = () => {
  currQuestion = Math.floor(Math.random() * states.length);
  const currState = states[currQuestion];
  imageElement.src = currState.flagImage;
};

checkGuess = (guess) => {
  const currState = states[currQuestion];

  if (guess === currState.state) {
    if (currCategory === "flags") {
      resultElement.textContent =
        "Correct! This flag belongs to " + currState.state + "!";
    }

    currState.guessed = true; // Mark the flag as guessed

    const correctlyGuessedFlags = states.filter((state) => state.guessed);
    if (correctlyGuessedFlags.length === states.length) {
      questionElement.textContent =
        "Congrats! You've guessed all the states correctly!";
      buttonsContainer.innerHTML = "";
      imageElement.src = "TriviaImages/Misc/accept.png";
    } else {
      currQuestion++;
      if (currCategory === "flags") {
        questionElement.textContent =
          "Next Question: What state does this flag belong to?";
        generateRandomFlag();
      }
      livesLeft = 3;
      generateButtons();
    }
  } else {
    livesLeft--;

    if (livesLeft > 0) {
      resultElement.textContent = "Wrong! Try again. Lives left: " + livesLeft;
    } else {
      resultElement.textContent =
        "Game Over! The correct answer was " + currState.state + ".";
      livesLeft = 3;
    }
  }
};
//Generating the possible answers function
generateButtons = () => {
  buttonsContainer.innerHTML = "";

  //Looping through the state objects to add the button to a class and get the states name
  for (let i = 0; i < states.length; i++) {
    const button = document.createElement("button");
    button.className = "category-button";
    button.textContent = states[i].state;
    //Adding a click to the button
    button.addEventListener("click", function () {
      checkGuess(states[i].state);
    });
    //appending it to the button container which is in the HTML
    buttonsContainer.appendChild(button);
  }
};
//Calling the function
loadQuestions(currCategory);
