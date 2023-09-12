import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Login = (props) => {
  const URL = process.env.URL;
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();

    if (json.success) {
      // save the auth token and redirect
      props.showAlert("Logged in successfully", "success");
      localStorage.setItem("token", json.authtoken);
      navigate("/");
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
  };
  return (
    <section className="vh-100">
      <div className="container h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone_image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1"><h1 className="text-center mb-5 mt-0">Log in</h1>
            <form>
              {/* <!-- Email input --> */}
              <div className="form-outline mb-4 mt-2" style={{backgroundColor:'#E3F2FD'}} >
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={credentials.email}
                  onChange={onChange}
                  autoComplete="off"
                />
                <label className="form-label" htmlFor="form1Example1">
                  Email address
                </label>
              </div>

              {/* <!-- Password input --> */}
              <div className="form-outline mb-4 " style={{backgroundColor:'#E3F2FD'}}>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={credentials.password}
                  onChange={onChange}
                />
                <label className="form-label" htmlFor="form1Example2">
                  Password
                </label>
              </div>

              {/* <!-- 2 column grid layout for inline styling --> */}
              <div className="row mb-4">
                <div className="col d-flex justify-content-center">
                  {/* <!-- Checkbox --> */}
                  <div className="form-check">
  <input
    className="form-check-input"
    type="checkbox"
    value=""
    id="flexCheckCheckedDisabled"
    checked
    disabled
  />
  <label className="form-check-label" htmlFor="flexCheckCheckedDisabled">
    Remember Me
      </label>
</div>
                </div>

                <div className="col">
                  {/* <!-- Simple link --> */}
                  <Link to="/signup">Forgot password?</Link>
                </div>
              </div>

              {/* <!-- Submit button --> */}
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary btn-block"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;