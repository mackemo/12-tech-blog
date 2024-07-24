// logging out
const logout = async () => {
    // fetch logout route
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    
    // go to login page
    if (response.ok) {
      document.location.replace('/login');

    } else {
      alert('Failed to logout');
    }
};

// on clicking logout, function runs
document.querySelector('#logout').addEventListener('click', logout);