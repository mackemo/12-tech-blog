// deleting a comment
const deleteComment = async (event) => {
    if (!event.target.matches('.delete-comment')) return;
    event.preventDefault();
    
    // grab comment id
    const id = event.target.getAttribute('data-id');
    console.log(`Attempting to delete comment with ID: ${id}`);

    // fetch delete route
    const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
        
        // reload page
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to delete comment');
        }
};

// on clicking delete, function runs for each button
document.querySelectorAll('.delete-comment').forEach(button => {
    button.addEventListener('click', deleteComment);
});