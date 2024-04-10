import './App.css';
import Home from "./routes/Home";
import Save from "./routes/Save";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

function App() {
  return (
      <Router basename={process.env.PUBLIC_URL}>
          <Routes>
              <Route path={`/`}   element={<Home />}/>
              <Route path={`/board/`}  element={<Save />}/>
          </Routes>
      </Router>
  );
}

export default App;
