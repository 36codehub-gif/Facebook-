const postInput = document.getElementById('post-input');
const publishBtn = document.getElementById('publish-btn');
const newsFeed = document.getElementById('news-feed');

// Local storage or array for temporary post storage
let posts = [
    {
        id: 1,
        author: "John Doe",
        time: "2 hrs ago",
        content: "Welcome to my new Facebook clone built on mobile!",
        likes: 5,
        isLiked: false
    }
];

// Function to Render Posts
function renderPosts() {
    newsFeed.innerHTML = "";

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post-card');

        postElement.innerHTML = `
            <div class="post-header">
                <img src="https://via.placeholder.com/40" class="profile-pic">
                <div>
                    <div class="user-name">${post.author}</div>
                    <div class="post-time">${post.time}</div>
                </div>
            </div>
            <div class="post-content">${post.content}</div>
            <div style="font-size: 12px; color: #65676b; margin-bottom: 5px;">
                👍 <span id="like-count-${post.id}">${post.likes}</span> Likes
            </div>
            <div class="post-footer">
                <button class="like-btn ${post.isLiked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                    <i class="fas fa-thumbs-up"></i> ${post.isLiked ? 'Liked' : 'Like'}
                </button>
                <button class="like-btn"><i class="fas fa-comment"></i> Comment</button>
            </div>
        `;

        newsFeed.appendChild(postElement);
    });
}

// Function to Create New Post
publishBtn.addEventListener('click', () => {
    const text = postInput.value.trim();
    if (text === "") return;

    const newPost = {
        id: Date.now(),
        author: "You",
        time: "Just now",
        content: text,
        likes: 0,
        isLiked: false
    };

    posts.unshift(newPost); // Add at top of array
    postInput.value = "";
    renderPosts();
});

// Function to Handle Likes
function toggleLike(id) {
    const post = posts.find(p => p.id === id);
    if (post) {
        post.isLiked = !post.isLiked;
        post.likes += post.isLiked ? 1 : -1;
        renderPosts();
    }
}

// Initial Render
renderPosts();
