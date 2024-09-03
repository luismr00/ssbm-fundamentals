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
import ConfirmSignUp from './pages/ConfirmSignUp';
import ProfilePage from './pages/ProfilePage';
import IndexTutorials from './pages/IndexTutorials';
import Intro from './pages/Intro';

function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<LandingPage />} />
        <Route path="/videos" element={<IndexTutorials />} />
        <Route path="/videos/introduction" element={<Intro />} />
        <Route path='/videos/punish-game' element={<PunishGame />} />
        <Route path='/videos/neutral-game' element={<NeutralGame />} />
        <Route path='/videos/edgeguard-game' element={<EdgeguardGame />} />
        <Route path='/videos/:category/video/:id' element={<VideoPlayer />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/register' element={<Register />} />
        <Route path='/confirm' element={<ConfirmSignUp />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/resources' element={<Resources />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
