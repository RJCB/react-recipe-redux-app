import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:recipeId" element={<RecipeDetails />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
