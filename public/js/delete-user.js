// deleting a user
const deleteUser = async (event) => {
    event.preventDefault();
    
    // grab user id
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // fetch delete route
    const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
    });
        
        // go to homepage
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to delete user');
        }
};

// on clicking delete, function runs
document.querySelector('#delete-usert').addEventListener('submit', deleteUser);
