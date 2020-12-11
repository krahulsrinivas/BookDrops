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
        <div className="ui inverted segment" style={{marginTop:"50px",marginBottom:"50px",marginLeft:"500px",marginRight:"500px"}}>
        <h1>Welcome to BookDrops</h1>
        </div>
        <div className="ui inverted segment" style={{marginLeft:"550px",marginRight:"550px"}}>
            <form className="ui form" onSubmit={(event) => event.preventDefault()} >
                <div style={{ margin: '10px' }}><h1>Register </h1></div>
                <div className="ui container">
                    <div className="ui large input" style={{ margin: '10px' }}>
                        <input
                            type="text"
                            placeholder="Email"
                            value={auth['email']}
                            onChange={(e) => formChange(e, 'email')}
                        />
                    </div>
                    <div>
                        <div className="ui large input" style={{ margin: '10px' }}>
                            <input
                                type="text"
                                placeholder="Username"
                                value={auth['username']}
                                onChange={(e) => formChange(e, 'username')}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="ui large input" style={{ margin: '10px' }}>
                            <input
                                type="password"
                                placeholder="Password"
                                value={auth['password1']}
                                onChange={(e) => formChange(e, 'password1')}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="ui large input" style={{ margin: '10px' }}>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={auth['password2']}
                                onChange={(e) => formChange(e, 'password2')}
                            />
                        </div>
                    </div>
                    <div style={{ margin: '10px' }}>
                        <button className="ui inverted teal button" onClick={handleSubmit}>
                            Register
                            </button>
                    </div>
                    <div>Already have an account?
                    <Link to="/login"><button className="ui inverted teal button" style={{ margin: '10px' }}>Login</button></Link>
                    </div>
                </div>
            </form>
            </div>
            {loader === true ? (
                <div className="ui large active loader"></div>
            ) : (
                    <div></div>
                )}
        </center>
    );
}

export default Register;

