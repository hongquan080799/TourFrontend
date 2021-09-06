import './App.css';
import Header from './components/header/Header'
import Carousel from './components/body/slider/Carousel'
import ListTour from './components/body/list-tour/ListTour'
import About from './components/body/about/About'
import Bottom from './components/footer/Bottom'
import TourDetail from './components/body/tour-detail/TourDetail'
import {BrowserRouter as Router,Route,Switch,useLocation} from 'react-router-dom'
import {useEffect} from 'react'
import Admin from './components/admin'
import Login from './components/account/Login'
import { UserProvider } from './context/UserContext';
import Register from './components/account/Register';
function App() {
  function ScrollToTop(props){
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return props.children
  }
  return (
    <div className="App">
      <UserProvider>
      <Router>
        <Switch>
        <ScrollToTop>
          <Route path="/" exact>
            <Header />
            <Carousel />
            <ListTour />
            {/* <TourDetail /> */}
            <About />
            <Bottom />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/tuyen/:matuyen" exact>
            <Header />
            <Carousel />
            <TourDetail />
            <About />
            <Bottom />
          </Route>
          <Route path="/admin/:id" exact>
            <Admin />
          </Route>
          <Route path="/admin/:id/:tuyenID" exact>
            <Admin />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>

        </ScrollToTop>
        </Switch>
      </Router>
      </UserProvider>
    </div>
  );
}

export default App;
