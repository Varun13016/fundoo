import React from 'react';
import '../signup/signup.css';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button, IconButton,  } from '@mui/material';
import { SignUp } from '../../services/userservice';
import { useHistory } from 'react-router-dom';

const emailRegex =
/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&-+=()])([a-zA-Z0-9]*).{8,}$/;
const firstNameRegex = /[A-Z]{1}[a-z]{2,}/;
const lastNameRegex = /[A-Z]{1}[a-z]{2,}/;

function Signup(){

    let history=useHistory()

    const [ regexObj,setRegexObj ] = React.useState({
        firstnameerror:false, firstnamehelper:" ",
        lastnameerror:false, lastnamehelper:" ",
        passworderror:false, passwordhelper:" ",
        usernameerror:false, usernamehelper:" ",
    })
    const [signupObj, setSignupObj] = React.useState({firstName : "", lastName : "",service : "advance",
    email :"", password : ""})

    const takefirstname =(event) => {
        setSignupObj({...signupObj,firstName : event.target.value})
    }
    const takelastname =(event) => {
        setSignupObj({...signupObj,lastName : event.target.value})
    }
    const takeusername =(event) => {
        setSignupObj({...signupObj,email : event.target.value})
    }
    const takepassword =(event) => {
        setSignupObj({...signupObj,password : event.target.value})
    }

    const signInInstead =() => {
        history.push("/")
    }
    const submit =() => {

        let emailTest,pwdTest,firstnametest,lastnametest
        if(signupObj.email === "" && signupObj.password === "" &&
         signupObj.firstName === "" && signupObj.lastName === "")
        {
           setRegexObj(prevState => ({...prevState, usernameerror : true, usernamehelper: "enter correct email",
           passwordhelper  : "enter correct password", passworderror : true, 
           firstnameerror : true, firstnamehelper :"enter correct format",
           lastnameerror : true, lastnamehelper :"enter correct format"
        }))
        }
        else {
            emailTest = emailRegex.test(signupObj.email)
            pwdTest = passwordRegex.test(signupObj.password)
            firstnametest = firstNameRegex.test(signupObj.firstName)
            lastnametest = lastNameRegex.test(signupObj.lastName)
            console.log(emailTest)
            if(emailTest === false) {
                setRegexObj(prevState => ({...prevState, usernameerror : true, usernamehelper: "enter correct email"}))
            }
            else {
                setRegexObj(prevState => ({...prevState, usernameerror : false, usernamehelper :""}))
            }
            console.log(pwdTest)
            if(pwdTest === false) {
                setRegexObj(prevState => ({...prevState, passworderror : true, passwordhelper :"enter correct format passsword"}))
            }
            else{
                setRegexObj(prevState => ({...prevState, passworderror : false, passwordhelper :""}))
            }
            console.log(firstnametest)
            if(firstnametest === false){
                setRegexObj(prevState => ({...prevState, firstnameerror : true, firstnamehelper :"enter correct format"}))
            }
            else{
                setRegexObj(prevState => ({...prevState, firstnameerror : false, firstnamehelper :""}))
            }
            console.log(lastnametest)
            if(lastnametest === false) {
                setRegexObj(prevState => ({...prevState, lastnameerror : true, lastnamehelper :"enter correct format"}))
            }
            else{
                setRegexObj(prevState => ({...prevState, lastnameerror : false, lastnamehelper :""}))
            }
            if(emailTest === true && pwdTest === true && firstnametest === true && lastnametest === true )
            {
                SignUp(signupObj).then((response) => 
                {
                    console.log(response)
                })
                .catch((err) => {
                    console.log(err)
                })
            }   
       }

    }


    return(
        <div className="main">
            <div className="column1">
                <div className="google">
                    <div id="g">G</div>
                    <div id="o1">o</div>
                    <div id="o2">o</div>
                    <div id="g">g</div>
                    <div id="l">l</div>
                    <div id="e">e</div>
                </div>
                <div className="createone">
                    Create your Google Account
                </div>
                <div className="two">
                    <TextField className='boxtwo' label="First name" variant="outlined" size="small" 
                    error={regexObj.firstnameerror}helperText={regexObj.firstnamehelper} onChange={takefirstname}/>
                    <TextField className='boxtwo' label="Last name" variant="outlined" size="small" 
                    error={regexObj.lastnameerror}helperText={regexObj.lastnamehelper} onChange={takelastname}/>
                </div>
                <div className="username">
                    <TextField fullWidth id="fullWidth" label="Username" variant="outlined" size="small"
                    error={regexObj.usernameerror}helperText={regexObj.usernamehelper} onChange={takeusername}/>
                    You can use letter, numbers & periods
                </div>
                <div id="three">
                    <div className="three">
                        <TextField type="password" className='boxthree' label="Password" variant="outlined" size="small" 
                        error={regexObj.passworderror} helperText={regexObj.passwordhelper} onChange={takepassword}/>
                        <TextField type="password" className='boxthree' label="Confirm" variant="outlined" size="small" />
                    </div>
                    <div>Use 8 or more characters with a mix of letters, numbers & <br /> symbols </div>
                </div>
                <div className="passwordone">
                    <FormControlLabel control={<Checkbox />} label="Show password" />
                </div>
                <div id="lastone">
                    <Button className="instead" onClick={signInInstead}>Sign in instead</Button>
                    <div className="next"><Button variant="contained" size="large" onClick={submit}>Next</Button></div>
                </div>
            </div>
            <div className="img">
                <img src="https://ssl.gstatic.com/accounts/signup/glif/account.svg" alt='Google img'/>
                <div className='imgtxt'>One account. All of Google </div>
                <div className='txt'>working for you</div>
            </div>
        </div>
    );
}
export default Signup