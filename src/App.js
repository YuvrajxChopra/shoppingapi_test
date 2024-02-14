import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Firstpage from './components/firstpage';
import ForgetPassword from './components/forgetpassword';
import ShoppingPage from './components/shoppingpage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Firstpage />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/shoppingpage" element={<ShoppingPage />} />
      </Routes>
    </Router>
  );
};

export default App;