const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

//middleware
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sms_db'
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})

//API Endpoint
//inserting data into db
app.post('/add_user', (req, res) => {
    const departmentId = req.body.department_id ? req.body.department_id : null;
    const sql = "INSERT INTO student_details (name, email, birthday, department_id) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.birthday,
        // req.body.department_id
        departmentId
    ];
    //try catch for error handling
    db.query(sql, values, (err, result) => {
        if (err) return res.json({message: 'Something went wrong: ' + err});
        return res.json({message: 'User added successfully'});
    });
});

//API Endpoint
//fetch data from db
app.get('/students', (req, res) => {
    //Right Join display get student details with assigned department name
    //Left Join display students even if they don't have a department name
    //Inner Join would exclude students without a department and department_id
    const sql = `
        SELECT sd.id, sd.name, sd.email, sd.birthday, d.name AS department
        FROM student_details sd
        LEFT JOIN department d ON sd.department_id = d.id
    `;
    //Try Catch for error handling
    db.query(sql, (err, result) => {
        if (err) return res.json({message: 'Something went wrong: ' + err});
        return res.json(result);
    });
});

//read data from db
app.get("/get_students/:id", (req, res) => {
    const sql = "SELECT * FROM student_details WHERE id = ?";
    db.query(sql,[req.params.id], (err, result) => {
        if (err) return res.json({message: 'Something went wrong' + err});
        return res.json(result);
    })
});

//edit user data
app.post("/edit_user/:id", (req, res) => {
  const id = req.params.id;
  // Convert birthday to YYYY-MM-DD if it exists
  let birthday = req.body.birthday;
  const departmentId = req.body.department_id ? req.body.department_id : null;
  if (birthday && birthday.length > 10) {
    birthday = new Date(birthday).toISOString().slice(0, 10);
  }
  const sql = "UPDATE student_details SET name=?, email=?, birthday=?, department_id=? WHERE id=?";
  const values = [
      req.body.name,
      req.body.email,
      birthday,
      // req.body.department_id,
      departmentId,
      id,
  ];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occurred" + err });
      return res.json({ success: "Student updated successfully" });
  });
});

//delete user data
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM student_details WHERE id=?";
  const values = [id];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occurred" + err });
    return res.json({ success: "Student updated successfully" });
  });
});

