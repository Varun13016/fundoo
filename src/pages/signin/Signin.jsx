import React from "react";
import '../signin/Signin.css';
import TextField from '@mui/material/TextField';
import { Button, IconButton } from '@mui/material';
import { login } from '../../services/userservice';
import { useHistory } from "react-router-dom";


const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&-+=()])([a-zA-Z0-9]*).{8,}$/;

function Signin() {

    let history = useHistory()

    const [regexObj, setRegexObj] = React.useState({ borderEmail: false, emailHelper: "", borderPassword: false, passwordhelper: "" })

    const [signinObj, setSigninObj] = React.useState({ email: "", password: "" })

    const takeEmail = (event) => {
        setSigninObj({ ...signinObj, email: event.target.value })
    }
    const takePassword = (event) => {
        setSigninObj({ ...signinObj, password: event.target.value })
    }

    const createAccount = () => {
        history.push("/signup")
    }

    const submit = () => {
        let emailTest, pwdTest
        if (signinObj.email === "" && signinObj.password === "") {
            setRegexObj(prevState => ({
                ...prevState, borderEmail: true, emailHelper: "enter correct email",
                passwordhelper: "enter correct", borderPassword: true
            }))
        } else {
            emailTest = emailRegex.test(signinObj.email)
            pwdTest = passwordRegex.test(signinObj.password)
            console.log(emailTest)
            if (emailTest === false) {

                setRegexObj(prevState => ({ ...prevState, borderEmail: true, emailHelper: "enter correct email" }))
            }
            else {
                setRegexObj(prevState => ({ ...prevState, borderEmail: false, emailHelper: "" }))

            }
            console.log(pwdTest)
            if (pwdTest === false) {
                setRegexObj(prevState => ({ ...prevState, borderPassword: true, passwordhelper: "enter correct format password" }))

            }
            else {
                setRegexObj(prevState => ({ ...prevState, borderPassword: false, passwordhelper: "" }))

            }
        }
        if (emailTest === true && pwdTest === true) {

            login(signinObj).then((response) => {
                console.log(response)
                localStorage.setItem("token", response.data.id)
                history.push("/Dashboard")
            }).catch((err) => {
                console.log(err)
            })
        }
    }


    return (
        <div className="mainbox">
            <div className="box">
                <div id="G">G</div>
                <div id="o1">o</div>
                <div id="o2">o</div>
                <div id="g">g</div>
                <div id="l">l</div>
                <div id="e">e</div>
            </div>
            <div className="text">Sign in</div>
            <div className="gmail">to continue to Gmail</div>
            <div className="mailbox">
                <TextField id="outlined-basic" onChange={takeEmail} error={regexObj.borderEmail} helperText={regexObj.emailHelper} label="Email or Phone" variant="outlined" size="medium" />
            </div>
            <div className="password">
                <TextField id="outlined-basic" type="password" label="Password" onChange={takePassword} helperText={regexObj.passwordhelper} error={regexObj.borderPassword}
                    variant="outlined" size="medium" />
            </div>
            <div className="forget">Forgot email ?</div>
            <div className="text1">Not your computer? Use Guest mode to sign in privately.</div>
            <div className="learnmore">Learn more</div>
            <div className="middle">
                <Button className="create" onClick={createAccount}> Create account</Button>
                <div className="click"><Button variant="contained" size="large" onClick={submit} >Next</Button></div>
            </div>
        </div>
    );
}
export default Signin
