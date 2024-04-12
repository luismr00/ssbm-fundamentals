import { BrowserRouter, Route, Switch, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; 
import PunishGame from './pages/PunishGame';
import NeutralGame from './pages/NeutralGame';
import EdgeguardGame from './pages/EdgeguardGame';
import VideoPlayer from './pages/VideoPlayer';

function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<LandingPage />} />
        <Route path='/tutorials/punish-game' element={<PunishGame />} />
        <Route path='/tutorials/neutral-game' element={<NeutralGame />} />
        <Route path='/tutorials/edgeguard-game' element={<EdgeguardGame />} />
        <Route path='/video-player/:id' element={<VideoPlayer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
