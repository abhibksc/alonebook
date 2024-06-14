import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetComment, GetReply } from "../../../CrudOperations/GetOperation";
import { addComment, addReply } from "../../../Store/MenuBarSlices";
import { Profile_Img_URL } from "../../../Constants/URLs";



const Reply = ({ CommentId, PostId, PostUserId, replyLength }) => {

    const dispatch = useDispatch();


    const [view_hide, setView_hide] = useState("____ View replies")
    const [allreply, setAllReply] = useState([]);


    const Total_Replies = useSelector((state) => state.TotalComment.Reply)
    const [toggle, settoggle] = useState(false);

    useEffect(() => {

        if (toggle) {
            const fun = async () => {
                const ReplyData = await GetReply({
                    Post_userId: PostUserId,
                    Post_PostId: PostId,
                    Post_CommentId: CommentId,
                })

                setAllReply(ReplyData)


            }

            fun();
        }











    }, [toggle])


    const handleView_Hide = (id) => {
        settoggle(!toggle);

        if (view_hide === "____ View replies") {
            setView_hide("____ Hide replies")
        }
        else {
            setView_hide("____ View replies")
            setAllReply([])
        }


    }

const handleReply = (replieeUserId, replieeeUserName)=>{

    

}


// useEffect(() => { 
//     console.log("chal rha");

//     const fun = async () => {
//       const commentsDataa = await GetComment({ Commentie_PostId : CommentId, Commentie_UserId : PostUserId})
//       console.log(commentsDataa);
//       dispatch(addComment(commentsDataa))
//     }

//     fun();

//   }, [])




    return <>


        {replyLength && Object.keys(replyLength).length > 0 && <span
            className='w-28   p-0 mx-20 cursor-pointer   mt-3 text-gray-600 text-[12px] '
            value={"Something"}
            onClick={() => handleView_Hide(CommentId)}
        >{view_hide === "____ View replies" ? view_hide + " " + Object.keys(replyLength).length : view_hide}


        </span>}


        {

            allreply.map((ele) => <div className='  flex  flex-col  '>

                <div className='flex flex-col mt-4 flex-grow '>





                    <div className=' flex flex-col  '>

                        <div className='flex justify-between ml-20 mb-4'>

                            <div className='flex gap-3'>
                                <img
                                    className='w-6 h-6 md:w-7 md:h-7 object-cover rounded-full'
                                    src={`${Profile_Img_URL}${ele.Replier_UserId}%2FProfile%2FimgFile?alt=media&token=${ele.Replier_Profile_Pic}`}
                                />


                                <div className='flex flex-col  '>

                                    <div className=' flex flex-wrap   '>
                                        <span className='md:font-semibold md:text-1 font-bold'>{ele.Replier_UserName + " "}
                                            <span className='text-[15px] font-normal '>{ele.Reply}</span></span>
                                    </div>

                                    <div className='flex flex-row gap-3 '>

                                        <span className='text-gray-600 text-[12px]'>{ele.ReplyTime}</span>
                                        <span 
                                        className='text-gray-600 text-[12px]'
                                        onClick={()=>handleReply(ele.Replier_UserId , ele.Replier_UserName)}
                                        >{ele.Likes_On_Reply + " " + "likes"}</span>
                                        <span className='text-gray-600 text-[12px] cursor-pointer'
                                        //   onClick={() => {
                                        //     // setReply(ele.Commenter_UserName)
                                        //     // console.log(ele.Commenter_UserName);
                                        //     setComment_ID(ele.Comment_ID);
                                        //     setCommentPost({
                                        //       userName: ele.Commenter_UserName,
                                        //     })
                                        //   }}
                                        >Reply</span>

                                    </div>

                                </div>

                            </div>

                            <span>💓</span>





                        </div>



                    </div>






                </div>



            </div>)

        }

    </>

}


export default Reply;






