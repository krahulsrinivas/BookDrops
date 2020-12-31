import React, { useEffect, useState } from 'react';
import AppBar from '../reusable/appbar';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {useCookies} from 'react-cookie';
const YourStories = () => {
    const [stories,setStories]=useState([]);
    const [cookies,,]=useCookies();
    const history=useHistory();
    useEffect(()=>{
        const request=async()=>{
            await axios.get(`http://localhost:3000/getBooks?by=${cookies['username']}&&status=published`).then((res)=>{
                console.log(res.data)
                setStories(res.data);
            }).catch((e)=>console.log(e));
        }
        request();
    },[])

    return (

        <div className="ui container" >
            <AppBar />
            <div className="ui inverted segment" style={{blockSize:"5000px"}}>
                <div>
                    <button class="ui inverted blue labeled icon button" style={{ fontSize: "15px", position: "absolute", right: "110px",top:"20px" }} onClick={()=>{
                        history.push('/description');
                    }}>
                        <i class="plus icon"></i>
                        New Story
                    </button>
                </div>
                <div style={{ marginLeft: "100px",marginTop: "50px",marginRight: "100px" }}>
                    <div className="ui inverted pointing menu">
                        <button className="ui active inverted white  button" style={{ fontSize: "20px", margin: "10px" }}>Your Stories</button>
                        <button className="ui inverted button" style={{ fontSize: "20px", margin: "10px" }} onClick={()=>history.push('/yourDrafts')}>Your Drafts</button>
                    </div>
                    <div style={{border:"1px solid white"}}>
                    <div style={{ marginTop: "30px", marginLeft: "30px",marginRight: "50px" }}>
                        <div class="ui inverted items">
                        {stories.map((book)=>(
                            <div class="item" style={{borderBottom:"1px solid white"}}>
                                <div class="image" style={{ marginBottom: "20px" }}>
                                    <img src={book['imageUrl']}></img>
                                </div>
                                <div class="content" style={{ marginTop: "10px",marginBottom: "20px" }}>
                                    <h1 class="header" style={{ fontSize: "30px", color: "white" }}>{book['title']}</h1>
                                    <div class="meta" style={{ fontSize: "22px", color: "white",width:"450px"}}>
                                        <p>{book['description']}</p>
                                    </div>
                                    <div class="description" style={{ fontSize: "15px", color: "red" }}>
                                        <p>{`Written by ${book['author']}`}</p>
                                    </div>
                                    <div class="extra" style={{ fontSize: "20px", color: "white", marginTop: "40px" }}>
                                        {`Genre:  ${book['genre']}`}
                                    <button className="ui inverted blue button" style={{ marginLeft: "40px" }} onClick={()=>{
                                        history.push({pathname:"/book",state:{"book":book}})
                                    }}>
                                        View Book
                                    </button>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>

    );
};

export default YourStories;