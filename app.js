const express = require('express');
const app = express();
const pool = require("./db");


app.use(express.json());

app.listen(3000, () => {
    console.log("listening on port 3000");
});

// ROUTES

// get all todos
app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    }
    catch (err) {
        console.error(err.message);
    }
})


// get a specific todo
app.get('/todos/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [id]);
        res.json(todo.rows);
    }
    catch(err) {
        console.error(err);
    }
})


// create a todo
app.post('/todos', async (req, res) => {
    try {
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description])
        res.json(newTodo.rows[0]);
    }
    catch(err) {
        console.error(err);
    }
})

// update a todo
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const todoUpdate = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id])
        res.json(todoUpdate.rows);
    }
    catch(err) {
        console.error(err.message);
    }
})


// delete a todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id=$1", [id]);
        res.json("todo deleted!");
    }
    catch(err) {
        console.error(err.message);
    }
})