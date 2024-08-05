// editting a post
const editPostFormHandler = async (event) => {
    event.preventDefault();
    
    // grab title and text
    const title = document.querySelector('#edit-title').value;
    const text = document.querySelector('#edit-content').value;

    // if neither inputted, alert
    if (!title || !text) {
        alert('Please fill in title and text');
    }
    
    // grab post id
    const id = window.location.toString().split('/').pop();

    // if both included, fetch the put route
    if (title && text) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ id, title, text }),
            headers: { 'Content-Type': 'application/json' },
        });
        
        // go to dashboard
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to edit post');
        }
    }
};

// on clicking save, function runs
document.querySelector('#edit-post-form').addEventListener('submit', editPostFormHandler);