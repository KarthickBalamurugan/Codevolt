import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import SupportService from "./pages/SupportService";
import Analytics from "./pages/Analytics";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Hero />
            <Footer />
          </>
        } />
        <Route path="/support" element={
          <>
            <SupportService />
            <Footer />
          </>
        } />
        <Route path="/stats" element={
          <>
            <Analytics />
            <Footer />
          </>
        } />
        <Route path="/rplus" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
