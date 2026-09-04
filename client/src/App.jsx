import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
// Member 1 — donors
import BecomeDonorPage from './member1-donors/pages/BecomeDonorPage.jsx';
import DonorDirectoryPage from './member1-donors/pages/DonorDirectoryPage.jsx';
// Member 2 — requests
import RequestBloodPage from './member2-requests/pages/RequestBloodPage.jsx';
import EmergencyRequestsPage from './member2-requests/pages/EmergencyRequestsPage.jsx';
// Member 3 — matching
import MatchingResultsPage from './member3-matching/pages/MatchingResultsPage.jsx';

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* Member 1 */}
          <Route path="/become-donor" element={<BecomeDonorPage />} />
          <Route path="/donors" element={<DonorDirectoryPage />} />
          {/* Member 2 */}
          <Route path="/request-blood" element={<RequestBloodPage />} />
          <Route path="/emergency-requests" element={<EmergencyRequestsPage />} />
          {/* Member 3 */}
          <Route path="/matches/:requestId" element={<MatchingResultsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
