import { useNavigate } from "react-router-dom";
import SelectImge_Modal from "../Modals/CreatePost/SelectImge_Modal";
import { CreatePostOperation } from "../../CrudOperations/PostOperation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { HandleImg } from "../../Store/MenuBarSlices";
import { FaArrowRight } from 'react-icons/fa6';
import WriteCaption_Modal from "../Modals/CreatePost/WriteCaption_Modal";
import { RxCross2 } from "react-icons/rx";

const Create = () => {
    const navigate = useNavigate();
    console.log("Create page!");




    const fileInputRef = useRef(null);

    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.userId);
    const HandlePostedImages = useSelector((state) => state.HandlePostedImages.img);


    const [selectedFile, setSelectedFile] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);



    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setSelectedFile(file);
    };


    useEffect(()=>{

        if (selectedFile) {
            console.log(selectedFile);


            dispatch(HandleImg(selectedFile))
            // setSelectedFile('')





            // setselectedFileIMg(selectedFile)



            //   navigate('/Dashboard/WriteCaption_Modal');

        }
        else {
            console.log("No file selected");  // Debugging statement
     
        }


    },[selectedFile])

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (selectedFile) {
    //         console.log(selectedFile);


    //         dispatch(HandleImg(selectedFile))
    //         setSelectedFile('')





    //         // setselectedFileIMg(selectedFile)



    //         //   navigate('/Dashboard/WriteCaption_Modal');

    //     }
    //     else {
    //         console.log("No file selected");  // Debugging statement
    //         alert("Please Upload Image");
    //     }


    // };








    return (
        <div className=" h-full  ">



            {!selectedFile && <SelectImge_Modal>
                <div className='fixed z-10 inset-0 bg-black opacity-70 shadow-inner hover:shadow-green-300 h-screen w-screen mx-auto my-auto '>


                    <div className='text-white h-full w-full flex justify-center items-center'>
                        <form className='w-screen  rounded-md shadow-lg shadow-violet-500   border md:w-6/12 md:h-3/6 p-3 flex flex-col justify-around  md:gap-7' onSubmit={(e) => handleSubmit(e)}>

                            <div className="  mb-5 md:mb-0">


                                <RxCross2 className="text-white relative top-6" onClick={() => navigate("/dashboard/Home")} />


                                <h1 className='text-3xl text-center font-bold'>Create Post</h1>





                            </div>



                            {<input
                                ref={fileInputRef}
                                onChange={(e) => handleFileChange(e)}
                                className=' rounded-full w-96 mx-auto left-2 bg-blue-500 text-yellow-300 hidden'
                                type='file'
                                name='imageUpload'
                                accept='image/*'
                                placeholder='kkkkkkkkkkkkkkkkkkkk'
                            />
                            }


                            <div className='mx-auto flex items-center justify-center cursor-pointer bg-blue-400 rounded-full w-28 h-24' onClick={(() => fileInputRef.current.click())}>
                                Drag
                            </div>



                            {/* <button className='w-10 mx-auto h-10'>
                                <FaArrowRight className='mx-auto h-7 w-7' />
                            </button> */}


                        </form>
                    </div>
                </div>
            </SelectImge_Modal>}

            {selectedFile && <WriteCaption_Modal />}








        </div>
    )
}

export default Create;