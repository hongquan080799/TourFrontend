import React,{useState, useEffect} from 'react'
import './Register.css'
import firebase from 'firebase'
import {store} from '../../firebase'
import * as userApi from '../../api/UserApi'
import { useHistory } from 'react-router-dom'
export default function Register() {
    const [image,setImage] = useState("https://img.icons8.com/material-sharp/96/000000/user-male-circle.png")
    const [progress,setProgress] =useState(0)
    const [register,setRegister] = useState({})

    const handleImage = async (e)=>{
  
        // code here
        var file = e.target.files[0];
       // console.log('dsds')
        const fileNameFirst = file?.name;
        const fileNameFinal = fileNameFirst?.replace(/ /g,'')
        var storageRef =  store.ref().child("images/"+fileNameFinal)
        
        // const metadata = {
        //   contentType: 'image/jpeg'
        // };
     
        const uploadTask = storageRef.put(file);
        // uploadTask.task.on(firebase.storage.TaskEvent.STATE_CHANGED,
        //   function progress(snapshot){
        //     let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
        //     setProgress(percentage)
        //     console.log(12)
        //   }
        // )
        uploadTask.on(`state_changed`,snapshot=>{
          setProgress((snapshot.bytesTransferred/snapshot.totalBytes)*100)
        },
        (err)=>{
          console.log(err)
        },
        ()=>{
          store.ref().child('images').child(fileNameFinal).getDownloadURL().then(url=> setImage(url));
        }
        )
        
       // console.log(image)
    }
    const handleInputChange = (e)=>{
        const {name, value} = e.target;
        setRegister({
            ...register,
            [name]:value
        })
    }
    const handleSubmid = (e)=>{
        e.preventDefault()
        console.log(register)
        const data = {...register};
        if(data.password != data.rePassword){
            alert('Password is not matched !!!')
            return
        }
        delete data.rePassword
        data.photo = image
        try {
            userApi.getRegister(data)
            alert('Your account have created successfully !!!\n Please verify your account by link have been sent to your email')
        } catch (error) {
            alert('Your account failed to created !!!') 
        }
    }
    const history =  useHistory()
    return (
        <div className="myRegisterContainer">
            <div className="register-container">
                <div className="myRC">
                    <div className="register-container__left">
                        <div className="register-left">
                        <img src="https://img.icons8.com/color/100/000000/fenix.png"/>    
                            <p className="left-text text-danger">
                                NOTHING IS IMPOSIBLE
                            </p>
                        </div>
                    </div>
                    <div className="register-container__right">
                        <form>
                            <p className="register__head">
                                REGISTER
                            </p>
                            <input type="text" className="form-control" placeholder="Enter your username" name="username" onChange={handleInputChange}  />
                            <div className="form-inline d-flex justify-content-between">
                                <input type="password" className="form-control" placeholder="Enter your password" name="password" onChange={handleInputChange} />
                                <input type="password" className="form-control" placeholder="Re-enter your password" name="rePassword" onChange={handleInputChange}  />
                            </div>
                            <input type="text" className="form-control" placeholder="Enter your name" name="ten" onChange={handleInputChange}  />
                            <input type="text" className="form-control" placeholder="Enter your phone number" name="sdt" onChange={handleInputChange} />
                            <input type="text" className="form-control" placeholder="Enter your email" name="email" onChange={handleInputChange} />
                            <input type="text" className="form-control" placeholder="Enter your address" name="diachi" onChange={handleInputChange} />
                            <select className="custom-select my-1 mr-sm-2" placeholder="Select your gender" name="gioitinh" onChange={handleInputChange} >
                            <option selected value={0}>Male</option>
                            <option value={1}>Female</option>
                            <option value={2}>Something else</option>
                            </select>
                            <div className="progress mt-3" style={{height:14,width:'20vw'}}>
                                <div className="progress-bar bg-success" role="progressbar" style={{width: progress +'%'}}>{progress} %</div>
                            </div>
                            <div className="image-upload">
                                <label for="file-input">
                                <div style={{cursor:'pointer'}}>
                                <img src="https://img.icons8.com/clouds/100/000000/upload.png" style={{width:50}}/>
                                    <p>Pick an image</p>
                                </div>
                                </label>

                                <input id="file-input" type="file" className="mb-3" onChange={handleImage}/>
                            </div>
                            <div className="row mb-3">
                                <div className="col-12 col-sm-12 col-md-4 col-lg-3 text-center">
                                    <img alt="pt" src={image} className="input-img mb-4" style={{width:150}} />
                                </div>  
                            </div>

                            <button className="register__button" type="submit" onClick={handleSubmid}>Register</button>
                            <hr/>
                            <hr/>
                            <div className="text-center">
                                <a href="#" className="custom-link">Already have an account? Sign in now !</a><br/>
                                <a href="#" className="custom-link">Forgot password</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
