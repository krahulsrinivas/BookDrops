import React from 'react';
import {useHistory} from 'react-router-dom';

const Description = () => {
    const history = useHistory();
    return (
        <div className="ui inverted segment container" style={{ margin: "1px" }}>
        <div>
            <button className="ui inverted button" onClick={() => {
                history.goBack();
            }}> <center><i class="arrow left icon" style={{ fontSize: "15px" }}></i></center></button>
            </div>
            <div>
            hello
            </div>
        </div>
    );
};

export default Description;