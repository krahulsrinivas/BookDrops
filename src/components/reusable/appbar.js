import React from 'react'
import { useCookies } from 'react-cookie';
import { useHistory, useLocation } from 'react-router-dom'

const AppBar = () => {
    const history = useHistory();
    const location = useLocation();
    const [,,removeCookie]=useCookies();
    let home = (location.pathname === "/home")?"ui active inverted button":"ui inverted button";
    let yourStories = (location.pathname === "/yourStories")?"ui active inverted button":"ui inverted button";
    let profile = (location.pathname === "/profile")?"ui active inverted button":"ui inverted button";
  
    return (
        <div className="ui inverted  menu" style={{ margin: "1px" }}>
            <div class="header item" style={{fontSize:"20px" }}>
                BookDrops
        </div>
            <div className="ui transparent inverted icon input" style={{ marginLeft: "10px" }} >
                <input type="text" placeholder="Search by Username "></input>
                <i class="search icon"></i>
            </div> 
            <div style={{position:"relative",left:"350px"}}>
                <button className={home} style={{ marginTop: "10px",marginLeft:"5px" }} onClick={() => {
                    history.push('/home');
                }}>Home</button>
                <button className={yourStories} style={{ marginTop: "10px",marginLeft:"5px" }} onClick={() => {
                    history.push('/yourStories');
                }}>Your Stories</button>
                <button className={profile} style={{ marginTop: "10px",marginLeft:"5px" }} onClick={() => {
                    history.push('/profile');
                }}>Your Profile</button>
                <button className="ui red inverted button" style={{ marginTop: "10px",marginLeft:"5px" }} onClick={()=>{
                    removeCookie("auth-token");
                }}>Logout</button>
            </div>
        </div>
    );
};

export default AppBar;