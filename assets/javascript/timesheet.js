  // Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCNIiMkn9HcaR2z0WKY8tpokRbgDbC8WJU",
  authDomain: "superdooperpartypooper-3f721.firebaseapp.com",
  databaseURL: "https://superdooperpartypooper-3f721.firebaseio.com",
  projectId: "superdooperpartypooper-3f721",
  storageBucket: "",
  messagingSenderId: "835144134075",
  appId: "1:835144134075:web:4c5de2eba29b5a0859289e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var name;

var role;

var startDate;

var payRate;


$('.submit-btn').on('click', function(event){
  
  event.preventDefault();

  name = $('#employeeName').val();
  role = $('#employeeRole').val();
  startDate = $('#employeeStart').val();
  payRate = $('#employeeRate').val();

  console.log(name, role, startDate, payRate);

  database.ref().push({
    name: name,
    role: role,
    startDate: startDate,
    payRate: payRate,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  })
})

database.ref().orderByChild('dateAdded').on('child_added', function(snapshot){

  var sv = snapshot.val();

  console.log(sv.name);
  console.log(sv.role);
  console.log(sv.startDate);
  console.log(sv.payRate);

  var arrayInfo = [];

  //split the start date string into separate parts
  var dateArray = sv.startDate.split('-');
  console.log(dateArray);

  var startYear = dateArray[0];
  var startMonth = dateArray[1];

  var currentDate = new Date;

  var currentYear = currentDate.getFullYear();
  var currentMonth = currentDate.getMonth();

  var monthsWorked = (((currentYear - startYear)*12) + (currentMonth - startMonth)) - 1;

  var totalPay = monthsWorked * sv.payRate;
  console.log(monthsWorked);

  arrayInfo.push(sv.name, sv.role, sv.startDate, monthsWorked, sv.payRate, totalPay)

  var newRow = $('<tr>');

  arrayInfo.forEach(function(info){
    newRow.append('<td>' + info + '</td>')
  })

  $('#table').append(newRow);
  
})