import { useState } from 'react'
import api from '../api'


const Users = () => {

    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter(user => user._id !== userId))
    }

    const renderPhrase = () => {
        if (users.length === 0) {
            return <span className='badge bg-danger'>Никто с тобой не тусанет</span>
        } else if (users.length === 2 || users.length === 3 || users.length === 4) {
            return <span className='badge bg-primary'>{users.length} человека тусанут с тобой сегодня</span>
        } else return <span className='badge bg-primary'>{users.length} человек тусанет с тобой сегодня</span>
    }

    return (
        <>
            <h2>{renderPhrase()}</h2>
            <table className="table">
                {users.length === 0
                    ? null
                    : <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                }
                <tbody>
                    {users.map((user, i) => (
                        <tr key={i}>
                            <td>{user.name}</td>
                            <td>{user.qualities.map((q, i) => <span key={i} className={`badge bg-${q.color} m-1`}>{q.name}&nbsp;</span>)}</td>
                            <td>{user.profession.name}</td>
                            <td>{user.completedMeetings}</td>
                            <td>{user.rate}</td>
                            <td><button className="btn btn-danger m-2" onClick={() => handleDelete(user._id)}>delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Users
