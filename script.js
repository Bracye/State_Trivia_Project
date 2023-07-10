//State class to hold the states, images, and true or false if state is guessed correctly
class State {
  constructor(state, flagImage, flowerImage) {
    this.state = state;
    this.flagImage = flagImage;
    this.flowerImage = flowerImage;
    this.guessed = false; // Initially set guessed as false
  }
}
//Array to hold the state objects
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

// Getting elements from the HTML to dynamically add text and images
const questionElement = document.getElementById("question");
const imageElement = document.getElementById("image");
const buttonsContainer = document.getElementById("buttons-container");
const resultElement = document.getElementById("result");
const tryAgainButton = document.getElementById("try-again")

// Variables to keep track of the game
let currQuestion = 0;
let currCategory = "flags";
let livesLeft = 3;

// Function to load questions for a category
loadQuestions = (category) => {
  currCategory = category;

  //Setting the question based on the category
  if (category === "flags") {
    questionElement.textContent = "What state does this flag belong to?";
  } else if (category === "flowers") {
    questionElement.textContent = "Which state is associated with this flower?";
  }

  //Generate a random image for the category
  generateRandomImage();
  //Generate buttons for the category
  generateButtons();
};

// Function to randomize the images for the category
generateRandomImage = () => {
  //Get the unguessed states based on current category
  const unguessedStates = states.filter((state) => !state.guessed);

  // IF All states have been guessed correctly
  if (unguessedStates.length === 0) {
    //Display completion elements
    imageElement.src = "TriviaImages/Misc/accept.png";
    imageElement.classList.remove("no-styling");
    imageElement.style.border = "none";
    imageElement.style.boxShadow = "none";
    //Show the try again button
    showTryAgainButton()
    return;
  }

  //Get a random unguessed state
  const randomIndex = Math.floor(Math.random() * unguessedStates.length);
  const currState = unguessedStates[randomIndex];

  //Set the image element souce based on the current category
  if (currCategory === "flags") {
    imageElement.src = currState.flagImage;
  } else if (currCategory === "flowers") {
    imageElement.src = currState.flowerImage;
  }

  currQuestion = states.indexOf(currState);
};

//Function to check the guess against the current state
checkGuess = (guess) => {
  //Get the current state
  const currState = states[currQuestion];
  //Check if correct
  if (guess === currState.state) {
    currState.guessed = true; // Mark the state as guessed

    //Display a message based on the category
    if (currCategory === "flags") {
      resultElement.textContent =
        "Correct! This flag belongs to " + currState.state + "!";
    } else if (currCategory === "flowers") {
      resultElement.textContent =
        "Correct! The flower is associated with " + currState.state + "!";
    }

    // Filtering through the correctly guessed states and checking if all states have been guessed correctly
    const correctGuessedStates = states.filter((state) => state.guessed);
    if (correctGuessedStates.length === states.length) {
      // Displays the message
      questionElement.textContent =
        "Congrats! You've guessed all the states correctly!";
      // Removes the buttons
      buttonsContainer.innerHTML = "";
      // Removes the result text
      resultElement.innerHTML = "";
      // Displays the image
      imageElement.src = "TriviaImages/Misc/accept.png";
      // Removes flag image styling after all are answered
      imageElement.classList.remove("no-styling");
      imageElement.style.border = "none";
      imageElement.style.boxShadow = "none";
      showTryAgainButton();
    } else {
      // If questions still need to be answered, it will go to the next question for this category
      currQuestion++;
      if (currCategory === "flags") {
        questionElement.textContent =
          "Next Question: What state does this flag belong to?";
        generateRandomImage();
      } else if (currCategory === "flowers") {
        questionElement.textContent =
          "Next Question: Which state does this flower belong to?";
        generateRandomImage();
      }
      livesLeft = 3;
      generateButtons();
    }
  } else {
    // If it is guessed incorrectly, the player will lose lives
    livesLeft--;

    if (livesLeft > 0) {
      // If lives are still greater than 0, the player gets more chances
      resultElement.textContent = "Wrong! Try again. Lives left: " + livesLeft;
    } else {
      // Result for if the player runs out of lives
      resultElement.textContent =
        "Game Over! The correct answer was " + currState.state + ".";
      livesLeft = 3;

      // Remove buttons and show try again button
      buttonsContainer.innerHTML = "";
      showTryAgainButton();
    }
  }
};


// Function to shuffle the array
shuffleArray = (array) => {
  const newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

//Function to generate buttons for the current category
generateButtons = () => {
  buttonsContainer.innerHTML = "";

  const unguessedStates = states.filter((state) => !state.guessed);
  // Shuffle the unguessed states
  const shuffledStates = shuffleArray(unguessedStates); 

  for (let i = 0; i < shuffledStates.length; i++) {
    const button = document.createElement("button");
    button.className = "category-button";
    button.textContent = shuffledStates[i].state;

    button.addEventListener("click", function () {
      checkGuess(shuffledStates[i].state);
    });

    buttonsContainer.appendChild(button);
  }
};

//Function to remove the hidden style in css when answers are all right or wrong
showTryAgainButton = () => {
  tryAgainButton.classList.remove("hidden")
};

//Function to Reset the game, lives, and hides the try again button
resetGame = () => {
  states.forEach((state) => {
    state.guessed = false
  });
  //Resets lives
  livesLeft = 3;
  //Hide the try again button
  tryAgainButton.classList.add("hidden")
  //Load the initial category
  loadQuestions(currCategory)
};

//Adds a click event to the try again button
tryAgainButton.addEventListener("click", resetGame)

// Calling the function to load the initial category
loadQuestions(currCategory);