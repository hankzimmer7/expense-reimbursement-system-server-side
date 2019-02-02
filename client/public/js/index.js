// Start scripts once the document loads
document.addEventListener("DOMContentLoaded", function (event) {
    console.log('Scripts loaded');
    main();
});

// Main Function
let main = () => {
    
    // Login Functionality
    let loginButton = document.getElementById('loginButton');
    console.log('Login button', loginButton);
    loginButton.addEventListener('click', function (event) {
        login();
    })
}

// Login Function
let login = () => {
    event.preventDefault();
    console.log('clicked login button');
    let usernameInput = document.getElementById('usernameInput').value;
    console.log('Username field:', usernameInput);
    let passwordInput = document.getElementById('passwordInput').value;
    console.log('Password field:', passwordInput);
    let user = {
        "username": usernameInput,
        "password": passwordInput
    }
    console.log('User:', user);
    axios.post('/login', user)
        .then((data) => {
            console.log('data', data);
        });
}