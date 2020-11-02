import React from 'react';
import './App.css';
import request from './request';
import Row from './Row.component';

function App() {
  return (
    <div className="App">
      <Row title="NETFLIX ORIGINALS" fetchUrl={request.fetchNetflixOriginals}/>
      <Row title="TRENDING NOW" fetchUrl={request.fetchTrending}/>      
    </div>
  );
}

export default App;
