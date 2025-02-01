const buttons = document.querySelectorAll(".btn");

let computer_sequence = [];
let user_sequence = [];
let level = 0;

// Start the game when a key is pressed
document.addEventListener("keydown", startGame);

function startGame() {
    level = 0;
    computer_sequence = [];
    user_sequence = [];
    document.querySelector("#level-title").textContent = `Level ${level}`;
    nextSequence(); // Generate the first sequence
}

// Generate the next step in the sequence
function nextSequence() {
    user_sequence = []; // Reset the user's sequence for the new round
    level++;
    document.querySelector("#level-title").textContent = `Level ${level}`;

    // Generate a random color and add it to the computer sequence
    const colors = ["red", "blue", "green", "yellow"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    computer_sequence.push(randomColor);

    // Play the computer's sequence
    computer_sequence.forEach((color, index) => {
        setTimeout(() => {
            playSound(color);
            animatePress(color);
        }, index * 600); // Delay each color in the sequence
    });
}

// Attach event listeners dynamically to each button
buttons.forEach(button => {
    button.addEventListener("click", function () {
        const color = button.id; // Get the button's ID (e.g., "green", "red")
        handleUserClick(color); // Handle the user's click
    });
});

// Function to handle user's click
function handleUserClick(color) {
    user_sequence.push(color); // Add the clicked color to the user's sequence
    playSound(color); // Play the sound for the clicked color
    animatePress(color); // Add an animation effect

    // Check the user's input against the computer sequence
    checkUserInput(user_sequence.length - 1);
}

// Function to check the user's input
function checkUserInput(currentIndex) {
    if (user_sequence[currentIndex] === computer_sequence[currentIndex]) {
        // If the user finished the sequence and it is correct
        if (user_sequence.length === computer_sequence.length) {
            setTimeout(() => {
                nextSequence(); // Generate the next sequence
            }, 1000);
        }
    } else {
        // If the user makes a mistake
        gameOver();
    }
}

// Function to handle game over
function gameOver() {
    playSound("wrong");
    document.querySelector("body").classList.add("game-over");
    document.querySelector("#level-title").textContent = "Game Over! Press Any Key to Restart";

    setTimeout(() => {
        document.querySelector("body").classList.remove("game-over");
    }, 200);

// Restart the game
}

// Function to play sound
function playSound(color) {
    const audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}

// Function to animate button press
function animatePress(color) {
    const button = document.getElementById(color);
    button.classList.add("pressed");
    setTimeout(() => {
        button.classList.remove("pressed");
    }, 100);
}





