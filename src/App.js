import React from 'react';
import './App.css';
import Layout from './components/Layout';
import AddToDo from './components/TodoItems/addtodo';

function App() {
  return (
    <div className="App">    
      <Layout>
        <AddToDo/>
      </Layout>
    </div>
  );
}

export default App;
