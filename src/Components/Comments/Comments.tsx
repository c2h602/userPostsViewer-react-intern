import { IComment } from '../../types/types';


export default function Comments({email, body}: IComment) {

    return(
        <div className="container-comments">
            <h3 className="email-comment">{email}</h3>
            <p className="body-comment">{body}</p>
        </div>
    )
}