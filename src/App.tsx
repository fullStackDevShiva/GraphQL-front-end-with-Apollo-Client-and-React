import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/AppHome";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App page-layout h-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
