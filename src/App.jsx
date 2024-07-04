import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import Navbar from './Navbar';
import Home from './components/Home';
import About from './components/About';
import MedicineTracker from './components/MedicineTracker';
import RegistrationForm from './components/RegistrationForm';
import UserProfile from './components/UserProfile';
import Blog from './components/Blog';
import './App.css';

function App() {
    
    
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/MedicineTracker" element={<MedicineTracker />} />
                <Route path="/blog" element={<Blog />} /> 
                <Route path="/RegistrationForm" element={<RegistrationForm />} />
                <Route path="/UserProfile" element={<UserProfile/>}/>
                <Route path="*" element={() => <h1>404 Page Not Found</h1>} />
                
            </Routes>
        </Router>
    );
}

export default App;