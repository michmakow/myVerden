import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/Pages/Login/LoginPage';
import { useAuthStore } from './store/AuthStore';

const AppRouter = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            isAuthenticated ? (
              <Navigate to='/dashboard' replace />
            ) : (
              <Navigate to='/login' replace />
            )
          }
        />
        <Route
          path='/login'
          element={isAuthenticated ? <Navigate to='/dashboard' replace /> : <LoginPage />}
        />
        <Route path='/dashboard' />
      </Routes>
    </Router>
  );
};

export default AppRouter;
