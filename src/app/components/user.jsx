import { useState } from "react"
import Quality from "./qualitie"

const User = (props) => {

    const [iconClassName, setIconClassName] = useState("bi bi-bookmark")

    const onToggle = () => {
        let newClassName
        if (iconClassName === "bi bi-bookmark") {
            newClassName = "bi bi-bookmark-fill"
        } else {
            newClassName = "bi bi-bookmark"
        }
        setIconClassName(newClassName)
    }

    return (
        <tr>
            <td>{props.user.name}</td>
            <td>{props.user.qualities.map(q => <Quality key={q._id} color={q.color} name={q.name} />)}</td>
            <td>{props.user.profession.name}</td>
            <td>{props.user.completedMeetings}</td>
            <td>{props.user.rate}</td>
            <td><button onClick={onToggle}><i className={iconClassName}></i></button></td>
            <td><button className="btn btn-danger m-2" onClick={() => props.onDelete(props.user._id)}>delete</button></td>
        </tr>
    )
}

export default User
