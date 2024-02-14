document.addEventListener('DOMContentLoaded', () => {
    const userId = getUserIdFromUrl(); // Function to extract userId from URL
    
    fetchPosts(userId);
    
    const bulkAddBtn = document.getElementById('bulkAddBtn');
    const downloadExcelBtn = document.getElementById('downloadExcelBtn');
    
    bulkAddBtn.addEventListener('click', () => {
        // Function to handle bulk adding of posts to the database
    });
    
    downloadExcelBtn.addEventListener('click', () => {
        // Function to handle downloading of posts in Excel format
    });
});

function getUserIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('userId');
}

async function fetchPosts(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        const posts = await response.json();

        const postInfo = document.getElementById('postInfo');
        postInfo.innerHTML = '';

        posts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.classList.add('postCard');
            postCard.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
            `;
            postInfo.appendChild(postCard);
        });
    } catch (error) {
        console.error(error);
    }
}
