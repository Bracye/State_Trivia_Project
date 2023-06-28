// Created an array of states (Starting with 13 Colonies) will hold the categories
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
// console.log(currCategory);
let livesLeft = 3;

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
    imageElement.src = states[currQuestion].flagImage;
  }
  generateButtons();
};

//Creating a function on guessing an answer for the question.
checkGuess = (guess) => {
  const currState = states[currQuestion];

  //If the guess is correct this will display the resultElement
  if (guess.toLowerCase() === currState.state.toLowerCase()) {
    if (currCategory === "flags") {
      resultElement.textContent =
        "Correct! This flag belongs to " + currState.state + "!";
    }
    //If all questions are answered correctly it will display this at the end
    if (currQuestion === states.length - 1) {
      questionElement.textContent =
        "Congrats! You've guessed all the states correctly!";
      buttonsContainer.innerHTML = "";
      imageElement.src = "TriviaImages/Misc/accept.png";
      imageElement.classList.add("no-styling");
    } else {
      // Continuing the questions till the end
      currQuestion++;
      if (currCategory === "flags") {
        questionElement.textContent =
          "Next Question: What state does this flag belong to?";
        imageElement.src = states[currQuestion].flagImage;
      }

      //Ressetting the guesses you have and generating the buttons
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

//Creating the state buttons with createElement to be generated under the class name "category-button and giving it a click event listener"
generateButtons = () => {
  buttonsContainer.innerHTML = "";

  for (let i = 0; i < states.length; i++) {
    const button = document.createElement("button");
    button.className = "category-button";
    button.textContent = states[i].state;
    button.addEventListener("click", function () {
      checkGuess(states[i].state);
    });

    buttonsContainer.appendChild(button);
  }
};

//Loads the inital question for the category
loadQuestions(currCategory);
