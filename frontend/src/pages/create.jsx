import React, { useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

function Create() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        birthday: '',
        department_id: '' 
    });

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        axios.post('/add_user', values)
        .then((res)=>{
            navigate('/')
            console.log(res)
        })
        .catch((err)=>console.log(err))
    }
  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
        <div className="row w-100 justify-content-center">
            <div className="col-md-6">
            <div className="card shadow">
                <div className="card-header d-flex justify-content-between align-items-center bg-white">
                <h3 className="mb-0">Add Student</h3>
                <Link to="/" className="btn btn-outline-primary btn-sm">
                    Home
                </Link>
                </div>
                <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        onChange={e => setValues({ ...values, name: e.target.value })}
                        required
                    />
                    </div>
                    <div className="form-group mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        onChange={e => setValues({ ...values, email: e.target.value })}
                        required
                    />
                    </div>
                    <div className="form-group mb-4">
                    <label htmlFor="birthday" className="form-label">Birthday</label>
                    <input
                        type="date"
                        name="birthday"
                        className="form-control"
                        onChange={e => setValues({ ...values, birthday: e.target.value })}
                        required
                    />
                    </div>
                    <div className="form-group mb-3">
                    <label htmlFor="department_id" className="form-label">Department</label>
                    <select
                        className="form-select"
                        name="department_id"
                        value={values.department_id }//|| ''
                        onChange={e => setValues({ ...values, department_id: e.target.value })}
                        // required
                    >
                        <option value="">Select Department</option>
                        <option value="1">IT</option>
                        <option value="2">ABM</option>
                        <option value="3">HR</option>
                    </select>
                    </div>
                    <div className="d-grid">
                    <button type="submit" className="btn btn-success">
                        Save
                    </button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Create