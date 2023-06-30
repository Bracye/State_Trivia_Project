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
    "TriviaImages/Flowers/American_Dogwood.jpeg"
  ),
  new State(
    "New York",
    "TriviaImages/Flags/NewYork_Flag.png",
    "TriviaImages/Flowers/Rose.jpeg"
  ),
  new State(
    "Massachusetts",
    "TriviaImages/Flags/Massachusetts_Flag.png",
    "TriviaImages/Flowers/Mountain_Laurel.jpeg"
  ),
  new State(
    "Maryland",
    "TriviaImages/Flags/Maryland_Flag.png",
    "TriviaImages/Flowers/Black_Eyed_Susan.jpeg"
  ),
  new State(
    "Rhode Island",
    "TriviaImages/Flags/RhodeIsland_Flag.png",
    "TriviaImages/Flowers/Violet.jpeg"
  ),
  new State(
    "Connecticut",
    "TriviaImages/Flags/Connecticut_Flag.png",
    "TriviaImages/Flowers/Mountain_Laurel.jpeg"
  ),
  new State(
    "New Hampshire",
    "TriviaImages/Flags/NewHampshire_Flag.png",
    "TriviaImages/Flowers/Purple_Lilac.jpeg"
  ),
  new State(
    "Delaware",
    "TriviaImages/Flags/Delaware_Flag.png",
    "TriviaImages/Flowers/Peach_Blossom.jpeg"
  ),
  new State(
    "North Carolina",
    "TriviaImages/Flags/NorthCarolina_Flag.png",
    "TriviaImages/Flowers/Flowering_Dogwood.jpeg"
  ),
  new State(
    "South Carolina",
    "TriviaImages/Flags/SouthCarolina_Flag.png",
    "TriviaImages/Flowers/Yellow_Jessamine.jpeg"
  ),
  new State(
    "New Jersey",
    "TriviaImages/Flags/NewJersey_Flag.png",
    "TriviaImages/Flowers/Violet.jpeg"
  ),
  new State(
    "Pennsylvania",
    "TriviaImages/Flags/Pennsylvania_Flag.png",
    "TriviaImages/Flowers/Mountain_Laurel.jpeg"
  ),
  new State(
    "Georgia",
    "TriviaImages/Flags/Georgia_Flag.png",
    "TriviaImages/Flowers/Cherokee_rose.jpeg"
  ),
];

//Getting elements from the html to be dynamicly add text and images
const questionElement = document.getElementById("question");
const imageElement = document.getElementById("image");
const buttonsContainer = document.getElementById("buttons-container");
const resultElement = document.getElementById("result");

//Initial variables
let currQuestion = 0;
let currCategory = "flags";
let livesLeft = 3;

//Function to load the categories with the corresponding randomized images and add the question to it
loadQuestions = (category) => {
  currCategory = category;

  if (category === "flags") {
    questionElement.textContent = "What state does this flag belong to?";
    generateRandomFlag();
  } else if (category === "flowers") {
    questionElement.textContent = "Which state is associated with this flower?";
    generateRandomFlower();
  }

  generateButtons();
};

//Function to randomize the images will be added into the image id in the HTML
generateRandomFlag = () => {
  currQuestion = Math.floor(Math.random() * states.length);
  const currState = states[currQuestion];
  imageElement.src = currState.flagImage;
};

generateRandomFlower = () => {
  currQuestion = Math.floor(Math.random() * states.length);
  const currState = states[currQuestion];
  imageElement.src = currState.flowerImage;
};

checkGuess = (guess) => {
  const currState = states[currQuestion];
  //Getting the current catergory and giving a result if the guess is right
  if (guess === currState.state) {
    if (currCategory === "flags") {
      resultElement.textContent =
        "Correct! This flag belongs to " + currState.state + "!";
    } else if (currCategory === "flowers") {
      resultElement.textContent =
        "Correct! The flower is associated with " + currState.state + "!";
    }

    currState.guessed = true; // Mark the flag as guessed

    //Filtering through the correctly guessed flags and when all are correct it will run
    const correctGuessedFlags = states.filter((state) => state.guessed);
    if (correctGuessedFlags.length === states.length) {
      //Displays the message
      questionElement.textContent =
        "Congrats! You've guessed all the states correctly!";
      //Removes the buttons
      buttonsContainer.innerHTML = "";
      //Removes the result text
      resultElement.innerHTML = "";
      //Displays the image
      imageElement.src = "TriviaImages/Misc/accept.png";
      //removes flagimage styling after all are answered
      imageElement.classList.remove("no-styling");
      imageElement.style.border = "none";
      imageElement.style.boxShadow = "none";
    } else {
      //If flags still need to be answered it will go to the enxt question for this category
      currQuestion++;
      if (currCategory === "flags") {
        questionElement.textContent =
          "Next Question: What state does this flag belong to?";
        generateRandomFlag();
      } else if (currCategory === "flowers") {
        questionElement.textContent =
          "Next Question: Which state does this flower belong to?";
        generateRandomFlower();
      }
      livesLeft = 3;
      generateButtons();
    }
  } else {
    // If it is guessed incorrectly player will lose lives
    livesLeft--;
    // If lives are still greater than 0 will get more chances, if not game is over
    if (livesLeft > 0) {
      resultElement.textContent = "Wrong! Try again. Lives left: " + livesLeft;
    } else {
      //Result for if you run out of lives
      resultElement.textContent =
        "Game Over! The correct answer was " + currState.state + ".";
      livesLeft = 3;
    }
  }
};
generateButtons = () => {
  buttonsContainer.innerHTML = "";

  // Looping through the state objects to add the button to a class and get the state's name
  for (let i = 0; i < states.length; i++) {
    const button = document.createElement("button");
    button.className = "category-button";
    button.textContent = states[i].state;
    // Adding a click event to the button
    button.addEventListener("click", function () {
      checkGuess(states[i].state);
    });

    // Appending the button to the button container based on the current category
    if (
      (currCategory === "flags" && states[i].flagImage) ||
      (currCategory === "flowers" && states[i].flowerImage)
    ) {
      buttonsContainer.appendChild(button);
    }
  }
};
//Calling the function
loadQuestions(currCategory);
