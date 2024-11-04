// In-memory database for user accounts
const userDatabase = {};

document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("reg-username").value;
    const password = document.getElementById("reg-password").value;
    const alertBox = document.getElementById("register-alert");

    if (userDatabase[username]) {
        alertBox.textContent = "Username already taken. Please choose another one.";
    } else {
        userDatabase[username] = password;
        alertBox.textContent = "Registration successful!";
        alertBox.style.color = "green";
        setTimeout(showLogin, 1000); // Redirect to login after 1 second
    }
});

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const alertBox = document.getElementById("login-alert");

    if (userDatabase[username] && userDatabase[username] === password) {
        alertBox.textContent = "Login successful!";
        alertBox.style.color = "green";
        setTimeout(showAccount, 1000); // Show account section after 1 second
    } else {
        alertBox.textContent = "Incorrect username or password. Please try again.";
        alertBox.style.color = "red";
    }
});

function showLogin() {
    document.getElementById("register-section").style.display = "none";
    document.getElementById("login-section").style.display = "block";
    document.getElementById("account-section").style.display = "none";
}

function showRegister() {
    document.getElementById("register-section").style.display = "block";
    document.getElementById("login-section").style.display = "none";
    document.getElementById("account-section").style.display = "none";
}

function showAccount() {
    document.getElementById("register-section").style.display = "none";
    document.getElementById("login-section").style.display = "none";
    document.getElementById("account-section").style.display = "block";
}

function logout() {
    showLogin();
}


// Show and hide various sections for navigation
function showLogin() { toggleVisibility("login-section"); }
function showRegister() { toggleVisibility("register-section"); }
function showAccount() { toggleVisibility("account-section"); }
function showTransfer() { toggleVisibility("transfer-section"); }
function showSettings() { toggleVisibility("settings-section"); }
function showPinSetup() { toggleVisibility("pin-setup-section"); }
function showStateID() { toggleVisibility("state-id-section"); }

function toggleTransactionHistory() {
    const history = document.getElementById("transaction-history");
    history.style.display = history.style.display === "none" ? "block" : "none";
}

// Register and login logic (simplified)
document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault();
    // Registration logic
});

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    // Login logic
});

// Go back to previous screen
function goBack() { showAccount(); }

function toggleVisibility(id) {
    const sections = ["login-section", "register-section", "account-section", "transfer-section", "settings-section", "pin-setup-section", "state-id-section"];
    sections.forEach(section => document.getElementById(section).style.display = (section === id) ? "block" : "none");
}

function logout() { showLogin(); }
