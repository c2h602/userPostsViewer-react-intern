const btn = document.getElementById('btn');
const cardList = document.querySelector('.card__list');
const usernameInput = document.getElementById('usernameInput');


async function createUsersList() {
    const username = usernameInput.value.trim();

    cardList.innerHTML = '';

    const [usersResponse, postsResponse] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users'),
        fetch('https://jsonplaceholder.typicode.com/posts')
    ]);

    const users = await usersResponse.json();
    const posts = await postsResponse.json();

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(username)
    );

    if (filteredUsers.length === 0) {
        const notFoundMessage = document.createElement('h2');
        notFoundMessage.textContent = 'User not found... Try again 🔎';
        notFoundMessage.style.textAlign = 'center';
        cardList.appendChild(notFoundMessage);
        return;
    }

    filteredUsers.forEach(user => {

        const newUser = document.createElement('li');
        newUser.classList.add('card__item');

        const userLink = document.createElement('a');
        userLink.href = `/${user.username}/${user.id}/`;
        userLink.textContent = `${user.username}`;
        userLink.classList.add('card__username');
        userLink.id = `${user.id}`;

        userLink.addEventListener('click', (event) => {
            event.preventDefault();
            history.pushState({}, '', `/${user.username}/`);
        })

        const userPosts = posts.filter(post => post.userId === user.id);

        const cardPosts = document.createElement('p');
        cardPosts.classList.add('card__posts');
        cardPosts.textContent = `${userPosts.length} posts`;

        newUser.appendChild(userLink);
        newUser.appendChild(cardPosts);
        cardList.appendChild(newUser);

    })

}

btn.addEventListener('click', createUsersList);

cardList.addEventListener('click', async (event) => {

    if (event.target.classList.contains('card__username')) {

        cardList.innerHTML = '';

        const userId = event.target.id;

        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await usersResponse.json();

        const user = users.find(x => x.id == userId);

        const cardUser = document.createElement('div');
        cardUser.classList.add('card__user');

        const username = document.createElement('h1');
        username.textContent = `${user.username}`;
        username.classList.add('card__user_username');

        const name = document.createElement('h3');
        name.textContent = `${user.name}`;
        name.classList.add('card__user_name');

        const city = document.createElement('div');
        city.textContent = `🏠 ${user.address.city}`;
        city.classList.add('card__user_city');

        const email = document.createElement('div');
        email.textContent = `📧 ${user.email}`;
        email.classList.add('card__user_email');

        const website = document.createElement('a');
        website.href = `https://${user.website}`;
        website.textContent = `🌐 ${user.website}`;
        website.classList.add('card__user_website');

        const posts = document.createElement('a');
        posts.href = `/${user.username}/posts/`;
        posts.textContent = 'Posts  ▽';
        posts.setAttribute('user-id', userId);
        posts.classList.add('card__user_posts');

        posts.addEventListener('click', (event) => {
            event.preventDefault();
            history.pushState({}, '', `/${user.username}/posts/`);
        })

        cardUser.appendChild(username);
        cardUser.appendChild(name);
        cardUser.appendChild(email);
        cardUser.appendChild(city);
        cardUser.appendChild(website);
        cardUser.appendChild(posts);
        cardList.appendChild(cardUser);

    }

})

document.body.addEventListener('click', async (event) => {

    if (event.target.classList.contains('card__user_posts')) {

        
        const userId = event.target.getAttribute('user-id');

        const [usersResponse, postsResponse, commentsResponse] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/users'),
            fetch('https://jsonplaceholder.typicode.com/posts'),
            fetch('https://jsonplaceholder.typicode.com/comments')
        ]);

        const users = await usersResponse.json();
        const posts = await postsResponse.json();
        const comments = await commentsResponse.json();

        const postsFiltered = posts.filter(post => post.userId == userId);
        const user = users.find(x => x.id == userId);

        document.querySelectorAll('.container-posts').forEach(post => post.remove());

        postsFiltered.forEach(post => {

            const containerPosts = document.createElement('div');
            containerPosts.classList.add('container-posts');

            const title = document.createElement('h2');
            title.textContent = `${post.title}`;
            title.classList.add('title-post');

            const body = document.createElement('p');
            body.textContent = `${post.body}`;
            body.classList.add('body-post');

            const commentsFiltered = comments.filter(comment => comment.postId == post.id);

            const commentsLink = document.createElement('a');
            commentsLink.href = `/comments?postId=${post.id}`;
            commentsLink.textContent = `💬 ${commentsFiltered.length}`;
            commentsLink.setAttribute('post-id', post.id);
            commentsLink.classList.add('comments-post');

            commentsLink.addEventListener('click', (event) => {
                event.preventDefault();
                history.pushState({}, '', `/${user.username}/posts/comments?postId=${post.id}`);
            })

            containerPosts.appendChild(title);
            containerPosts.appendChild(body);
            containerPosts.appendChild(commentsLink);
            document.body.appendChild(containerPosts);

        });
    }
});

document.body.addEventListener('click', async (event) => {

    if (event.target.classList.contains('comments-post')) {

        const postId = event.target.getAttribute('post-id');

        const containerPosts = event.target.parentElement;
        
        let containerComments = containerPosts.querySelector('.container-comments');

        if (containerComments) {
            if (containerComments.style.display === 'none') {
                containerComments.style.display = 'block';
            } else {
                containerComments.style.display = 'none';
            }
            return;
        }

        containerComments = document.createElement('div');
        containerComments.classList.add('container-comments');

        const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments');
        const comments = await commentsResponse.json();

        const commentsFiltered = comments.filter(comment => comment.postId == postId);

        commentsFiltered.forEach(comment => {

            const email = document.createElement('h3');
            email.textContent = `${comment.email}`;
            email.classList.add('email-comment');
    
            const body = document.createElement('p');
            body.textContent = `${comment.body}`;
            body.classList.add('body-comment');
    
            containerComments.appendChild(email);
            containerComments.appendChild(body);
    
        });

        containerPosts.appendChild(containerComments);
    
    }

});