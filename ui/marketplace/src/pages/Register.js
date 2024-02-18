import {useRef, useState, useEffect} from "react";
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [formTouched, setFormTouched] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    if (user) { // Only test if user is not empty
      const result = USER_REGEX.test(user);
      console.log(result);
      setValidName(result);
    }
  }, [user]);
  
  useEffect(() => {
    if (pwd) { // Only test if pwd is not empty
      const result = PASS_REGEX.test(pwd);
      console.log(result);
      setValidPwd(result);
    }
    if (pwd && matchPwd) { // Only test if both pwd and matchPwd are not empty
      const match = pwd === matchPwd;
      setValidMatch(match);
    }
  }, [pwd, matchPwd]);

  useEffect(() => {
    if (formTouched) {
      setErrMsg('');
    }
  }, [user, pwd, matchPwd, formTouched]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const v1 = USER_REGEX.test(user);
    const v2 = PASS_REGEX.test(pwd);
    
    if(!v1 || !v2) {
      setErrMsg('Invalid Entry');
      return;
    }

    //submit to mongoDB

    setSuccess(true);
  }

return (

  <>
  {success ? (
    <div className="alert alert-success" role="alert">
      Registration Successful
    </div>
  ) : (

<section className="vh-100">
  <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
  <div className="container py-5 h-100">
    <div className="row d-flex align-items-center justify-content-center h-100">
      <div className="col-md-8 col-lg-7 col-xl-6">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Register img"/>
      </div>

      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <h1>Marketplace Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="username">
              Username:
              {/* <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span> */}
            </label>
            <input type="text" id="username" className="form-control form-control-lg"
            ref={userRef} 
            autoComplete="off" 
            onChange={(e) => setUser(e.target.value)}
            required
            aria-invalid = {validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => {
              setUserFocus(true);
              setFormTouched(true);
            }}
            onBlur={() => {
              setUserFocus(false);
              setFormTouched(true);
            }}
             />
          </div>
          {/* <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters. <br/>
            Must begin with a letter. <br/>
            Letters, numbers, underscores, and hyphens allowed.
          </p> */}

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="password">
              Password:
              <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
              </label>
            <input type="password" id="password"className="form-control form-control-lg"
            required
            aria-invalid = {validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            onChange={(e) => setPwd(e.target.value)}/>
            {/* <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters. <br/>
              Must include uppercase, lowercase, a number, and a special character. <br/>
              Allowed special characters: <span aria-label="exclamation mark">!</span>
              <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
              <span aria-label="dollar sign">$</span> <span aria-label="percent sign">%</span>
            </p> */}
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="confirm_pwd">
              Confirm Password:
              <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
              </label>
            <input type="password" id="confirm_pwd"className="form-control form-control-lg"
            required
            onChange={(e) => setMatchPwd(e.target.value)}
            aria-invalid = {validMatch ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}/>
            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field
            </p>
          </div>

          <div className="d-flex justify-content-around align-items-center mb-4">
            <Button disabled={!validName || !validPwd || !validMatch ? true : false} className="btn btn-primary btn-lg btn-block">Sign Up</Button>
          </div>
          <Link to="/login">
          <a href="#!">Already Registered?</a>
          </Link>
          

        </form>
      </div>
    </div>
  </div>
</section>
  )}
</>
);

}

export default Register;