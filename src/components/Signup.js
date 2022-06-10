import React,{useState} from 'react'
import { useNavigate} from "react-router-dom";
const Signup = (props) => {
    const [credentials, setcredentials] = useState({name:"",email:"",password:"",cpassword:""});
    let navigate = useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response= await fetch(`http://localhost:5000/api/auth/createUser`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
                
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
        });
        const json= await response.json();        
        
         if(json.success){
            
            localStorage.setItem('token',json.token);
            navigate('/');
            props.showAlert("New Account Created Successfully","success");
        }
        else{
            props.showAlert("Invalid Credentials","danger");
        }
         

    }
    const onChange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label for="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" value={credentials.name} name='name' aria-describedby="emailHelp" onChange={onChange} />

            </div>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" value={credentials.email} name='email' aria-describedby="emailHelp" onChange={onChange} />

            </div>
            <div className="mb-3">
                <label for="password" className="form-label" >Password</label>
                <input type="password" className="form-control" name="password" id="password" value={credentials.password} onChange={onChange} />
            </div>
            <div className="mb-3">
                <label for="cpassword" className="form-label" >Confirm Password</label>
                <input type="password" className="form-control" name="cpassword" id="cpassword" value={credentials.cpassword} onChange={onChange} />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Signup