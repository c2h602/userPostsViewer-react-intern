const searchBtn = document.querySelector<HTMLElement>('searchBtn');
const cardList = document.querySelector<HTMLElement>('.card__list');
const searchInput = document.querySelector<HTMLInputElement>('search__input');

function createUsersList() {

    if (!cardList || !searchInput) return;

    const username = searchInput.value.trim();

    cardList.innerHTML = '';

    const usersPromise = fetch('https://jsonplaceholder.typicode.com/users');
    const postsPromise = fetch('https://jsonplaceholder.typicode.com/posts');

    Promise.all([usersPromise, postsPromise])
    .then(([usersResponse, postsResponse]) => 
        Promise.all([usersResponse.json(), postsResponse.json()])
    )
    .then(([users, posts]) => {
        const filteredUsers = users.filter(user: {username: String}) =>
            user.username.toLowerCase().includes(username)
        );

        if (filteredUsers.length === 0) {
            const notFoundMessage = document.createElement('h2');
            notFoundMessage.textContent = 'User not found... Try again 🔎';
            notFoundMessage.style.textAlign = 'center';
            cardList.appendChild(notFoundMessage);
            return;
        }
    
        filteredUsers.forEach(user: {id: Number, username: String}) => {
    
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
    
        });
    };


   

}
