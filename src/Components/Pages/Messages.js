import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const Messages = ()=>{


    const navigate = useNavigate();
    return (
        <div
         className="text-black border bg-white h-screen  w-screen">
{/* Mobile Use */}
     <div className="md:hidden relative z-10 bg-white h-full">
       {/* nav Bar */}
       <nav className="border-b p-4 flex gap-20 shadow-md">
   
            <span onClick={()=> navigate("/Dashboard/MobleProfile")} className=" rounded-full border-1 bg-green-500 h-10 w-10 pt-3 pl-3">
                <IoArrowBack  />
              </span>

              <span className="font-bold text-xl">
                Message
              </span>

           </nav>

        <div>
            no message yet
        </div>
     </div>

     {/* Laptop Use */}

     <div data-aos="fade-up" className=" text-center hidden md:block relative z-20  mt-24 border  mx-auto w-5/12 rounded-md p-3 ">
        <h1 className="text-center mb-10 font-bold text-xl">Messages</h1>

        No message yet
        {/* {
           <div className="flex w-full justify-between p-3 border-b">
           <div className="flex w-full gap-4 p-1">
           <img src="" alt="img" />
           <div className="flex flex-col">
               <span>
                   Name
               </span>
               <span>
                   @id
               </span>
           </div>
       </div>

       <span>
           🩸
       </span>
       </div>
        } */}
     </div>

        </div>
    )
}

export default  Messages;