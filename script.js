var config = {
    apiKey: "AIzaSyBPHFB41rhPqMRdpkI159rEtkqgPwyS6R0",
    authDomain: "trainscheduler-85d82.firebaseapp.com",
    databaseURL: "https://trainscheduler-85d82.firebaseio.com",
    projectId: "trainscheduler-85d82",
    storageBucket: "",
    messagingSenderId: "887346715979"
};

firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Perform initialize tasks
// Variables
var trainName = "";
var destination = "";
var frequency = "";
var firstTrain = "";

var calculateTime = function(firstTrain, frequency) {
   var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years")
    console.log(firstTimeConverted)

    var currentTime = moment()
    console.log("Current Time: " + moment(currentTime).format("hh:mm"))

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes")
    console.log("difference in time: " + diffTime)

    var tRemainder = diffTime % frequency

    var tMinutesTillTrain = frequency - tRemainder
    console.log("minutes Till Train: " + tMinutesTillTrain)

    var nextTrain = moment().add(tMinutesTillTrain, "minutes")
    console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"))

    console.log(nextTrain)


    return myObj = {
            trainName: trainName,
            destination: destination,
            tMinutesTillTrain: tMinutesTillTrain,
            nextTrain: nextTrain.toString(),
        }
}

$("#addTrain").on("click", function() {

        event.preventDefault();

        trainName = $("#trainName").val().trim();
        destination = $("#destination").val().trim();
        firstTrain = parseInt($("#firstTrain").val().trim());
        frequency = parseInt($("#frequency").val().trim());

        var results = calculateTime(firstTrain, frequency)
        console.log(results)
            // Save the new price in Firebase
        database.ref().push({
            name: results.trainName,
            destination: results.destination,
            //minutesAway: results.tMinutesTillTrain,
           // ArrivalTime: results.nextTrain.toString(),
            firstTrain: firstTrain,
            frequency: frequency,
           // dateAdded: firebase.database.ServerValue.TIMESTAMP
        });


    }) //end of add train

database.ref().orderByChild("dateAdded").limitToLast(10).on("child_added", function(childsnapshot) {
//for (i=0; i<childsnapshot.length; i++){

//var trainObject = calculateTime(firstTrain, frequency)
  
//console.log(trainObject)

    var tbl = $("<tr>");
    var tdname = $("<td>");
    tdname.html(childsnapshot.val().name);
    tbl.append(tdname);

    var tdDestination = $("<td>");
    tdDestination.html(childsnapshot.val().destination);
    tbl.append(tdDestination);

    var tdNextArrival = $("<td>")
    tdNextArrival.html(childsnapshot.val().ArrivalTime);
    tbl.append(tdNextArrival);

    var tdMinutesAway = $("<td>")
    tdMinutesAway.html(childsnapshot.val().minutesAway);
    tbl.append(tdMinutesAway)

    $(".trainInfo").append(tbl);
//}
})