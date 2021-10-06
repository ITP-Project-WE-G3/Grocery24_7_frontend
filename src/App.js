import './App.css';
import 'react-calendar/dist/Calendar.css';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Footer from './components/Footer';
import AddcashonDelivery from './components/AddcashonDelivery';
import PendingOrders from './components/PendingOrders';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import OrderDetails from "./components/OrderDetails";
import { ToastContainer } from 'react-toastify';

function App() {
  const useStyles = makeStyles({
    root: {
      minHeight: '600px',
      marginBottom: '100px',
      clear: 'both',
    },
  });

  const classes = useStyles();
  return (
    <Router>
      <div className='App'>
        <Header/>
        <ToastContainer />
        <div className={classes.root}>
          <br/> <br/>
          <br/>
          <Route path='/add' exact component={AddcashonDelivery}/>
          <Route path='/details/:id' component={OrderDetails}/>
          <Route path='/' exact component={PendingOrders}/>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
