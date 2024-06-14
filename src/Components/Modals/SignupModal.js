import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, signup, signupCheck, update } from '../../Store/LoginSignUpSlice';
import { Link, useNavigate } from 'react-router-dom';
import UpdateProfile from '../../CrudOperations/Update&Edit';

import { GetAllData, userIdChecker } from '../../CrudOperations/GetOperation';


const SignupModal = () => {

  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [UserName, setUserName] = useState('');



  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sig = useSelector((state) => state.IsLogin.signupp)
  const userId = useSelector((state) => state.auth.userId)
  const userNameeeee = useSelector((state) => state.auth.userName)
  const ragistered = useSelector((state) => state.auth.ragistered)




  useEffect(()=>{


    const fun = async()=>{


      

      // const data = GetAllData();
      // console.log(data);
    const data =  await UpdateProfile({UserName : userNameeeee ,userId,ragistered});
    console.log(data);

    console.log(userNameeeee);


    // dispatch the userName on redux


    

    if(userNameeeee !== ''){
      navigate("/Dashboard/ToUpdateProfile")
    }

      // navigate("/Dashboard/ToUpdateProfile")




    }

    fun();

  },[userNameeeee])






  console.log("signup" + "   " + sig);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mail !== '' && pass !== '' && UserName !== '') {

      const checkUserName = await userIdChecker({UserName});
      console.log(checkUserName);

      if(checkUserName){



        let response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZtVpewu85FHwCQgRT4spwjWVCzyB5Fj0",
          {
            method: "POST",
            body: JSON.stringify({
              email: mail,
              password: pass,
              returnSecureToken: true,
            }),
          }
        );
        let data = await response.json();
        console.log(data);


        if (data.error) {
          if (data.error.message == "EMAIL_EXISTS") {
            alert(data.error.message)
  
          }
          return alert(data.error.message);
        }


        else {

          await UpdateProfile({userId : data.localId ,UserName: UserName, ragistered : true});

          

          const DataStore = {

            email : data.email,
            userId : data.localId,
            token : data.idToken,
            ragistered : true,
            userName : UserName

          }

          

          localStorage.setItem("user", JSON.stringify(DataStore));


          // dispatch(signupCheck())
          dispatch(update({
            userName : UserName
          }))

        

  
  
          
          setMail("")
          setPass("")
          setUserName("")
          alert("Account successfully created.")
          navigate("/Dashboard/ToUpdateProfile")
  
        }
  
        









      }
     








    }
  }
  return ReactDOM.createPortal(<>
    <div className=' loginBlueDiv '>

      <div className="loginDiv">

        <form className="signup_form " onSubmit={handleSubmit}>

          <h1 className="text-3xl text-center font-bold mb-5 ">Signup</h1>


          <div className="mx-auto  flex flex-col gap-8 text-center ">

            <div className="flex flex-col gap-2">

              <label className="font-bold text-4" htmlFor="">UserName</label>

              <input className="p-2 text-black  rounded"
                type="text"
                value={UserName}
                onChange={(e) => setUserName(e.target.value.toLocaleLowerCase())} />
            </div>

            <div className="flex flex-col gap-2">

              <label className="font-bold text-4" htmlFor="">Email</label>

              <input className="p-2 text-black rounded"
                type="email" value={mail}
                onChange={(e) => setMail(e.target.value.toLocaleLowerCase())} />
            </div>

            <div className="flex flex-col gap-2">

              <label className="font-bold text-4" htmlFor="">Password</label>

              <input className="p-2 text-black rounded"
                type="text"
                value={pass}
                onChange={(e) => setPass(e.target.value)} />
            </div>

            <div className="flex justify-between flex-col gap-3">

              <button className="sign_up_btn">Signup</button>

              <button className="p-4  mx-auto hover:text-blue-400"
                onClick={
                  () =>   navigate("/login")
                  
                }>Already have an account, login here.
              </button>


            </div>
          </div>

        </form>
      </div>
    </div>
  </>, document.getElementById('roots'));
}

export default SignupModal;  