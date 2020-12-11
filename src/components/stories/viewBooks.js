import React,{useState,useEffect} from 'react';
import {useHistory,useLocation} from 'react-router-dom';
import { Editor, EditorState} from 'draft-js';

const Book=()=>{
    const history=useHistory();
    const location=useLocation();
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    useEffect(() => {
        setEditorState(location.state.book['content']);
        console.log(location.state.book['content']);
    }, [])
    return(
        <div className="ui inverted segment container" style={{ margin: "1px", blockSize: "50000px" }}>
      <div style={{ margin: "10px" }}>
        <button className="ui red inverted button" onClick={() => {
          history.goBack();
        }}> <center><i class="arrow left icon" style={{ fontSize: "15px" }}></i></center></button>
      </div>
      <div style={{ marginBottom: "50px",marginTop:"20px" }}><center><h1 style={{ fontWeight: "bold", fontSize: "40px" }}>{location.state.book['title']}</h1></center></div>

    <div style={{ marginLeft: "150px",marginRigh:"150px",marginTop:"20px",fontSize:"25px" }}>
    <Editor editorState={editorState} readOnly={true} onChange={setEditorState}/>
    </div>
      </div>
    );
}

export default Book;