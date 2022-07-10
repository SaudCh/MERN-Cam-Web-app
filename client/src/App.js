import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateForm from "./components/CreateForm/CreateForm";
import MyCreations from "./components/Get/MyCreations";
import Single from "./components/Get/Single";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/Settings/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateForm />} />
        <Route path="/creation/:id" element={<Single />} />
        <Route path="/mycreations" element={<MyCreations />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
