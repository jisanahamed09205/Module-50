import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { AiFillEye,AiFillEyeInvisible } from 'react-icons/ai';
import { Link } from "react-router-dom";

const Register = () => {

    const [registerError,setRegisterError] = useState('');
    const [success,setSuccess] = useState('');
    const [showPassword,setShowPassword] = useState(false);

    const handleRegister = (e) =>{
        e.preventDefault();
        // console.log('form submited');
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(name,email, password,accepted);

        // console.log(typeof password);
        if(password.length < 6 ){
            setRegisterError('Password should be at least 6 characters ')
            return; 
        }
        else if(!/[A-Z]/.test(password)){
            setRegisterError('Your password should have at least one uppercase characters')
            return;
        }
        else if(!accepted){
            setRegisterError('Please accept out terms & conditions!')
            return;
        }

        //reset error and success
        setRegisterError('');
        setSuccess('');

        //create user
        createUserWithEmailAndPassword(auth,email,password)
        .then(result=> {
            console.log(result.user)
            setSuccess('User Registered Successfully')

            // update profile
            updateProfile(result.user,{
                displayName: name,
                photoURL: "https://example.com/jane-q-user/profile.jpg"
            })
            .then()
            .catch(()=> console.log('profile updated'))

            //send verification email:
            sendEmailVerification(result.user)
            .then(()=>{
                alert('please check your email and verify your account');
            })
        })
        .catch(error =>{
            console.error(error);
            setRegisterError(error.message);
        })

    }
    return (
        <div className=" bg-red-100">
            <div className=" mx-auto md:w-1/2 ">
                <h2 className="text-3xl font-bold text-center mb-8">Please Register</h2>
                <form onSubmit={handleRegister}>
                    <input 
                        className=" shadow-2xl w-full mb-4 py-2 px-4 rounded" 
                        placeholder="Your Name" type="text" name="name" id="" required/>
                    <br />
                    <input className=" shadow-2xl w-full mb-4 py-2 px-4 rounded" placeholder="Email Address" type="email" name="email" id="" required/>
                    <br />
                    <div className="mb-4 relative">
                        <input 
                            className="shadow-2xl w-full  py-2 px-4 rounded" 
                            placeholder="Password" 
                            type={showPassword ? "text" : "password"} 
                            name="password" 
                            id="" required/>
                        <span className="absolute top-2 right-2 text-2xl  " onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? <AiFillEye ></AiFillEye> : <AiFillEyeInvisible></AiFillEyeInvisible> 
                            }
                        </span>
                    </div>
                    {/* <div className="mb-4 relative">
                        <input 
                            className="shadow-2xl w-3/4  py-2 px-4 rounded" 
                            placeholder="Password" 
                            type={showPassword ? "text" : "password"} 
                            name="password" 
                            id="" required/>
                        <div className="absolute top-0 mt-1 right-[180px] ">
                            <span className=" text-3xl " onClick={() => setShowPassword(!showPassword)}>
                                {
                                    showPassword ? <AiFillEye ></AiFillEye> : <AiFillEyeInvisible></AiFillEyeInvisible> 
                                }
                            </span>
                        </div>
                    </div> */}
                    <br />
                    <div className="mb-4">
                        <input type="checkbox" name="terms" id="terms" />
                        <label className="ml-2" htmlFor="terms">Accept our <Link target="blank" to="https://www.termsfeed.com/blog/sample-terms-and-conditions-template/">Terms & conditions</Link></label>
                    </div>
                    <br />
                    <input className="w-full btn btn-secondary mb-4" type="submit" value="Register" />
                </form>
                {
                    registerError && <p className=" text-xl text-center text-warning">{registerError}</p>
                }
                {
                    success && <p className="text-2xl text-center text-success">{success}</p>
                }
                <p>Already have an account? please <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;