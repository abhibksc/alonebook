import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GetProfileImage, GetUserName } from '../../CrudOperations/GetOperation';

const LoginModal = () => {
  const [Email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();

    if (Email !== '' && pass !== '') {
      try {
        let response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZtVpewu85FHwCQgRT4spwjWVCzyB5Fj0",
          {
            method: "POST",
            body: JSON.stringify({
              email: Email,
              password: pass,
              returnSecureToken: true,
            }),
          }
        );

        let data = await response.json();

        if (data.error) {
          alert("Invalid email or password");
        } else {
          const userName = await GetUserName({ userId: data.localId });
          const ProfilePic = await GetProfileImage({ userId: data.localId });

          const DataStore = {
            email: data.email,
            userId: data.localId,
            token: data.idToken,
            registered: data.registered,
            userName: userName[0].UserName,
            Profileimage: ProfilePic,
          };

          localStorage.setItem("user", JSON.stringify(DataStore));
          setEmail("");
          setPass("");
          alert("Welcome back!");
          navigate("/Dashboard/Home");
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    }
  };

  return (
    <div className='loginBlueDiv'>
      <div className="loginDiv">
        <form className="loginForm" onSubmit={handleForm}>
          <h1 className="text-3xl text-center font-bold mb-5 md:mb-0">Login</h1>

          <div className="mx-auto flex flex-col gap-10 mb-20 md:mb-0 text-center">
            <div className="flex flex-col gap-3">
              <label className="font-bold text-4" htmlFor="email">Email</label>
              <input
                className="p-2 text-black rounded"
                type="email"
                id="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="font-bold text-4" htmlFor="password">Password</label>
              <input
                className="p-2 text-black rounded"
                type="password"
                id="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>

            <button className="sign_up_btn" type="submit">Login</button>

            <div className="flex flex-col">
              <button className="p-3 mx-auto hover:text-blue-400">
                <Link to={"/forget"}>Forget Password?</Link>
              </button>

              <span className='hover:text-blue-400' onClick={() => navigate("/signup")}>
                Don't have an account? Sign up here.
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
