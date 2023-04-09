import style from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import Node from "./pages/Node/Node";
import Home from "./pages/Home/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className={style.container}>
      <div className={style.up}><NavBar/></div>
      <div className={style.left}></div>
      <div className={style.center}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Node/:hostip" element={<Node />} />
        </Routes>
      </div>
      {/* <div className={style.down}><h1>sa</h1></div> */}
    </div>
  );
}

export default App;
