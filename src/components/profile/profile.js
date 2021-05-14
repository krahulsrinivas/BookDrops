import React, { useState, useEffect } from 'react';
import AppBar from '../reusable/appbar';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
const Profile = () => {
    const [stories, setStories] = useState([]);
    const [user, setUser] = useState({ "UserName": "" });
    const history = useHistory();
    const location = useLocation();
    useEffect(() => {
        const request = async () => {
            await axios.get(`http://localhost:3000/user?name=${location.state.username}`).then(async (usr) => {
                await axios.get(`http://localhost:3000/getBooks?by=${usr.data['UserName']}&&status=published`).then((res) => {
                    setUser(usr.data);
                    setStories(res.data);
                }).catch((e) => console.log(e));
            });
        }
        request();
    }, []);
    var test = Date.parse(user['createdAt']);
    var date = new Date(test);
    return (
        <div className="ui container" >
            <AppBar />
            <div className="ui inverted segment" style={{ blockSize: "5000px" }}>
                <div style={{ margin: "50px" }}>
                    <img class="ui large bordered image" src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="null"></img>
                    <div style={{ position: "absolute", top: "80px", left: "600px" }}>
                        <h1 style={{ fontSize: "40px" }}>UserName</h1>
                        <h3 style={{ fontSize: "25px" }}>{user['UserName']}</h3>
                        <h1 style={{ fontSize: "40px", marginTop: "50px" }}>Email</h1>
                        <h3 style={{ fontSize: "25px" }}>{user['Email']}</h3>
                    </div>
                    <div style={{ position: "absolute", top: "80px", left: "850px" }}>
                        <h1 style={{ fontSize: "40px" }}>Date Joined</h1>
                        <h3 style={{ fontSize: "25px" }}>{date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()}</h3>
                    </div>
                    <div style={{ marginTop: "75px" }}>
                        <h1>{`Books by ${user['UserName']}`}</h1>
                        <hr class="solid" />
                        <div class="ui grid">
                            {stories.map((book) => (
                                <div class="three wide column" style={{ marginTop: "20px", marginLeft: "10px" }}>
                                    <div class="image" >
                                        <img src={book['imageUrl']} width="170px" height="280" alt="null"></img>
                                    </div>
                                    <div style={{ marginTop: "2px", marginLeft: "2px" }}>
                                        <div>
                                            <p style={{ marginTop: "2px", fontSize: "25px", color: "white" }}>{book['title']}</p>
                                        </div>
                                        <div style={{ marginTop: "2px", fontSize: "15px", color: "#b4b5b8" }}>
                                            <p >{`by ${book['author']}`}</p>
                                        </div>
                                        <div style={{ marginTop: "4px", fontSize: "15px", color: "white", marginBottom: "5px" }}>
                                            {`Genre:  ${book['genre']}`}
                                        </div>
                                    </div>
                                    <button className="ui inverted blue button" style={{ marginTop: "5px", fontSize: "13px" }} onClick={() => {
                                        history.push({ pathname: "/book", state: { "book": book } })
                                    }}>
                                        Read Book</button>
                                </div>))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;