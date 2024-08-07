// deleting a post
const deletePost = async (event) => {
    event.preventDefault();
    
    // grab post id
    const id = window.location.toString().split('/').pop();

    // fetch delete route
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
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
document.querySelector('#delete-post').addEventListener('click', deletePost);
