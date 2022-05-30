import "./App.css";
import {List} from "./Components/List"
import {AddCountry} from "./Components/AddCountry"
import {AddCity} from "./Components/AddCity"
import {Route,Routes} from "react-router-dom"
function App() {
  return <div className="App">
    <Routes>
      <Route path="/" element={<List></List>}></Route>
      <Route path="/add-country" element={<AddCountry></AddCountry>}></Route>
      <Route path="/add-city" element={<AddCity></AddCity>}></Route>
    </Routes>
  </div>;
}

export default App;
