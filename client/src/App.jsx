import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Product from "./pages/Product";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
