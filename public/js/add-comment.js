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
        const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({
                post_id: window.location.pathname.split('/').pop(),
                comment_text: comment
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        
        // reload page
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to comment');
        }
    }
};

// on clicking comment, function runs
document.querySelector('#add-comment').addEventListener('click', createCommentFormHandler);