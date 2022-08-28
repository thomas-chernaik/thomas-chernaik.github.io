if (typeof(Storage) !== "undefined") {
  // Code for localStorage/sessionStorage.
} else {
  window.alter("Local storage is not supported");
}
var numVisits = localStorage.getItem("numVisits");
numVisits++;
localStorage.setItem("numVisits", numVisits);
$("#numVisits").html("You have visited this page " + numVisits + " times. Interesting.")
if(numVisits == 100){
  $(".maintext").html("<p>You have unlocked the special hidden page. Why have you visited this website 100 times?")
}
