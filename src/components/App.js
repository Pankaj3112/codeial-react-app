import { Route, Routes } from 'react-router-dom';

import { Home, Login, Signup } from '../pages';
import { Loader, Navbar } from './';
import { useAuth } from '../hooks';

const Page404 = () => {
  return <h1>404</h1>;
};

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
		<Route exact path="/signup" element={<Signup />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
