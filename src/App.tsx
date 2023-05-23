// Package
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Middleware
import ValidateAuth from './library/ValidateAuth';

// Pages
import Dashboard from './pages/dashboard/Landing';
import Landing from './pages/landing/Search';
import Monitoring from './pages/dashboard/Monitoring';
import SearchEngine from './pages/dashboard/SearchEngine';
import Users from './pages/dashboard/Users';
import SearchWithParameters from './pages/landing/SearchWithParameters';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ValidateAuth />}>
          <Route path="/" element={<Landing />} />
          <Route path="/admin" element={<Dashboard />}>
            <Route path="/admin/dashboard" element={<Monitoring />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/search-engine" element={<SearchEngine />} />
          </Route>
          <Route path="/query/:param" element={<SearchWithParameters />} />
        </Route>
        <Route path="*" element={<p>not found</p>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
