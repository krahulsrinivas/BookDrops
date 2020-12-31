import React,{useState,useEffect} from 'react';
import AppBar from '../reusable/appbar';
import axios from 'axios';
import {useHistory,useLocation} from 'react-router-dom';
import {useCookies} from 'react-cookie';
const Profile = () => {
    const [stories,setStories]=useState([]);
    const [user,setUser]=useState({"UserName":""});
    const history=useHistory();
    const location=useLocation();
    useEffect(()=>{
        const request=async()=>{
            await axios.get(`http://localhost:3000/user?name=${location.state.username}`).then( async (usr)=>{
            await axios.get(`http://localhost:3000/getBooks?by=${usr.data['UserName']}&&status=published`).then((res)=>{
                setUser(usr.data);
                setStories(res.data);
            }).catch((e)=>console.log(e));
        });
        }
        request();
    },[]);
    return (
        <div className="ui container" >
            <AppBar />
            <div className="ui inverted segment" style={{ blockSize: "5000px" }}>
                <div style={{ margin: "50px" }}>
                    <img class="ui medium bordered image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnBsEvhXAGI3xGdeD_5f91wVDwcXpTsn7YAA&usqp=CAU"></img>
                    <div style={{ position: "absolute", top: "80px", left: "450px" }}>
                        <h1 style={{ fontSize: "40px" }}>UserName</h1>
                        <h3 style={{ fontSize: "25px" }}>{user['UserName']}</h3>
                        <h1 style={{ fontSize: "40px", marginTop: "50px" }}>Email</h1>
                        <h3 style={{ fontSize: "25px" }}>{user['Email']}</h3>
                    </div>
                    <div style={{ position: "absolute", top: "80px", left: "700px" }}>
                        <h1 style={{ fontSize: "40px" }}>Date Joined</h1>
                        <h3 style={{ fontSize: "25px" }}>{user['createdAt']}</h3>
                    </div>
                    <div style={{ marginTop: "75px" }}>
                        <h1>{`Books by ${user['UserName']}`}</h1>
                        <hr class="solid" />
                        <div class="ui grid">
                        {stories.map((book)=>(
  <div class="five wide column" style={{marginTop:"20px"}}>
  <div class="ui inverted items">
      <div class="item">
          <div class="image">
              <img src={book['imageUrl']} width="150px"></img>
          </div>
          <div class="content" style={{ marginTop: "2px" }}>
              <p class="header" style={{ fontSize: "20px", color: "white" }}>{book['title']}</p>
              <div class="description" style={{ fontSize: "15px", color: "red",marginTop:"20px"}}>
                  <p>{`Written by ${book['author']}`}</p>
              </div>
              <div class="extra" style={{ fontSize: "12px", color: "white",marginTop:"20px"}}>
                  {`Genre:  ${book['genre']}`}
              </div>
              <button className="ui inverted blue button" style={{fontSize:"11px",marginTop:"80px"}} onClick={()=>{
                history.push({pathname:"/book",state:{"book":book}})
            }}>
                View Book
            </button>
          </div>
      </div>
      </div>
  </div>))}
</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;