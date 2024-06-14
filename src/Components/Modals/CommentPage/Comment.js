import ReactDOM from 'react-dom';

// import { useEffect, useState } from 'react';
// import { Link, Navigate, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
// import { signIn, signup, signupCheck, messages, update } from "../../Store/LoginSignUpSlice"
// import { login } from '../../Store/LoginSignUpSlice';
// import { GetAllData } from '../../CrudOperations/GetOperation';
// import { useAllDataFetch } from '../Hooks/useAllDataFetch';
// import { addCreatedPost } from '../../Store/MenuBarSlices';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HandleAllTogle, HandleCommentToggle, addComment } from '../../../Store/MenuBarSlices';
import { use, useEffect, useState } from 'react';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { PostComment, PostReply } from '../../../CrudOperations/PostOperation';
import { GetComment, userDetails } from '../../../CrudOperations/GetOperation';
import { Profile_Img_URL } from '../../../Constants/URLs';
import DateFormator from '../../Hooks/DateFormator';
import Reply from './Reply';
import { ref, onValue, push, serverTimestamp } from 'firebase/database';
import { db } from '../../../firebase/firebaseConfig';




const Comment = (props) => {
  const { Commentie_PostId, Commentie_UserId, Commentie_UserName, Commentie_Profileimage } = props.props;


  const userId = useSelector((state) => state.auth.userId);
  const Profileimage = useSelector((state) => state.auth.Profileimage);
  const userNames = useSelector((state) => state.auth.userName);
  const TotalComment = useSelector((state) => state.TotalComment.Comment)
  const [Comment_IDD, setComment_ID] = useState("");
  const [toggle, setToggle] = useState(false);
  const [togglePostBtn, settogglePostBtn] = useState(false)
  const dispatch = useDispatch();


  

  useEffect(() => {
    console.log("chal rha");

    const fun = async () => {
      const commentsPath = `${Commentie_UserId}/createpost/${Commentie_PostId}/Comment`;
      const commentsRef = ref(db, commentsPath);

      const unsubscribe = onValue(commentsRef, (snapshot) => {
        const commentsData = [];
        snapshot.forEach(childSnapshot => {
          const comment = childSnapshot.val();
          commentsData.push({ id: childSnapshot.key, ...comment });
        });

        console.log(commentsData);
        dispatch(addComment(commentsData));
      });

      // Clean up the subscription when the component unmounts
      return () => unsubscribe();
    };

    fun();

  }, [Commentie_PostId, Commentie_UserId, dispatch]);





















  const [CommentPost, setCommentPost] = useState({
    userName: ''
  })
  const [toggleReplies, settoggleReplies] = useState(false);
  const [view_hide, setView_hide] = useState("____ View replies")


















  // useEffect(() => {




  //   if (togglePostBtn) {


  //     const fun = async () => {



  //       // const Post_first_Comment = await PostComment({Commenter_UserName : userName, Commenter_UserName : userId , Commentie_PostId : id, Commentie_userId : " "});

  //     }

  //     fun();
  //   }
  //   else {
  //     console.log("Kuch issue hua hai");
  //   }


  // }, [togglePostBtn])




  







  const handle_PostButton = () => {

    const date = DateFormator(new Date());

    if (CommentPost.reply && Comment_IDD && CommentPost.reply.includes("@")) {

      const fun = async () => {

        const postReply = await PostReply({
          Reply: CommentPost.reply,
          Replier_Profile_Pic: Profileimage,
          Replier_UserName: userNames,
          Replier_UserId: userId,
          Likes_On_Reply: 0,
          My_Like: false,
          ReplyTime: date,
          Reply_ID: "not assigned",
          Comment_ID: Comment_IDD,
          post_userId: Commentie_UserId,
          post_postId: Commentie_PostId,


        })

        settogglePostBtn(true);

  

      }

      fun();


    

    }

    else if (CommentPost.reply && !CommentPost.reply.includes("@")) {

      const fun = async () => {

        const data = await PostComment({


          Commenter_Profile_Pic: Profileimage,
          Commenter_UserName: userNames,
          Commenter_UserId: userId,
          Comment: CommentPost.reply,
          Total_Like_OnComment: 0,
          My_Like: false,
          time: date,
          Comment_ID: 'Not assigned',
          post_userId: Commentie_UserId,
          post_postId: Commentie_PostId


        });

     
   

      }
      fun();


  

    }

    setCommentPost({
      userName: '',
      reply: ''
    });


  }



 
















  return ReactDOM.createPortal(<>
    <div
      className=' fixed  z-50 inset-0 bg-black  bg-opacity-10  flex flex-col justify-center   shadow-inner  hover:shadow-green-300 w-screen h-screen '>




      <div className=' border  h-full   w-full gap-10 flex flex-col justify-center items-center   '>

        {/* Cross icon X */}

        <div className='flex justify-end w-full mr-10 mt-20 '>
          <CloseOutlinedIcon className=' text-white cursor-pointer' onClick={props.onClose}
            aria-label='Close'
          />
        </div>


        {/* Form */}

        <div className='border  bg-white h-full w-screen md:w-2/6   flex  flex-col    shadow-md shadow-green-700 rounded-md'>



          <div className='flex  flex-col px-3 py-2 ' >


            {/* Comentie name and dp */}

            <div className='flex justify-between pb-5 border-b'>


              <div className='flex gap-3'>

                <img
                  className='w-6 h-6 md:w-7 md:h-7 object-cover rounded-full'
                  src={Commentie_Profileimage !== "not Assigned" ? `${Profile_Img_URL}${Commentie_UserId}%2FProfile%2FimgFile?alt=media&token=${Commentie_Profileimage}` : "https://tse1.mm.bing.net/th?id=OIP.f3DM2upCo-p_NPRwBAwbKQHaHa&pid=Api&P=0&h=180"} alt="" />

                <span className='md:font-semibold md:text-1 font-bold'>{Commentie_UserName}</span>


              </div>

              <div>
                <HiOutlineDotsHorizontal />
              </div>

            </div>


            {/* List of Coments */}
            <div className='flex flex-col mt-4 gap-5 h-[350px] flex-grow overflow-y-auto  custom-scroll'>
              {TotalComment.map((ele) => <li className='flex flex-col  '>



                <div className=' flex flex-col '>

                  <div className='flex justify-between '>

                    <div className='flex gap-3'>
                      <img
                        className='w-6 h-6 md:w-7 md:h-7 object-cover rounded-full'
                        src={`${Profile_Img_URL}${ele.Commenter_UserId}%2FProfile%2FimgFile?alt=media&token=${ele.Commenter_Profile_Pic}`}
                      />


                      <div className='flex flex-col '>

                        <div className=' flex flex-wrap   '>
                          <span className='md:font-semibold md:text-1 font-bold'>{ele.Commenter_UserName + " "}
                            <span className='text-0 font-normal'>{ele.Comment}</span></span>
                        </div>

                        <div className='flex flex-row gap-3'>

                          <span className='text-gray-600 text-[12px]'>{ele.time}</span>
                          <span className='text-gray-600 text-[12px]'>{ele.Total_Like_OnComment + " " + "likes"}</span>
                          <span className='text-gray-600 text-[12px] cursor-pointer'
                            onClick={() => {
                              // setReply(ele.Commenter_UserName)
                              console.log(ele.Commenter_UserName);
                              setComment_ID(ele.Comment_ID);
                              setCommentPost({
                                userName: ele.Commenter_UserName,
                              })
                            }}
                          >Reply</span>

                        </div>

                      </div>

                    </div>

                    <span>💓</span>

                  </div>

                  <Reply PostUserId={Commentie_UserId} PostId={Commentie_PostId} CommentId={ele.Comment_ID} replyLength = {ele.Replies} />
                  
                </div>

              </li>)

              }
            </div>



          </div>

          {/* Add a Comment */}


          <span className='absolute p-3  bottom-0 mt-10 left-0 right-0 flex items-center   w-72 rounded-lg md:w-2/6 mx-auto border-b shadow-lg shadow-green-400'>
            <input
              className=' w-full  p-2  outline-none'
              type="text"
              placeholder={"Add a comment..."}
              value={CommentPost.userName && "@" + CommentPost.userName + " "}
              onChange={(e) => {
                console.log(e.target.value);



                setCommentPost(() => ({
                  reply: e.target.value  // Overwrite the reply field
                }));

              }}
            />
            <button
              className=''
              onClick={handle_PostButton}>Post</button>
          </span>


        </div>







      </div>





    </div>
  </>, document.getElementById('Comment'));

}




export default Comment;  