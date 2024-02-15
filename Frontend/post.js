document.addEventListener('DOMContentLoaded', () => {
    const userId = getUserIdFromUrl();
    fetchUserPosts(userId);
    
    const bulkAddBtn = document.getElementById('bulkAddBtn');
    const downloadExcelBtn = document.getElementById('downloadExcelBtn');
    
    bulkAddBtn.addEventListener('click', () => {
        bulkAddPosts(userId);
    });
    
    downloadExcelBtn.addEventListener('click', () => {
        downloadExcel(userId);
    });
});

function getUserIdFromUrl() {
    // Get the userId from the URL
    const url = window.location.href;
    const parts = url.split('/');
    return parts[parts.length - 1];
}

async function fetchUserPosts(userId) {
    try {
        // Fetch user posts from the backend
        const response = await fetch(`/api/posts/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user posts');
        }
        const data = await response.json();
        
        // Display user information and posts
        displayUserInfo(data.user);
        displayUserPosts(data.posts);
        
        // Show/hide buttons based on data availability
        toggleButtons(data.posts);
    } catch (error) {
        console.error('Error fetching user posts:', error);
    }
}

function displayUserInfo(user) {
    // Display user information
    const postInfo = document.getElementById('postInfo');
    postInfo.innerHTML = `
        <div>
            <strong>Name:</strong> ${user.name}
        </div>
        <div>
            <strong>Company:</strong> ${user.company.name}
        </div>
    `;
}

function displayUserPosts(posts) {
    // Display user posts
    const postInfo = document.getElementById('postInfo');
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        `;
        postInfo.appendChild(postDiv);
    });
}

async function bulkAddPosts(userId) {
    try {
        // Send POST request to bulk add posts
        const response = await fetch(`/api/posts/${userId}/bulkAdd`, {
            method: 'POST'
        });
        if (!response.ok) {
            throw new Error('Failed to add posts');
        }
        
        // Reload the page to display updated data
        location.reload();
    } catch (error) {
        console.error('Error adding posts:', error);
    }
}

async function downloadExcel(userId) {
    try {
        // Initiate download of Excel file
        window.location.href = `/api/posts/${userId}/downloadExcel`;
    } catch (error) {
        console.error('Error downloading Excel file:', error);
    }
}

function toggleButtons(posts) {
    const bulkAddBtn = document.getElementById('bulkAddBtn');
    const downloadExcelBtn = document.getElementById('downloadExcelBtn');
    
    if (posts.length > 0) {
        // If posts exist, hide Bulk Add button and show Download In Excel button
        bulkAddBtn.style.display = 'none';
        downloadExcelBtn.style.display = 'block';
    } else {
        // If no posts exist, show Bulk Add button and hide Download In Excel button
        bulkAddBtn.style.display = 'block';
        downloadExcelBtn.style.display = 'none';
    }
}
