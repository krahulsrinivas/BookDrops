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
                    console.log(res.data)
                    setCookies('auth-token',res.data['token']);
                    setCookies('username',res.data['username']);
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
        <div className="ui inverted segment" style={{marginTop:"2px",marginBottom:"50px",marginLeft:"400px",marginRight:"400px"}}>
        <h1 style={{fontFamily:"fantasy",fontWeight:"bold",fontSize:"50px"}}>Welcome to BookDrops</h1>
        </div>
        <div className="ui inverted segment" style={{marginLeft:"400px",marginRight:"400px"}}>
            <form className="ui form" onSubmit={(event) => event.preventDefault()} style={{ marginBottom: '43%'}}>
                <h1 style={{ margin: '10px',fontStyle:"italic",fontWeight:"bold",fontSize:"45px"}}>Sign-In</h1>
                <div className="ui container">
                    <div>
                        <div className="ui big input" style={{ margin: '15px',width:"500px"}}>
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
                                value={auth['password']}
                                onChange={(e) => formChange(e, 'password')}
                            />
                        </div>
                    </div>
                    <div style={{ margin: '10px'}}>
                        <button className="ui inverted teal button" onClick={handleSubmit} style={{width:"150px",height:"40px"}}>
                            Sign-In
                            </button>
                    </div>
                    <div style={{fontSize:"25px"}}>Don't Have an account?
                        <Link to="/"><button className="ui inverted teal button" style={{ margin: '10px',width:"100px",height:"35px"}}>Register</button></Link>
                    </div>
                </div>
            </form>
            </div>
            {loader === true ? (
                <div className="ui large active loader" style={{ marginTop: '20%' }}></div>
            ) : (
                    <div></div>
                )}
        </center>
    );
}

export default Login;