 // Retrieve the leaderboard data from localStorage
localStorage.get

// Parse the retrieved data back into an array
var leaderboardData = JSON.parse(storedData) || [];

// Function to populate the leaderboard
function populateLeaderboard() {
  var leaderboardTable = document.getElementById("leaderboard").getElementsByTagName("tbody")[0];

  // Clear existing rows
  leaderboardTable.innerHTML = "";

  // Iterate through the leaderboard data and create rows
  leaderboardData.forEach(function(entry) {
    var row = leaderboardTable.insertRow();
    var rankCell = row.insertCell(0);
    var nameCell = row.insertCell(1);
    var scoreCell = row.insertCell(2);

    rankCell.innerHTML = entry.rank;
    nameCell.innerHTML = entry.name;
    scoreCell.innerHTML = entry.score;
  });
}

// Handle form submission
var nameForm = document.getElementById("name-form");
nameForm.addEventListener("submit", function(event) {
  event.preventDefault();
  var nameInput = document.getElementById("name");
  var playerName = nameInput.value;
  var playerScore = 0; // Set the initial score for the player

  // Create a new leaderboard entry object
  var entry = {
    rank: leaderboardData.length + 1, // Assign the next rank
    name: playerName,
    score: playerScore
  };


  leaderboardData.push(entry); // Add the entry to the leaderboard data array

  // Sort the leaderboard data by score (descending order)
  leaderboardData.sort(function(a, b) {
    return b.score - a.score;
  });

  // Update the leaderboard
  populateLeaderboard();

  // Save the updated leaderboard data to localStorage
  localStorage.setItem("leaderboardData", JSON.stringify(leaderboardData));

  // Clear the name input field
  nameInput.value = "";
});

// Call the populateLeaderboard() function to populate the leaderboard on page load
populateLeaderboard();

  






startQuiz();
