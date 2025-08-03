import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAppStore } from './store/AppState';
import './App.css'

function Home() {
  const { count, increment, decrement } = useAppStore();

  return (
    <div className=''>
      <h1 className=''>Home</h1>
      <p className='count'>Count: {count}</p>
      <Button onClick={increment} className=''>Increment</Button>
      <Button onClick={decrement}>Decrement</Button>
    </div>
  );
}

function About() {
  return <div className=''>
    <h1 className=''>About</h1>
  </div>;
}

function App() {
  return (
    <Router>
      <div className=''>
        <nav className=''>
          <Link to='/' className=''>Home</Link>
          <Link to='/about'>About</Link>
        </nav>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;