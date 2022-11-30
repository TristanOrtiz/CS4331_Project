var allText;
var allTextString;
var allTextArray;

function readTextFile() {
	var rawFile = new XMLHttpRequest();
	rawFile.open('GET', "test.txt");
	rawFile.onreadystatechange = function ()
	    {
	        if(rawFile.readyState === 4)
	        {
	            if(rawFile.status === 200 || rawFile.status == 0)
	            {
	                allText = rawFile.responseText;
									allTextString = allText.toString();
	                allTextArray = allTextString.split(/[, ]+/);
									console.log(allTextArray[0]);
									console.log(allTextArray[1]);
	            }
	        }
	    }
	rawFile.send(null);
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
		}
	}
}

console.log(localStorage.getItem("LOGGEDIN"));
