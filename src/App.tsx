import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from './store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCartFromBackend } from './store/cartSlice';


import Login from './pages/Login';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import MainLayout from './components/MainLayout';
import Cart from './pages/Cart';

const useTypedSelector: typeof useSelector = useSelector;

function AppRoutes() {
  const user = useTypedSelector((state: RootState) => state.user);
  const dispatch = useDispatch<typeof store.dispatch>();
  useEffect(() => {
    if (user.id && user.token) {
      dispatch(fetchCartFromBackend({ userId: user.id, token: user.token }));
    }
  }, [user.id, user.token, dispatch]);
  return (
    <Routes>
      <Route path="/login" element={user.token ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/dashboard" element={user.token ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/" element={user.token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      <Route path="/products" element={user.token ? <Products /> : <Navigate to="/login" />} />
      <Route path="/orders" element={user.token ? <Orders /> : <Navigate to="/login" />} />
      <Route path="/profile" element={user.token ? <Profile /> : <Navigate to="/login" />} />
      <Route path="/cart" element={user.token ? <Cart /> : <Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </Router>
    </Provider>
  );
}

export default App;
