import React from 'react';
// import Router from './routes'
import {theme} from './styles/theme'
import {ThemeProvider} from 'styled-components'
import  GlobalStyle  from './styles/globalStyle';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      {/* <Router/> */}
      <div className="App">
      <h1>oi</h1>
    </div>
    </ThemeProvider>
    
  );
}

export default App;
