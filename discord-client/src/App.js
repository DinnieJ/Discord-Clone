import './App.css';
import './assets/main.scss'
import Snackbar from './components/common/Snackbar';
import { Suspense } from 'react';
import React from 'react';
import useConfigApp from './hooks/useConfigApp';
import AppRouter from './router';

function App() {
  const fetched = useConfigApp()

  return (
    <div id="application" className="relative">
      <Snackbar />
      {fetched ?
        <Suspense fallback={<h1>Loading profile...</h1>}>
          <AppRouter />
        </Suspense>
        :
        <div>hello</div>
      }
    </div >
  )
}

export default App;
