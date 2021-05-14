import React, { useEffect, useState } from 'react';
import AppBar from '../reusable/appbar';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
const HomePage = () => {
    const [page, setPage] = useState({});
    const history = useHistory();
    useEffect(() => {
        const request = async () => {
            await axios.get(`http://localhost:3000/books?status=published`).then((res) => {
                setPage({ "Most Popular Books": res.data['popularBooks'], "Comedy Books": res.data['comedyBooks'], "Action Books": res.data['actionBooks'], "Romance Books": res.data['romanceBooks'] })
            }).catch((e) => console.log(e));
        }
        request();
    }, []);

    return (
        <div className="ui container" >
            <AppBar />
            <div className="ui inverted segment" style={{ height: "5000px" }}>
                {Object.keys(page).map((section) => (<div style={{ margin: "50px" }}>
                    <h1 style={{ marginLeft: "10px" }}>{section}</h1>
                    <hr class="solid" style={{ marginLeft: "10px" }} />
                    <div class="ui grid">
                        {page[section].map((book) => (
                            <div class="three wide column" style={{ marginTop: "20px", marginLeft: "10px" }}>
                                <div class="image">
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
                                    Read Book
        </button>

                            </div>))}
                    </div>
                </div>))}
            </div>
        </div>
    );
};

export default HomePage;