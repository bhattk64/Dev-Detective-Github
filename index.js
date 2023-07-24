// variables fetch
const searchbar = document.querySelector(".searchbar-container");// Fetches the DOM element with class "searchbar-container" and stores it in the constant "searchbar".
const profilecontainer = document.querySelector(".profile-container");
const root = document.documentElement.style;
const get = (param) => document.getElementById(`${param}`);// Defines a function "get" that takes a parameter and returns the DOM element with the corresponding ID.

// Constants for API URL and various DOM elements
const url = "https://api.github.com/users/";// Sets the base URL for the GitHub API
const noresults = get("no-results");
const btnmode = get("btn-mode");
const modetext = get("mode-text");
const modeicon = get("mode-icon");
const btnsubmit = get("submit");
const input = get("input");
const avatar = get("avatar");
const userName = get("name");
const user = get("user");
const date = get("date");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];// Defines an array with month names


// Constants for various other DOM elements
const bio = get("bio");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const user_location = get("location");  
const page = get("page");
const twitter = get("twitter");
const company = get("company");
let darkMode = false; // Initializes the variable "darkMode" with the value false.

// Event Listeners
btnsubmit.addEventListener("click", function () { // Adds a click event listener to the "btnsubmit" element. When clicked, the provided function will be executed.
    if (input.value !== "") { // Checks if the input value is not empty and calls the "getUserData" function with the GitHub API URL + input value.
      getUserData(url + input.value);
    }
  });
  input.addEventListener("keydown",function (e) {  // Adds a keydown event listener to the "input" element. When a key is pressed, the provided function will be executed.
      if (e.key == "Enter") {  // Checks if the Enter key was pressed and the input value is not empty, then calls the "getUserData" function.
        if (input.value !== "") {
          getUserData(url + input.value);
        }
      }
    },
    false
  );
  input.addEventListener("input", function () { // Adds an input event listener to the "input" element. When the input value changes, the provided function will be executed.
    // The function hides the "no-results" element (used to display a message when no data is found).
    noresults.style.display = "none";
  });
  
  btnmode.addEventListener("click", function () { // Adds a click event listener to the "btnmode" element. When clicked, the provided function will be executed.
    // The function toggles between dark mode and light mode by calling "darkModeProperties" or "lightModeProperties" functions.
    if (darkMode == false) {
      darkModeProperties();
    } else {
      lightModeProperties();
    }
  });

  //API CALL
function getUserData(gitUrl) { // Makes an API call to the provided GitHub API URL and fetches user data.
  // Once the data is fetched, it logs the data to the console and calls the "updateProfile" function with the data.
    fetch(gitUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        updateProfile(data);
      })
      .catch((error) => {
        throw error;
      });
  }
  //RENDER
function updateProfile(data) {
  // Updates the UI with the fetched user data if a valid user is found.
  // If the user is not found, displays the "no-results" element.
  // Helper function "checkNull" checks if a parameter is null or empty and adjusts the styling if needed.
  // The function updates various DOM elements with user data and toggles CSS classes to show/hide searchbar and profile container elements.
    if (data.message !== "Not Found") {
      noresults.style.display = "none";
      function checkNull(param1, param2) {
        if (param1 === "" || param1 === null) {
          param2.style.opacity = 0.5;
          param2.previousElementSibling.style.opacity = 0.5;
          return false;
        } else {
          return true;
        }
      }
      avatar.src = `${data.avatar_url}`;
      userName.innerText = data.name === null ? data.login : data.name;
      user.innerText = `@${data.login}`;
      user.href = `${data.html_url}`;
      datesegments = data.created_at.split("T").shift().split("-");
      date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
      bio.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`;
      repos.innerText = `${data.public_repos}`;
      followers.innerText = `${data.followers}`;
      following.innerText = `${data.following}`;
      user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not Available";
      page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
      page.href = checkNull(data.blog, page) ? data.blog : "#";
      twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
      twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
      company.innerText = checkNull(data.company, company) ? data.company : "Not Available";
      searchbar.classList.toggle("active");
      profilecontainer.classList.toggle("active");
    } else {
      noresults.style.display = "block";
    }
  }

  //SWITCH TO DARK MODE - activateDarkMode()
function darkModeProperties() {
  // Updates CSS variables to switch to dark mode and sets "darkMode" variable to true.
  // It also updates the local storage to remember the dark mode preference.
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    modetext.innerText = "LIGHT";
    modeicon.src = "./assets/images/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    darkMode = true;
    console.log("darkmode changed to " + darkMode);
    localStorage.setItem("dark-mode", true);
  
    console.log("setting dark mode to true");
  
  }
  //SWITCH TO LIGHT MODE - activateLightMode() 
function lightModeProperties() {
  // Updates CSS variables to switch to light mode and sets "darkMode" variable to false.
  // It also updates the local storage to remember the light mode preference.
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    modetext.innerText = "DARK";
    modeicon.src = "./assets/images/moon-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode = false;
    console.log("darkmode changed to " + darkMode);
  
    localStorage.setItem("dark-mode", false);
    console.log("setting dark mode to false");
  }
//INITIALISE UI
function init() { // Call the init function to initialize the UI when the script is loaded.
    //initialise dark-mode variable to false;
    //darkMode = true -> dark mode enable karna h 
    //darMode = false -> light mode enable karna h 
    darkMode = false;
  
    //HW
  // const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  
    const value = localStorage.getItem("dark-mode");
  
    if(value === null) {
      console.log("null bhitra");
      localStorage.setItem("dark-mode", darkMode);
      lightModeProperties();
    }
    else if(value == "true") {
      console.log("truer ko bhitra");
      darkModeProperties();
    }
    else if(value == "false") {
      console.log("false ko bhitra");
      lightModeProperties();
    }
  
  
    //by default, kul chandra bhatt k0 info show garcha yo  UI ma
    getUserData(url + "bhattk64");
  }
  
  init();  