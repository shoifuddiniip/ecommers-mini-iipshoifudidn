import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from './store';
import Login from './pages/Login';
import Products from './pages/Products';
import Orders from './pages/Orders';
import './App.css';

const useTypedSelector: typeof useSelector = useSelector;

function Layout({ children }: { children: React.ReactNode }) {
  const user = useTypedSelector((state: RootState) => state.user);
  return (
    <div className="App">
      <nav style={{display:'flex',gap:16,justifyContent:'center',margin:16}}>
        <Link to="/">Produk</Link>
        <Link to="/orders">Pesanan</Link>
        {user.token ? <span>Login sebagai: {user.username}</span> : <Link to="/login">Login</Link>}
      </nav>
      <div style={{maxWidth:600,margin:'0 auto'}}>{children}</div>
    </div>
  );
}

function AppRoutes() {
  const user = useTypedSelector((state: RootState) => state.user);
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/login" element={user.token ? <Navigate to="/" /> : <Login />} />
      <Route path="/orders" element={user.token ? <Orders /> : <Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
