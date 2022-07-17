import { useState } from "react"
import Quality from "./qualitie"

const User = (props) => {
    let [bookmark, setBookmark] = useState(props.bookmark)

    const onToggle = () => {
        bookmark = !bookmark
        setBookmark(bookmark)
    }

    return (
        <tr>
            <td>{props.user.name}</td>
            <td>{props.user.qualities.map(q => <Quality key={q._id} color={q.color} name={q.name} />)}</td>
            <td>{props.user.profession.name}</td>
            <td>{props.user.completedMeetings}</td>
            <td>{props.user.rate}</td>
            <td><button onClick={onToggle}><i className={bookmark ? "bi bi-bookmark-fill" : "bi bi-bookmark"}></i></button></td>
            <td><button className="btn btn-danger m-2" onClick={() => props.onDelete(props.user._id)}>delete</button></td>
        </tr>
    )
}

export default User
