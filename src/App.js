import React, {useState} from 'react';

import List from "./components/content-list/list";
import CreateTask from "./components/create-task/create-task";
import data from './tempData';
import {generateID} from "./utilits";

const App = () => {
    const [todos, setTodos] = useState(data);
    const [form, setForm] = useState({
        select: '',
        text: '',
    });
    const [modal, setModal] = useState(false);

    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value})
    };

    const handleSubmit = e => {
        e.preventDefault();
        let todosCopy = [...todos];
        if (form.select) {
            const todo = todosCopy.find(todo => todo.text === form.select)
            todo.child.length > 3 ? alert('Вы больше не можете добавлять..') : todo.child.push({
                checked: false,
                text: form.text,
                id: generateID()
            })
        } else {
            setTodos([...todos, {text: form.text, id: generateID(), checked: false, child: []}])
        }
        setModal(false)
        setForm({text: '', select: ''})
    }
    const toggleChecked = (id) => {
        const todosCopy = [...todos];
        let todoItem = todosCopy.map(todo => todo.id === id ? {...todo, checked: !todo.checked} : todo)
        setTodos(todoItem)
    };

    const toggleChildChecked = (todoElement) => {
        const todosCopy = [...todos];
        todosCopy.forEach(todoItem => {
            todoItem.child.forEach(todo => {
                if (todo.id === todoElement.id) {
                    todo.checked = !todo.checked;
                }
            })
        })
        setTodos(todosCopy)
    }
    const removeTodo = (id) => {
        const todoList = [...todos];
        if (window.confirm("Вы точно хотите удалить элемент?")) {
            let todoItem = todoList.filter(todo => todo.id !== id)
            setTodos(todoItem)
        }
    }
    const removeChild = (id) => {
        const todosCopy = [...todos];

        if (window.confirm("Вы точно хотите удалить элемент?"))
            todosCopy.forEach(todoItem => {
                todoItem.child = todoItem.child.filter(task => task.id !== id)
            })
        setTodos(todosCopy)
    }
    return (
        <div className="todo-list">
            <div className="todo-list__content">
                <List
                    toggleChecked={toggleChecked}
                    todos={todos}
                    setModal={setModal}
                    removeTodo={removeTodo}
                    removeChild={removeChild}
                    toggleChildChecked={toggleChildChecked}
                />
                <div className="todo-list__add-item">
                    <CreateTask
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        form={form}
                        todos={todos}
                        modal={modal}
                        setModal={setModal}
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
