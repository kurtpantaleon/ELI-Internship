import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

function Home() {
    const [data, setData] = useState([]);
    const [deleted, setDeleted] = useState(true)
    useEffect(()=>{
      if(deleted){
    setDeleted(false)
      axios.get('/students').then((res)=>{
    setData(res.data)
    })
    .catch((err)=>console.log(err))
    }}, [deleted])

    function handleDelete(id){
        axios.delete(`/delete/${id}`)
        .then((res)=>{
            setDeleted(true)
        })
        .catch((err)=> console.log(err))
    }
  return (
    <div className='container-fluid bg-light vh-100 vw-100'>
        <h3>Students</h3>
        <div className='d-flex justify-content-end my-2'>
            <Link className='btn btn-success' to='/create'>Add Student</Link>
        </div>
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Birthday</th>
              <th scope="col">Department</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{new Date(student.birthday).toLocaleDateString()}</td>
                <td>{student.department || 'Not Assigned'}</td>
                <td>
                  <Link className="btn btn-sm btn-info mx-1" to={`/view/${student.id}`}>Read</Link>
                  <Link className="btn btn-sm btn-warning mx-1" to={`/edit/${student.id}`}>Edit</Link>
                  <button className="btn btn-sm btn-danger mx-1" onClick={()=>handleDelete(student.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default Home