// Steps to complete:
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase

moment().format();

var firebaseConfig = {
  apiKey: "AIzaSyAvUzg15aSPlb8D17e8lB7ecAfHlZkIQnk",
  authDomain: "trainscheduler-1dac8.firebaseapp.com",
  databaseURL: "https://trainscheduler-1dac8.firebaseio.com",
  projectId: "trainscheduler-1dac8",
  storageBucket: "",
  messagingSenderId: "798328649505",
  appId: "1:798328649505:web:55d81e839dcce023"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// 2. Submit button for adding trains
$("#submit-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = moment($("#start-input").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: destination,
    start: firstTrain,
    frequency: frequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().start;
  var frequency = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  // Calculate nextArrival
  var now = new Date (Date.now());
  var formatted = now.getHours() + ":" + now.getMinutes() + ":";
  var nextArrival = formatted + minutesAway;

  // Prettify the nextArrival
  var nextArrivalPretty = moment.unix(nextArrival).format("HH:mm");
  console.log(nextArrivalPretty);

  // This code below is from previous Timesheet code...
  var firstTrain = moment().diff(moment(firstTrain, "X"), "minutes");

  // Calculate minutesAway: nextArrival minus current time
  var minutesAway = nextArrival-moment.unix();
  console.log(minutesAway);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    // $("<td>").text(trainStartPretty),
    $("<td>").text(frequency),
    $("<td>").text(nextArrivalPretty),
    $("<td>").text(minutesAway)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case
