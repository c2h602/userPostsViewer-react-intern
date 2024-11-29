interface IUser {
    id: number;
    username: string;
    name: string;
    address: {
        city: string;
    };
    email: string;
    phone: string;
    website: string;
}

interface ICardUser {
    user: IUser
}

export default function CardUser({user}: ICardUser) {
    
    return(

        <div className="card__user">

            <button className="btnBack">Back</button>

            <h1 className="card__user_username">{user.username}</h1>
            <h3 className="card__user_name">{user.name}</h3>
            <div className="card__user_city">🏠 {user.address.city}</div>
            <div className="card__user_email">📧 {user.email}</div>
            <a className="card__user_website" href='#'>🌐 {user.website}</a>
            <a className="card__user_posts" href={`/${user.username}/posts/`}>Posts</a>

        </div>
        

    )
}