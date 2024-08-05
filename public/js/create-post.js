// creating a post
const createPostFormHandler = async (event) => {
    event.preventDefault();
    
    // grab title and text
    const title = document.querySelector('#title').value;
    const text = document.querySelector('#text').value;

    // if neither inputted, alert
    if (!title || !text) {
        alert('Please fill in title and text');
    }
    
    // if both included, fetch the post route
    if (title && text) {
        const response = await fetch('/api/posts/', {
            method: 'POST',
            body: JSON.stringify({ post_title: title, post_text: text }),
            headers: { 'Content-Type': 'application/json' },
        });
        
        // go to dashboard
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create post');
        }
    }
};

// on clicking create, function runs
document.querySelector('.create-post-form').addEventListener('submit', createPostFormHandler);