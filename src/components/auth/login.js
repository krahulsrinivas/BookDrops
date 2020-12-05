import React,{useState} from 'react';
import { Link,useHistory } from 'react-router-dom';
import axios from 'axios';
import {useCookies} from 'react-cookie';
const Login=()=>{
    const [auth,setAuth]= useState({"username":"","password":""});
    const [loader, setLoader] = useState(false);
    const [,setCookies,]=useCookies({});
    const history=useHistory();

    const formChange=(e,type)=>{
        const val = e.target.value
        setAuth({ ...auth, [`${type}`]: val })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if ( auth['username'].trim() !== "" || auth['password'].trim() !== "") {
                setLoader(true);
                await axios.post('http://localhost:3000/auth/login', auth).then((res) => {
                            setCookies('auth-token',res.data);
                            history.push("/home");
                }).catch((e) => {
                    console.log(e);
                    setLoader(false);
                });
        } else {
            alert("Please Enter all fields");
        }
    }
    return(
        <center>
        <div className="ui inverted segment" style={{marginTop:"50px",marginBottom:"50px",marginLeft:"500px",marginRight:"500px"}}>
        <h1>Welcome to BookDrops</h1>
        </div>
        <div className="ui inverted segment" style={{marginLeft:"550px",marginRight:"550px"}}>
            <form className="ui form" onSubmit={(event) => event.preventDefault()} style={{ marginBottom: '125px'}}>
                <div style={{ margin: '10px' }}><h1>Login</h1></div>
                <div className="ui container">
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
                                value={auth['password']}
                                onChange={(e) => formChange(e, 'password')}
                            />
                        </div>
                    </div>
                    <div style={{ margin: '10px' }}>
                        <button className="ui inverted teal button" onClick={handleSubmit}>
                            Login
                            </button>
                    </div>
                    <div>Don't Have an account?
                        <Link to="/"><button className="ui inverted teal button" style={{ margin: '10px' }}>Register</button></Link>
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

export default Login;