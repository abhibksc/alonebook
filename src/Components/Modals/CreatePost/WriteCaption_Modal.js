import ReactDOM from 'react-dom';


import { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { signIn, signup, signupCheck } from "../../../Store/LoginSignUpSlice"
import { login } from '../../../Store/LoginSignUpSlice';
import { FaArrowRight } from "react-icons/fa6";
// import PostOperation from '../../../CrudOperations/PostOperation';
import axios from 'axios'; // Import axios properly
import { CreatePostOperation } from '../../../CrudOperations/PostOperation';
import { HandleImg } from '../../../Store/MenuBarSlices';
import { FaArrowLeft } from "react-icons/fa";
import Discard_Modal from './Discard_Modal';
import { CSSTransition } from 'react-transition-group';
import './DiscardModal.css';






const WriteCaption_Modal = () => {



  const navigate = useNavigate();
  const dispatch = useDispatch();


  const userName = useSelector((state) => state.auth.userName);
  let Profileimage = useSelector((state) => state.auth.Profileimage);
  const userId = useSelector((state) => state.auth.userId);
  const HandlePostedImages = useSelector((state) => state.HandlePostedImages.img);


  console.log(userName);
  console.log(Profileimage);
  console.log(userId);
  console.log(HandlePostedImages);

  if (!Profileimage) {
    Profileimage = "not Assigned"
    console.log("Profileimage setted");
  }





  const [Caption, setCaption] = useState('');
  const [discardToggle, setdiscardToggle] = useState(false);
  const [ShimmerToggle, setShimmerToggle] = useState(false);



  const handleFileChange = (event) => {
    const file = event.target.value
    setCaption(file);



  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    alert("dont Panic, It will take some seconds just wait..");

    if (userName && HandlePostedImages && Caption && userId && Profileimage) {


      const imgEndPoint = await CreatePostOperation({ userName, Profileimage, userId, HandlePostedImages, Caption })

      dispatch(HandleImg(""))
  
      navigate("/Dashboard/Home")

      console.log(imgEndPoint);

    } else {
      console.log("Not worked");
    }

    //  console.log(imgEndPoint);


  };


  const handleArrow = () => {
    console.log("abhishek");

    setdiscardToggle(true)

  }



  return ReactDOM.createPortal(<>
    <div className=' SelectImge_Modal  '>

      <div className="text-white  h-full w-full flex justify-center items-center">

        <form className="SelectImge_Modal_Form   " action="" onSubmit={(e) => handleSubmit(e)} >
          <FaArrowLeft
            onClick={handleArrow}
          />

          <div className='flex flex-col  gap-5'>


            <h1 className="text-3xl text-center font-bold mb-5 md:mb-0">Create Post</h1>
            <textarea onChange={handleFileChange} className='bg-transparent focus:border-none focus:outline-none' id="description" name="description" placeholder="Write a Caption..."></textarea>

       





          </div>
          

          <button className=' w-10 mx-auto h-10 text-xl '>Post</button>

        </form>




        {/* {discardToggle && <Discard_Modal onClose={() => setdiscardToggle(false)} />
        } */}


        { <CSSTransition
          in={discardToggle}
          timeout={300}
          classNames="modal"
          unmountOnExit
        >

          <Discard_Modal onClose={() => {setdiscardToggle(false)
             setShimmerToggle(true)}} />



        </CSSTransition>
        }




      </div>


    </div>
  </>, document.getElementById('root'));

}










export default WriteCaption_Modal;  