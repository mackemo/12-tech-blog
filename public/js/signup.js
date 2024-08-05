// signing up
const signupFormHandler = async (event) => {
    event.preventDefault();
    
    // grab username, first and last name, email, and password
    const username = document.querySelector('#username-signup').value.trim();
    const first_name = document.querySelector('#firstname-signup').value.trim();
    const last_name= document.querySelector('#lastname-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // if neither inputted, alert
    if (!username || !first_name || !last_name || !email || !password) {
        alert('Please fill in all entries');
    }
    
    // if all included, fetch the signup route
    if (username && first_name && last_name && email && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username, first_name, last_name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        
        // go to homepage
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to sign up');
        }
    }
};

// on clicking signup, function runs
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

