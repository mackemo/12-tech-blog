// deleting a post
const deletePostFormHandler = async (event) => {
    event.preventDefault();
    
    // grab post id
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // fetch delete route
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
    });
        
        // go to dashboard
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete post');
        }
};

// on clicking delete, function runs
document.querySelector('#delete-post').addEventListener('submit', deletePostFormHandler);
