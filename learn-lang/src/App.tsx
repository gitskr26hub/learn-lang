import { Route, Routes,Switch  } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Learning from "./components/Learning";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { Suspense } from "react";
import Loader from "./components/Loader";
import "./Style.css"

const App = () => {



  return (
    <div>
      <Header />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/learn" element={<Learning />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
