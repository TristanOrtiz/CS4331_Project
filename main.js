var allText;
var allTextString;
var allTextArray;
var allTextResults;
var allTextResultsString;
var allTextResultsArray;
var allTextRefill;
var allTextRefillString;
var allTextRefillArray;
var allTextPayment;
var allTextPaymentString;
var allTextPaymentArray;
var total;

function readTextFile() {
	var rawFile = new XMLHttpRequest();
	rawFile.open('GET', "accounts.txt");
	rawFile.onreadystatechange = function ()
	    {
	        if(rawFile.readyState === 4)
	        {
	            if(rawFile.status === 200 || rawFile.status == 0)
	            {
	                allText = rawFile.responseText;
									allTextString = allText.toString();
	                allTextArray = allTextString.replace(/,\s+/g,",").split(/[\n,\s+]/);
	            }
	        }
	    }
	rawFile.send(null);
}

function readTextFileResults() {
	var rawFile = new XMLHttpRequest();
	rawFile.open('GET', "TestResultFile.txt");
	rawFile.onreadystatechange = function ()
	    {
	        if(rawFile.readyState === 4)
	        {
	            if(rawFile.status === 200 || rawFile.status == 0)
	            {
	                allTextResults = rawFile.responseText;
									allTextResultsString = allTextResults.toString();
	                allTextResultsArray = allTextResultsString.split(/[\n,]/);
	            }
	        }
	    }
	rawFile.send(null);
}

function readTextFileRefill() {
	var rawFile = new XMLHttpRequest();
	rawFile.open('GET', "RefillFile.txt");
	rawFile.onreadystatechange = function ()
	    {
	        if(rawFile.readyState === 4)
	        {
	            if(rawFile.status === 200 || rawFile.status == 0)
	            {
	                allTextRefill = rawFile.responseText;
									allTextRefillString = allTextRefill.toString();
	                allTextRefillArray = allTextRefillString.replace(/,\s+/g,",").split(/[\n,\s+]/);
	            }
	        }
	    }
	rawFile.send(null);
}

function readPaymentInformationFile() {
	var rawFile = new XMLHttpRequest();
	rawFile.open('GET', "PaymentInformationFile.txt");
	rawFile.onreadystatechange = function ()
	    {
	        if(rawFile.readyState === 4)
	        {
	            if(rawFile.status === 200 || rawFile.status == 0)
	            {
	                allTextPayment = rawFile.responseText;
									allTextPaymentString = allTextPayment.toString();
	                allTextPaymentArray = allTextPaymentString.replace(/,\s+/g,",").split(/[\n,\s+]/);
	            }
	        }
	    }
	rawFile.send(null);
}

function checkLogin() {
	if (localStorage.getItem("LOGGEDIN") == "true") {
		alert("You are already logged in!");
	} else {
		window.location.replace("login.html");
	}
}

function checkAskQuestions() {
	if (localStorage.getItem("LOGGEDIN") == "true") {
		window.location.replace("askQuestions.html");
	} else {
		alert("You are not logged in to ask questions!");
	}
}

function checkTestResults() {
	if (localStorage.getItem("LOGGEDIN") == "true") {
		window.location.replace("seeTestResults.html");
	} else {
		alert("You are not logged in to see your test results!");
	}
}

function checkRequestRefills() {
	if (localStorage.getItem("LOGGEDIN") == "true") {
		window.location.replace("requestRefills.html");
	} else {
		alert("You are not logged in to request refills!");
	}
}

function checkPayBill() {
	if (localStorage.getItem("LOGGEDIN") == "true") {
		window.location.replace("payBill.html");
	} else {
		alert("You are not logged in to pay your bill!");
	}
}

function gatherInformation() {
	let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
	
	if (email == "" && password == "") 
  {
  	alert("Please fill out the fields accordingly.");
  } 
  else 
  {
		if (email == allTextArray[0] && password == allTextArray[1]) {
			localStorage.setItem("LOGGEDIN", "true");
			alert("You are now logged in. Returning to homepage.")
			window.location.replace("index.html");
		} else {
			alert("Email and Password does not match. Please try again");
		}
  }
}

function logUserOut() {
	if (localStorage.getItem("LOGGEDIN") != "true") {
		alert("You are not currently logged in!");
	} else {
		if (confirm("Are you sure you want to log out?")) {
			localStorage.setItem("LOGGEDIN", "false");
			alert("You are now logged out.");
		}
	}
}

function sendMessage() {
	localStorage.setItem("MESSAGETO", document.getElementById("employee").value);
	localStorage.setItem("MESSAGE", document.getElementById("message").value);

	let data = "To: " + localStorage.getItem("MESSAGETO") + "\nMessage: " + localStorage.getItem("MESSAGE") + "\n";

	const textToBLOB = new Blob([data], { type: 'text/plain' });
	const sFileName = 'QuestionFile.txt';

	let newLink = document.createElement("a");
	newLink.download = sFileName;

	if (window.webkitURL != null) {
		newLink.href = window.webkitURL.createObjectURL(textToBLOB);
	}
	else {
		newLink.href = window.URL.createObjectURL(textToBLOB);
		newLink.style.display = "none";
		document.body.appendChild(newLink);
	}

	newLink.click();

	alert("A copy of your message has been downloaded. You are now being redirected to the homepage.");
	window.location.replace("index.html");
}

function grabTestResults() {
	var index = document.getElementById("date").value;
	var indexActual = parseInt(index, 10);
	indexActual += 1;

	alert("\t\t\t\t\t\t\t\t\t\t\t\t\t\tTEST RESULTS \t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\n\n\t" + allTextResultsArray[indexActual]);
}

function returnHome() {
	window.location.replace("index.html");
}

function orderMedicine() {
  var selected = [];
  for (var option of document.getElementById('drug').options) {
    if (option.selected) {
			var value = parseInt(option.value);
      selected.push(value);
    }
  }
	total = selected.reduce(add, 0);
	localStorage.setItem("TOTAL", total);
	alert("The total has been added to your cart. Redirecting you to the homepage");
	window.location.replace("index.html");

}

function add(accumulator, a) {
	return accumulator + a;
}

function payBill() {
	var cardNumber = document.getElementById("cardNumber").value;
	var cvc = document.getElementById("cvc").value;

	console.log(allTextPaymentArray[0]);
	console.log(allTextPaymentArray[1]);
	console.log(allTextPaymentArray[2]);
	console.log(allTextPaymentArray[3]);

	var bill = parseInt(localStorage.getItem("TOTAL"), 10);
	var balance = parseInt(allTextPaymentArray[3], 10);

	if (bill <= balance && cardNumber == allTextPaymentArray[1] && cvc == allTextPaymentArray[2]) {
		if (confirm("Are you sure you want to pay the bill in the amount $" + localStorage.getItem("TOTAL"))) {
			alert("You have payed your bill. Returning to homepage.");
			localStorage.setItem("TOTAL", 0);
			window.location.replace("index.html");
		}
	} else if (bill > balance && cardNumber == allTextPaymentArray[1] && cvc == allTextPaymentArray[2]) {
		alert("You have insufficent funds. Cannot process payment.");
	} else {
		alert("Card number and cvs does not match");
	}

	
	// if (cardNumber == allTextPaymentArray[1] && cvc == allTextPaymentArray[2] && localStorage.getItem("TOTAL") <) {
	// 	confirm("Are you sure you want to pay the bill of $" + localStorage.getItem("TOTAL"));
	// } else if (card){
		
	// }
}