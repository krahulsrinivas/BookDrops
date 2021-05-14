import React, { useState } from 'react';
import { Link,useHistory } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import axios from 'axios';
const Register = (props) => {
    const [auth, setAuth] = useState({ 'email': "", 'username': "", 'password1': "", 'password2': "" });
    const [,setCookies,]=useCookies({});
    const [loader, setLoader] = useState(false);
    const history=useHistory();
    const formChange = (e, type) => {
        const val = e.target.value
        setAuth({ ...auth, [`${type}`]: val })
    }
    const handleSubmit = async (event) => {
        if (auth['email'].trim() !== "" || auth['username'].trim() !== "" || auth['password1'].trim() !== "" || auth['password2'].trim() !== "") {
            if (auth['password1'].trim() === auth['password2'].trim()) {
                setLoader(true);
                console.log(auth);
                axios.post('http://localhost:3000/auth/register', auth).then((res) => {
                    setCookies('auth-token',res.data['token']);
                    setCookies('username',res.data['username']);
                    history.push("/home");
                }).catch((e) => {
                    console.log(e);
                    setLoader(false);
                });
            } else {
                alert("Passwords do not match");
                setAuth({ ...auth, 'password1': "", 'password2': "" })
            }
        } else {
            alert("Please Enter all fields");
        }
    }
    return (
        <center>
        <div className="ui inverted segment" style={{marginTop:"2px",marginBottom:"50px",marginLeft:"400px",marginRight:"400px"}}>
        <h1 style={{fontFamily:"fantasy",fontWeight:"bold",fontSize:"50px"}}>Welcome to BookDrops</h1>
        </div>
        <div className="ui inverted segment" style={{marginLeft:"400px",marginRight:"400px"}}>
            <form className="ui form" onSubmit={(event) => event.preventDefault()} style={{marginBottom: '18%'}}>
            <h1 style={{ margin: '10px',fontStyle:"italic",fontWeight:"bold",fontSize:"45px"}}>Register</h1>
                <div className="ui container">
                    <div className="ui big input" style={{ margin: '15px',width:"500px"}}>
                        <input
                            type="text"
                            placeholder="Email"
                            value={auth['email']}
                            onChange={(e) => formChange(e, 'email')}
                        />
                    </div>
                    <div>
                        <div className="ui big input" style={{margin: '15px',width:"500px" }}>
                            <input
                                type="text"
                                placeholder="Username"
                                value={auth['username']}
                                onChange={(e) => formChange(e, 'username')}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="ui big input" style={{ margin: '15px',width:"500px" }}>
                            <input
                                type="password"
                                placeholder="Password"
                                value={auth['password1']}
                                onChange={(e) => formChange(e, 'password1')}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="ui big input" style={{ margin: '15px',width:"500px" }}>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={auth['password2']}
                                onChange={(e) => formChange(e, 'password2')}
                            />
                        </div>
                    </div>
                    <div style={{ margin: '10px' }}>
                        <button className="ui inverted teal button" onClick={handleSubmit} style={{width:"150px",height:"40px"}}>
                            Register
                            </button>
                    </div>
                    <div style={{fontSize:"25px"}}>Already have an account?
                    <Link to="/login"><button className="ui inverted teal button" style={{ margin: '10px',width:"100px",height:"35px"}}>Sign-In</button></Link>
                    </div>
                </div>
            </form>
            </div>
            {loader === true ? (
                <div className="ui large active loader" style={{marginTop:"20%"}}></div>
            ) : (
                    <div></div>
                )}
        </center>
    );
}

export default Register;

