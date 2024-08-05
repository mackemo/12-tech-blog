// logging in
const loginFormHandler = async (event) => {
    event.preventDefault();
    
    // grab username and password
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    // if neither inputted, alert
    if (!username || !password) {
        alert('Please fill in both username and password');
    }
    
    // if both included, fetch the login route
    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        
        // go to homepage
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to log in');
        }
    }
};

// on clicking login, function runs
document.querySelector('form').addEventListener('submit', loginFormHandler);

