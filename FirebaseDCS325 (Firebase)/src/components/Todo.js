import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  onSnapshot, 
  doc, 
  deleteDoc, 
  updateDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    const q = query(collection(db, 'todos'), where('userId', '==', currentUser.uid));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });

    return unsubscribe;
  }, [currentUser]);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    
    if (newTodo.trim() === '') return;
    
    try {
      await addDoc(collection(db, 'todos'), {
        text: newTodo,
        completed: false,
        userId: currentUser.uid,
        createdAt: serverTimestamp()
      });
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const todoRef = doc(db, 'todos', id);
      await updateDoc(todoRef, {
        completed: !completed
      });
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, 'todos', id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="todo-container">
      <h2 className="mb-4">Todo List</h2>
      
      <form onSubmit={handleAddTodo} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Add a new todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Add</button>
        </div>
      </form>
      
      <div className="todo-list">
        {todos.length === 0 ? (
          <p>No todos yet. Add one above!</p>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <div>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id, todo.completed)}
                  className="me-2"
                />
                {todo.text}
              </div>
              <div className="todo-actions">
                <button 
                  onClick={() => deleteTodo(todo.id)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 