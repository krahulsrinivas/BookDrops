import React from 'react';
import AppBar from '../reusable/appbar';
import {useHistory} from 'react-router-dom';

const HomePage=()=>{
    const history=useHistory();
return(
    <div className="ui container" >
    <AppBar />
    <div className="ui inverted segment" style={{blockSize:"900px"}}>
    
    </div>
    </div>
);
};

export default HomePage;