import './App.css';
import Home from "./routes/Home";
import Save from "./routes/Save";
import Paging from "./routes/Paging";
import BoardList from "./routes/BoardList";
import Detail from "./routes/Detail";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Update from "./routes/Update";

function App() {
  return (
      <Router basename={process.env.PUBLIC_URL}>
          <Routes>
              <Route path={`/`}   element={<Home />}/>
              <Route path={`/board/save`}  element={<Save />}/>
              <Route path={`/board`}  element={<BoardList/>}/>
              <Route path={`/board/detail/:id`}  element={<Detail/>}/>
              <Route path={`/board/update/:id`}  element={<Update/>}/>
              <Route path={`/board/paging`}  element={<Paging/>}/>
          </Routes>
      </Router>
  );
}

export default App;
