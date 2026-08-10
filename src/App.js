import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { useState } from "react";
import LoadingBar from "react-top-loading-bar";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [progress, setProgress] = useState(0);
  return (
    <BrowserRouter>
   <LoadingBar
  color="#0d6efd"
  progress={progress}
  height={3}
  onLoaderFinished={() => setProgress(0)}
/>

<Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <News
              setProgress={setProgress}
              apiKey={API_KEY}
              key="general"
              pageSize={6}
              category="general"
            />
          }
        />

        <Route
          path="/business"
          element={
            <News
              setProgress={setProgress}
              apiKey={API_KEY}
              key="business"
              pageSize={6}
              category="business"
            />
          }
        />

        <Route
          path="/sports"
          element={
            <News
              setProgress={setProgress}
              apiKey={API_KEY}
              key="sports"
              pageSize={6}
              category="sports"
            />
          }
        />

        <Route
          path="/science"
          element={
            <News
              setProgress={setProgress}
              apiKey={API_KEY}
              key="science"
              pageSize={6}
              category="science"
            />
          }
        />
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
}

export default App;
