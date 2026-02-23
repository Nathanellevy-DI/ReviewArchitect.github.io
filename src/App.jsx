import { useState } from 'react';
import ReviewForm from './ReviewForm';

function App() {
  return (
    <div className="app-container">
      <header>
        <h1 className="header-title">Review Architect</h1>
        <p className="header-sub">Craft the perfect restaurant review in seconds</p>
      </header>
      
      <main>
        <ReviewForm />
      </main>
    </div>
  );
}

export default App;
