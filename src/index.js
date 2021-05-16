import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './containers/TodoApp';
import 'font-awesome/css/font-awesome.min.css'
import './index.css';

ReactDOM.render(
    <div>
        <TodoApp />
    </div>,
    document.getElementById('container')
);