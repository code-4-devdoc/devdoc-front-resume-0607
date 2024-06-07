import './App.css';
import {Route, Routes} from "react-router-dom";
import Index from "./pages/ResumePage/ResumePage"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <Index /> }/>
      </Routes>
    </div>
  );
}

export default App;