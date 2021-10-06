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











  return (
    <Router>
      <div className="App">
        <Header />
        <Body />
          {/*<div className={classes.root}>*/}
            <br/> <br/><br/>
            <Route path="/" exact component={AllProducts}/>
            <Route path ="/add" exact component={AddProduct} />
            <Route path="/update/:id" exact component={updateProduct}/>
      

            <Route path="/addReport" exact component = {ResolutionCenter} />
            <Route path="/addnew" exact component = {AddReport} />
            <Route path = "/view" exact component = {AllReports}/>
            {/*</div>*/}
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