import { BrowserRouter, Route, Switch, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; 
import PunishGame from './pages/PunishGame';
import NeutralGame from './pages/NeutralGame';
import EdgeguardGame from './pages/EdgeguardGame';
import VideoPlayer from './pages/VideoPlayer';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import Resources from './pages/Resources';
import LogIn from './pages/LogIn';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<LandingPage />} />
        <Route path='/tutorials/punish-game' element={<PunishGame />} />
        <Route path='/tutorials/neutral-game' element={<NeutralGame />} />
        <Route path='/tutorials/edgeguard-game' element={<EdgeguardGame />} />
        <Route path='/video-player/:id' element={<VideoPlayer />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/register' element={<Register />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/resources' element={<Resources />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
