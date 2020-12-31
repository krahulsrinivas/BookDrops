import React,{useEffect,useState} from 'react';
import AppBar from '../reusable/appbar';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
const HomePage=()=>{
    const [popularStories,setPopularStories]=useState([]);
    const [comedyStories,setComedyStories]=useState([]);
    const [actionStories,setActionStories]=useState([]);
    const [romanceStories,setRomanceStories]=useState([]);
    const history=useHistory();
    useEffect(()=>{
        const request=async()=>{
            await axios.get(`http://localhost:3000/books?status=published`).then((res)=>{
                setPopularStories(res.data['popularBooks']);
                setComedyStories(res.data['comedyBooks']);
                setActionStories(res.data['actionBooks']);
                setRomanceStories(res.data['romanceBooks']);
            }).catch((e)=>console.log(e));
        }
        request();
    },[]);

return(
    <div className="ui container" >
    <AppBar />
    <div className="ui inverted segment" style={{blockSize:"5000px"}}>
    <div style={{margin:"50px"}}>
    <h1>Most Popular Books</h1>
    <hr class="solid" />
    <div class="ui grid">
                        {popularStories.map((book)=>(
  <div class="three wide column" style={{marginTop:"20px"}}>
          <div class="image">
              <img src={book['imageUrl']} width="170px"></img>
          </div>
          <div class="content" style={{ marginTop: "1px" }}>
              <p class="header" style={{ fontSize: "15px", color: "white" }}>{book['title']}</p>
              <div class="description" style={{ fontSize: "12px", color: "red"}}>
                  <p>{`Written by ${book['author']}`}</p>
              </div>
              <div class="extra" style={{ fontSize: "12px", color: "white"}}>
                  {`Genre:  ${book['genre']}`}
              </div>
              <button className="ui inverted blue button" style={{fontSize:"12px"}} onClick={()=>{
                history.push({pathname:"/book",state:{"book":book}})
            }}>
                View Book
            </button>
          </div>
      
  </div>))}
</div>
    </div>
    <div style={{margin:"50px"}}>
    <h1>Comedy Books</h1>
    <hr class="solid" />
    <div class="ui grid">
                        {comedyStories.map((book)=>(
  <div class="three wide column" style={{marginTop:"20px"}}>
          <div class="image">
              <img src={book['imageUrl']} width="170px"></img>
          </div>
          <div class="content" style={{ marginTop: "1px" }}>
              <p class="header" style={{ fontSize: "15px", color: "white" }}>{book['title']}</p>
              <div class="description" style={{ fontSize: "12px", color: "red"}}>
                  <p>{`Written by ${book['author']}`}</p>
              </div>
              <div class="extra" style={{ fontSize: "12px", color: "white"}}>
                  {`Genre:  ${book['genre']}`}
              </div>
              <button className="ui inverted blue button" style={{fontSize:"12px"}} onClick={()=>{
                history.push({pathname:"/book",state:{"book":book}})
            }}>
                View Book
            </button>
          </div>
      
  </div>))}
</div>
</div>
<div style={{margin:"50px"}}>
<h1>Action Books</h1>
    <hr class="solid" />
    <div class="ui grid">
                        {actionStories.map((book)=>(
  <div class="three wide column" style={{marginTop:"20px"}}>
          <div class="image">
              <img src={book['imageUrl']} width="170px"></img>
          </div>
          <div class="content" style={{ marginTop: "1px" }}>
              <p class="header" style={{ fontSize: "15px", color: "white" }}>{book['title']}</p>
              <div class="description" style={{ fontSize: "12px", color: "red"}}>
                  <p>{`Written by ${book['author']}`}</p>
              </div>
              <div class="extra" style={{ fontSize: "12px", color: "white"}}>
                  {`Genre:  ${book['genre']}`}
              </div>
              <button className="ui inverted blue button" style={{fontSize:"12px"}} onClick={()=>{
                history.push({pathname:"/book",state:{"book":book}})
            }}>
                View Book
            </button>
          </div>
      
  </div>))}
</div>
</div>
<div style={{margin:"50px"}}>
<h1>Romance Books</h1>
    <hr class="solid" />
    <div class="ui grid">
                        {romanceStories.map((book)=>(
  <div class="three wide column" style={{marginTop:"20px"}}>
          <div class="image">
              <img src={book['imageUrl']} width="170px"></img>
          </div>
          <div class="content" style={{ marginTop: "1px" }}>
              <p class="header" style={{ fontSize: "15px", color: "white" }}>{book['title']}</p>
              <div class="description" style={{ fontSize: "12px", color: "red"}}>
                  <p>{`Written by ${book['author']}`}</p>
              </div>
              <div class="extra" style={{ fontSize: "12px", color: "white"}}>
                  {`Genre:  ${book['genre']}`}
              </div>
              <button className="ui inverted blue button" style={{fontSize:"12px"}} onClick={()=>{
                history.push({pathname:"/book",state:{"book":book}})
            }}>
                View Book
            </button>
          </div>
      
  </div>))}
</div>
</div>
    </div>
    </div>
);
};

export default HomePage;