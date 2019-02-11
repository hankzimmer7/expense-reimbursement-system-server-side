// Start scripts once the document loads
document.addEventListener("DOMContentLoaded", () => {
    main();
});

// Main Function
const main = () => {
    // Login Functionality
    let loginButton = document.getElementById('loginButton');
    loginButton.addEventListener('click', () => {
        login();
    })

    // Update the My Reimbursement Link for the current user
    updateMyReimbursementsLink();

}

// Login Function
const login = () => {
    event.preventDefault();
    let usernameInput = document.getElementById('usernameInput').value;
    let passwordInput = document.getElementById('passwordInput').value;
    let user = {
        "username": usernameInput,
        "password": passwordInput
    }
    const loginStatus = document.getElementById('login-status');
    axios.post('/login', user)
        .then((data) => {
            if (data.status === 200) {
                loginStatus.innerText = `Successfully logged in as ${user.username}!`
                loginStatus.className = 'green-text';
                updateMyReimbursementsLink();
            }
        })
        .catch((err) => {
            console.log("error", err);
            loginStatus.innerText = "Username or Password incorrect!"
            loginStatus.className = 'red-text';
        });
    document.getElementById('usernameInput').value = '';
    document.getElementById('passwordInput').value = '';
}

// Update link to my reimbursements for the current user
const updateMyReimbursementsLink = () => {
    let reimbursementsLink = document.getElementById('my-reimbursements-link');
    axios.get('/login/info')
    .then((data) => {
        reimbursementsLink.href = `/reimbursements/author/userId/${data.data.userId}`;
    })
}