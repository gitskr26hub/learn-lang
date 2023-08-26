import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Learning from "./components/Learning";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { Suspense, useEffect } from "react";
import Loader from "./components/Loader";
import "./Style.css"
import { useSelector } from "react-redux";

const App = () => {


  const navigate=useNavigate()
  const {words}=useSelector((state:{root:StateType})=>state.root)

  useEffect(()=>{
    navigate("/")
  },[words.length==0])


  return (
    <div>
      <Header />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learning />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
