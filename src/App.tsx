import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FloorPage from '@/pages/FloorPage';
import HallListPage from '@/pages/HallListPage';
import ExhibitListPage from '@/pages/ExhibitListPage';
import ExhibitDetailPage from '@/pages/ExhibitDetailPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FloorPage />} />
        <Route path="/floor/:floorId" element={<HallListPage />} />
        <Route path="/floor/:floorId/hall/:hallId" element={<ExhibitListPage />} />
        <Route
          path="/floor/:floorId/hall/:hallId/exhibit/:exhibitId"
          element={<ExhibitDetailPage />}
        />
      </Routes>
    </Router>
  );
}
