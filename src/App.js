import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {dispatchLogin, fetchUser, dispatchGetUser} from './redux/actions/authAction'

import Header from './components/UserManagement/header/Header'
import Body from './components/UserManagement/body/Body'
import axios from 'axios';

//Dasun
import AddProduct from './components/Vendor/AddProduct';
import Footer from './components/Vendor/Footer';
//import Header from './components/Vendor/Header';
import AllProducts from './components/Vendor/allProducts';
import updateProduct from './components/Vendor/updateProduct';
import {makeStyles} from '@material-ui/core/styles';

//Chamoda
//import Header from './components/Resolution/Header';
//import Footer from './components/Resolution/Footer';
import AddReport from './components/Resolution/AddReport';
import AllReports from './components/Resolution/AllReports';
import ResolutionCenter from './components/Resolution/ResolutionCenter';

//Yasassi
import AddRequest from './components/Order/AddRequest';
import AllRequest from './components/Order/AllRequest';
import UpdateRequest from './components/Order/UpdateRequest';
import DeleteRequest from './components/Order/DeleteRequest';

import AllOrder from './components/Order/AllOrder';
import SelectedOrder from './components/Order/SingleOrder';
import AddOrder from './components/Order/AddOrder';
import UpdateOrder from './components/Order/UpdateOrder';
import Search from './components/Order/search';

//Hirantha
import ItemSearch from './components/Cart/itemsearch';
import ItemPage from './components/Cart/itempage';
import SelectedItem from './components/Cart/selecteditem';
import ViewCart from './components/Cart/viewcart';

//Sandunika
import UpdateUserInfo from './components/Payment/editinfo';
import UserInfo from './components/Payment/userinfo';
import UserInfoDisplay from './components/Payment/userinfoDisplay';












function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin){
      const getToken = async () => {
        const res = await axios.post('/user/refresh_token', null)
        dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
      }
      getToken()
    }
  },[auth.isLogged, dispatch])

  useEffect(() => {
    if(token){
      const getUser = () => {
        dispatch(dispatchLogin())

        return fetchUser(token).then(res => {
          dispatch(dispatchGetUser(res))
        })
      }
      getUser()
    }
  },[token, dispatch])


//Dasun
const useStyles = makeStyles({

  root : {
    minHeight: '600px',
    marginBottom: '100px',
    clear: 'both',
  },

  
})


const classes = useStyles();


  return (
    <Router>
      <div className="App">
        <Header />
        <Body />
          <div className={classes.root}>
            <br/> <br/><br/>
            <Route path="/" exact component={AllProducts}/>
            <Route path ="/add" exact component={AddProduct} />
            <Route path="/update/:id" exact component={updateProduct}/>
      

            <Route path="/addReport" exact component = {ResolutionCenter} />
            <Route path="/addnew" exact component = {AddReport} />
            <Route path = "/view" exact component = {AllReports}/>

            <Route path="/radd" exact component={AddRequest}/>
            <Route path="/oadd" exact component={AddOrder}/>
            <Route path="/rdelete/:rid" exact component={DeleteRequest}/>
            <Route path="/r" exact component={AllRequest}/>
            <Route path="/o" exact component={AllOrder}/>
            <Route path="/rupdate/:rid" exact component={UpdateRequest}/>
            <Route path="/oupdate/:rid" exact component={UpdateOrder}/>
            <Route path="/search" exact component={Search}/>
            <Route path="/singleOrder" exact component={SelectedOrder}/>

            <Route path="/checkout" exact component={UserInfo}/>
            <Route path="/pay" exact component={UserInfoDisplay}/>
            <Route path="/payupdate/:id" exact component={UpdateUserInfo}/>

            <Route path="/selected" exact component={SelectedItem}/>
            <Route path="/i" exact component={ItemPage}/>
            <Route path="/c" exact component={ViewCart}/>
            <Route path="/itemsearch" exact component={ItemSearch}/>
            </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;













/*
DASUN APP.JS Return Structure

<Router>
    <div className="App">
     
     <Header/>
     <div className={classes.root}>
    <br/> <br/><br/>
    <Route path="/" exact component={AllProducts}/>
    <Route path ="/add" exact component={AddProduct} />
    <Route path="/update/:id" exact component={updateProduct}/>
    
    </div>

     <Footer/>

    </div>
    </Router>*/