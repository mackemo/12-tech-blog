// creating a comment
const createCommentFormHandler = async (event) => {
    event.preventDefault();
    
    // grab comment
    const comment = document.querySelector('#comment').value;

    // if not inputted, alert
    if (!comment) {
        alert('Please fill in comment text');
    }
    
    // if included, fetch the post route
    if (comment) {
        const response = await fetch('/api/comment/', {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: { 'Content-Type': 'application/json' },
        });
        
        // relaod page
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create post');
        }
    }
};

// on clicking comment, function runs
document.querySelector('#add-comment').addEventListener('submit', createCommentFormHandler);