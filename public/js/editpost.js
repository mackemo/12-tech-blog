// editting a post
const editPostFormHandler = async (event) => {
    event.preventDefault();
    
    // grab title and text
    const title = document.querySelector('#edit-title').value;
    const text = document.querySelector('#edit-text').value;

    // if neither inputted, alert
    if (!title || !text) {
        alert('Please fill in title and text');
    }
    
    // grab post id
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // if both included, fetch the post route
    if (title && text) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'POST',
            body: JSON.stringify({ title, text }),
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
document.querySelector('#save-post').addEventListener('submit', editPostFormHandler);