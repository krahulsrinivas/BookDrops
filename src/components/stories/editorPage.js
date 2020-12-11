import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Editor, EditorState, RichUtils } from 'draft-js';
import createStyles from 'draft-js-custom-styles';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Editorpage = () => {
    const history = useHistory();
    const location = useLocation();
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    console.log(editorState);

    const { styles, customStyleFn } = createStyles(['font-size']);
    const handleKeyCommand = (command, state) => {
        const newState = RichUtils.handleKeyCommand(state, command);
        if (newState) {
            onChange(newState);
        }
    };

    const onChange = (e) => {
        setEditorState(e);
    }

    const onFormatClick = (type) => {
        onChange(RichUtils.toggleInlineStyle(editorState, type));
    }

    const handleDraft = async () => {
        await axios.post('http://localhost:3000/draft',{'id':location.state.id,'content':editorState}).then((res) => {
            console.log('hi');
                      }).catch((e) => {
                          console.log(e);
                      });
        history.push('./yourDrafts');
    };

    const handlePublish = async () => {
        await axios.post('http://localhost:3000/publish', { 'id': location.state.id,'content':editorState}).then((res) => {
            alert("Book Successfully Published");
            history.push('/yourStories');
        }).catch((e) => {
            console.log(e);
        });

    };

    return (
        <div className="ui inverted segment container" style={{ margin: "1px", blockSize: "5000px" }}>
            <div style={{ margin: "10px" }}>
                <cont style={{ position: "absolute", right: "20px" }}>
                    <button class="ui inverted blue button" style={{ marginRight: "25px" }} onClick={() => { handleDraft() }}>
                        Save as Draft
                    </button>
                    <button class="ui red button" onClick={() => { handlePublish() }}>
                        Publish
                    </button>
                </cont>
            </div>
            <div style={{ margin: "50px" }}><center><h1 style={{ fontWeight: "bold", fontSize: "40px" }}>{(location.state.title) ? location.state.title : "Untitled-Book"}</h1></center></div>
            <div style={{ margin: "50px" }}>
                <div><div>
                <button class="ui inverted button" style={{margin:"5px"}} onClick={()=>onFormatClick("BOLD")}>Bold
                </button>
                <button class="ui inverted button" style={{margin:"5px"}} onClick={()=>onFormatClick("ITALIC")}>Italic</button>
                <button class="ui inverted button" style={{margin:"5px"}} onClick={()=>onFormatClick("UNDERLINE")}>Underline</button>
                <button class="ui inverted button" style={{margin:"5px"}} onClick={()=>{
                  const newEditorState = styles.fontSize.remove(editorState);
                  setEditorState(styles.fontSize.add(newEditorState,'40px'));
                }}>Header-Font</button>
                </div>
                <div style={{border: '2px solid white',blockSize:'5000px'}}>
                <div style={{margin:"50px",fontSize:"25px"}}>
                <Editor editorState={editorState} customStyleFn={customStyleFn} handleKeyCommand={handleKeyCommand} onChange={(e)=>onChange(e)}/>
                </div>
                </div></div>
            </div>
        </div>
    );
};

export default Editorpage;