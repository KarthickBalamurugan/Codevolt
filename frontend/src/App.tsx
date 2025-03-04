import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import SupportService from "./pages/SupportService";
import Analytics from "./pages/Analytics";
import Rplus from './components/Rplus';
// import Curve from './components/Curve';

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
        <Route path="/rplus" element={<>
        <Rplus/>
        <Footer/>
        </> } />
      </Routes>
    </Router>
  );
};

export default App;
