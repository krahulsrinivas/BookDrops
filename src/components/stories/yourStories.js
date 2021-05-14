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
                    <button class="ui inverted blue labeled icon button" style={{ fontSize: "15px", position: "absolute", right: "160px",top:"20px" }} onClick={()=>{
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
                    <div style={{border:"2px solid grey"}}>
                    <div style={{ marginTop: "30px", marginLeft: "30px",marginRight: "50px" }}>
                        <div class="ui inverted items">
                        {stories.map((book)=>(
                            <div class="item" style={{borderBottom:"1px solid white"}}>
                            <img src={book['imageUrl']} alt="null" height="275px" width="180px" style={{marginRight:"40px",marginBottom:"30px"}}></img>
                                <div class="content" style={{ marginTop: "20px" }}>
                                    <h1 class="header" style={{ fontSize: "27px", color: "white" }}>{book['title']}</h1>
                                    <div class="meta" style={{ fontSize: "22px", color: "white",width:"450px"}}>
                                        <p>{book['description']}</p>
                                    </div>
                                    <div class="description" style={{ fontSize: "18px", color: "#b4b5b8" }}>
                                        <p>{`by ${book['author']}`}</p>
                                    </div>
                                    <div class="extra" style={{ fontSize: "20px", color: "white", marginTop: "40px",width:"650px",marginBottom:"25px"}}>
                                        {`Genre:  ${book['genre']}`}
                                    <button className="ui inverted blue button" style={{ fontSize:"15px",marginLeft: "480px" }} onClick={()=>{
                                        history.push({pathname:"/editor",state:{"book":book}})
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