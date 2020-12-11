import React, { useState} from 'react';
import { useHistory} from 'react-router-dom';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import cover from './cover.jpg';
const Description = () => {
  const history = useHistory();
  const [cookies,,]=useCookies();
  const [imageUrl, setimageUrl] = useState('');
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');
  const [genre,setGenre]=useState('');
  const [value,setValue]=useState('');

  const handleSubmit=async (book)=>{
    await axios.post('http://localhost:3000/postBook',book).then((res) => {
      history.push({pathname:'/editor',state:{title:res.data['title'],id:res.data['_id']}});
                }).catch((e) => {
                    console.log(e);
                });
  }

  return (
    <div className="ui inverted segment container" style={{ margin: "1px", blockSize: "900px" }}>
      <div style={{ margin: "10px" }}>
        <button className="ui red inverted button" onClick={() => {
          history.goBack();
        }}> <center><i class="arrow left icon" style={{ fontSize: "15px" }}></i></center></button>
        <button class="ui inverted blue right labeled icon button" style={{ position: "absolute", right: "20px" }} onClick={() => handleSubmit({"imageUrl":imageUrl,"title":title,"description":description,"genre":genre,"author":cookies['username'],"status":"draft"})} >
          <i class="right arrow icon" style={{ fontSize: "15px" }}></i>
  Next
</button>
      </div>
      <div style={{ position: "absolute", top: "200px", left: "70px"}}>
        <img src={(imageUrl)?imageUrl:cover} alt="Book Cover" width="240" height="330"  onError={()=>{setimageUrl('')}}></img>
        <div style={{ marginTop: "30px" }}>
          <textarea rows="3" placeholder="Enter a Url" onChange={(e) => {
            setValue(e.target.value);
            setimageUrl(e.target.value)
          }} value={value} style={{width:"270px"}}></textarea></div>
      </div>
      <div style={{ marginLeft: "400px", marginTop: "50px", fontWeight: "bold", fontSize: "35px" }}>
        Story Details
        </div>
      <div style={{ marginLeft: "400px", marginTop: "70px", marginRight: "50px" }}>
        <h1 style={{ fontSize: "25px" }}>Title</h1>
        <div className="ui fluid huge input" ><input type="text" placeholder="Enter a title" value={title} onChange={(e)=>setTitle(e.target.value)}></input></div>
        <div class="ui form">
          <div>
            <h1 style={{ fontSize: "25px", marginTop: "30px" }}>Description</h1>
            <textarea type="text" placeholder="Enter Description" rows="3" style={{ fontSize: "20px" }} value={description} onChange={(e)=>setDescription(e.target.value)} ></textarea>
          </div>
          <div>
            <h1 style={{ fontSize: "25px", marginTop: "20px" }}>Genre</h1>
            <div
              className="ui small input focus">
              <select className="ui selection dropdown" style={{ fontSize: "20px" }} value={genre} onChange={(e)=>setGenre(e.target.value)}>
                <option value="">Select a Genre</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Romance">Romance</option>
                <option value="Biography">Biography</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;