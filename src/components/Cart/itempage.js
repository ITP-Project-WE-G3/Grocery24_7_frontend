import './itempage.css';
import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import {Card,CardMedia,CardContent,Typography} from '@material-ui/core'
import { Button,CardActionArea, CardActions } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/SearchOutlined';

export default function ItemPage() {

    //styles
     const useStyles = makeStyles({

        navlink : {
            textDecoration: "none"
        },
        
        buttonStyle :{
              
            fontWeight: "bold",
            padding:'20 px',
            paddingRight: '20px',
            paddingLeft: '20px'
        },
        container: {
            backgroundColor: '#e6e9ea'
        }
        
      })
    
      const classes = useStyles();
    
    //receive part
        const [items, setItems] = useState([]);
        const [searchTerm, setsearchTerm] = useState("");

        const setDataSearch = () => {
    
            localStorage.setsearchTerm('isearch', searchTerm);
    
        }

        useEffect(() => {
            function getItems() {
                axios.get("http://localhost:8070/product/").then((res) => {
                    console.log(res.data);
                    setItems(res.data);
                }).catch((err) => {
                    alert(err.message);
                })
            }
            getItems();
        }, [])

        //send data
        const setData = (items) => {
            let { _id,pname, pDesc, pPrice,pImage } = items;
            localStorage.setItem('ID', _id);
            localStorage.setItem('Item Name', pname);
            localStorage.setItem('Item Desc', pDesc);
            localStorage.setItem('Price', pPrice);
            localStorage.setItem('Image', pImage)   
         }

        return(
  
            <div className="homescreen__products" className={classes.container}>
                <h1>Item Page</h1> 

                {/*search*/}
                <form  class="d-flex"  style={{width:"500px",paddingLeft:"10px"}}>
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" 
                    onChange={(e) => {setsearchTerm(e.target.value);}} /> &nbsp;
                    <Link to='/itemsearch' className={classes.navlink}>
                    <Button startIcon={<SearchIcon/>}className={classes.buttonStyle}  variant="contained" color="black" 
                    size="medium" type="submit" onClick={() => setDataSearch()}>Search</Button>
                    </Link>
                </form>
                <br/>

                {/*iterm card*/}
                <div className="grid-container">
                
                    {items.map((items) => {return(
                        
                    <Card sx={{ maxWidth: 345 }} className="grid-item"> 
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="140"
                            image={items.pImage}
                            alt={items.pname}
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            ItemName : {items.pname}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Item Description : {items.pDesc}<br/>
                            Item Price : {items.pPrice}<br/>
                            Remaining : {items.stockUnits}<br/>
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            
                            <Link to="/selected" className={classes.navlink}>
                                <Button className={classes.buttonStyle} 
                                variant="contained" color="secondary" size="small"
                                onClick = {() => setData(items)}>Add to cart</Button>
                                </Link>
                            
                        </CardActions>
                    </Card>
                    
                    
                        );
                    })}
                
                </div>
            </div>


        );
    }