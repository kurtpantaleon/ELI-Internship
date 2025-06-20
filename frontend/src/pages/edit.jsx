import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Edit() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  // Fetch student from API Endpoint
  useEffect(() => {
    axios
      .get(`/get_students/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const navigate = useNavigate();
  
  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(`/edit_user/${id}`, data[0])
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  function formatDate(dateString) {
    return dateString ? new Date(dateString).toISOString().slice(0, 10) : '';
  }

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100 justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header d-flex justify-content-between align-items-center bg-white">
              <h4 className="mb-0">Edit User {id}</h4>
              <Link to="/" className="btn btn-outline-success btn-sm">
                Back
              </Link>
            </div>
            <div className="card-body">
              {data.map((student) => (
                <form onSubmit={handleSubmit} key={student.id}>
                  <div className="form-group mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      value={student.name}
                      type="text"
                      name="name"
                      className="form-control"
                      required
                      onChange={(e) =>
                        setData([{ ...data[0], name: e.target.value }])
                      }
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      value={student.email}
                      type="email"
                      name="email"
                      className="form-control"
                      required
                      onChange={(e) =>
                        setData([{ ...data[0], email: e.target.value }])
                      }
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="birthday" className="form-label">Birthday</label>
                    <input
                      value={formatDate(student.birthday)}
                      type="date"
                      name="birthday"
                      className="form-control"
                      required
                      onChange={(e) =>
                        setData([{ ...data[0], birthday: e.target.value }])
                      }
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="department_id" className="form-label">Department</label>
                    <select
                      className="form-select"
                      name="department_id"
                      value={student.department_id }//|| ''
                      onChange={(e) =>
                        setData([{ ...data[0], department_id: e.target.value }])
                      }
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;