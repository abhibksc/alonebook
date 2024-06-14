import ReactDOM from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GetProfileImage, GetUserName } from '../../CrudOperations/GetOperation';






const LoginModal = () => {



  // UseState hook

  const [Email, setEmail] = useState("");
  const [pass, setPass] = useState("");


  // useSelector  and useDispatch and useNavigate hooks
  const navigate = useNavigate();




  const handleForm = async (e) => {
    e.preventDefault();



    if (Email !== '' && pass !== '') {
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


      if (data.error) return alert("Invalid email or password")

      else {

        console.log(data);

        if (data.registered === true) {
          console.log(data.registered);
          console.log(data.idToken);
          console.log(data.localId);


         const userName =  await GetUserName({userId : data.localId})
         const ProfilePic =  await GetProfileImage({userId : data.localId})
         console.log(ProfilePic);

         console.log(userName[0].UserName);

          const DataStore = {

            email : data.email,
            userId : data.localId,
            token : data.idToken,
            ragistered : data.registered,
            userName : userName[0].UserName,
            Profileimage : ProfilePic

          }

           localStorage.setItem("user", JSON.stringify(DataStore));


         


          setEmail("")
          setPass("")
          alert("Welcome back!")
          navigate("/Dashboard/Home");


        }
        else if (data.registered === false) {
          console.log("ye pakka se chal rha");
          alert("Please Signup")
        }

      }
    }
  }


  return ReactDOM.createPortal(<>
    <div className='loginBlueDiv'>

      <div className="loginDiv">

        <form className="loginForm" action="" onSubmit={handleForm}>

          <h1 className="text-3xl text-center font-bold mb-5 md:mb-0">Login</h1>

          <div className="mx-auto flex flex-col gap-10 mb-20 md:mb-0 text-center  ">

            <div className="flex flex-col gap-3">
              <label className="font-bold text-4" htmlFor="">Email</label>
              <input className="p-2 text-black  rounded"
                type="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="flex flex-col gap-3">
              <label className="font-bold text-4" htmlFor="">Password</label>
              <input className="p-2 text-black rounded"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)} />
            </div>

            <button className="sign_up_btn">Login</button>



            <div className="flex flex-col ">

     <div className='flex flex-col border '>
     <h1>for guest</h1>
             <span>email :- abc@gmail.com</span>
             <span>pass :- abhishek</span>
     </div>

        

              <button className=" p-3  mx-auto hover:text-blue-400">
                <Link to={"/forget"}>Forget Password?</Link>
              </button>


              <button className='hover:text-blue-400'
                onClick={() => {
                  navigate("/signup")
                }}>
                Dont have account, SignUp here.
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  </>, document.getElementById('roots'));

}




export default LoginModal;  