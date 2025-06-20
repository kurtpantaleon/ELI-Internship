import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function Read() {
    const [data, setData] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        axios
        .get(`/get_students/${id}`)
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => console.log(err));
    }, [id]);

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
        <div className="row w-100 justify-content-center">
            <div className="col-md-6">
            <div className="card shadow">
                <div className="card-header d-flex justify-content-between align-items-center bg-white">
                <h4 className="mb-0">User Details</h4>
                <Link to="/" className="btn btn-outline-success btn-sm">
                    Back
                </Link>
                </div>
                <div className="card-body">
                {data.map((student) => (
                    <ul className="list-group" key={student.id}>
                    <li className="list-group-item">
                        <b>ID:</b> {student.id}
                    </li>
                    <li className="list-group-item">
                        <b>Name:</b> {student.name}
                    </li>
                    <li className="list-group-item">
                        <b>Email:</b> {student.email}
                    </li>
                    <li className="list-group-item">
                        <b>Birthday:</b> {new Date(student.birthday).toLocaleDateString()}
                    </li>
                    </ul>
                ))}
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Read