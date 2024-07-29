// deleting a comment
const deleteComment = async (event) => {
    event.preventDefault();
    
    // grab comment id
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // fetch delete route
    const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
    });
        
        // go to dashboard
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete comment');
        }
};

// on clicking delete, function runs
document.querySelector('#delete-comment').addEventListener('submit', deleteComment);
