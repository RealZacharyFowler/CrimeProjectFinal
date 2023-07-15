import { BrowserRouter, Route, Routes } from "react-router-dom";
import DisplayAll from "./components/DisplayAll";
import CrimeForm from "./components/CrimeForm";
import EditCrime from "./components/EditCrime";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DisplayAll />} />
          <Route path="/new" element={<CrimeForm />} />
          <Route path="/edit/:id" element={<EditCrime />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;