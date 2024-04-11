import './App.css';
import Home from "./routes/Home";
import Save from "./routes/Save";
import BoardList from "./routes/BoardList";
import Detail from "./routes/Detail";
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
              <Route path={`/board/save`}  element={<Save />}/>
              <Route path={`/board/`}  element={<BoardList/>}/>
              <Route path={`/board/:id`}  element={<Detail/>}/>
          </Routes>
      </Router>
  );
}

export default App;
