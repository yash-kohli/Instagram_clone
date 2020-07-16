import React,{useState} from 'react';
import firebase from 'firebase';
import {Button} from '@material-ui/core';
import {db,storage} from './firebase';
import './ImageUpload.css';

function ImageUpload({username}) {

  const[caption,setCaption] = useState('');
  const[image,setImage] = useState(null);
  const[progress,setProgress] = useState('');
  
  const handleChange = e =>{
        if( e.target.value[0]){
          setImage(e.target.files[0]);
      }
  }
  const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // progress function ..
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes)*100
                );
                setProgress(progress);
                {/* ^ to get the presentage of data uploaded ^ */}
            },
            (error) => {
                // error function 
                console.log(error);
                alert(error.message);
            },
            () =>{
                // complete function => to use the image we need to get its downloadingurl
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then( url => {
                        // post image inside db
                        db.collection("posts").add({
                            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                            caption : caption,
                            imageUrl : url, // url is downloaded url
                            username : username 
                        });
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                        
                    });
            }            
        );
    };
  
  return (
        <div className="imageupload">
            <progress className="imageupload__progress" value={progress} max ="100"/>
            <input placeholder ='Enter a caption...' onChange={event => setCaption(event.target.value)} type = "text"/>
            <input type = "file" onChange = {handleChange}/>
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload
