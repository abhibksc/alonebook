import { faHeart, fal, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { FaComments } from "react-icons/fa";






// just create transparent UI for example , open the postman, look, until the apps not open.








const UserCard = () => {

    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
      setTimeout(()=>{
        setIsLoading(false)
      },2000)
    },[])



    return <div>
        {
            <div className="md:hidden flex flex-col gap-3 w-80 ml-10 mt-10  md:w-[500px]  md:ml-[40px] justify-center   absolute  z-50">
                    <li className="flex flex-col gap-3  rounded-lg">
                        <div className="flex justify-between h-full w-full">
                            <div className="flex gap-4">
                                <div className=' w-8 h-8   bg-stone-300 rounded-full shadow-gray-500 shadow-lg animate-blink  '>
                                </div>
                                
                                <span className='md:w-72 w-52 border bg-stone-300  shadow-gray-500 shadow-lg animate-blink rounded-md '>{""}</span>
                            </div>
                        </div>
                      <div  className="w-72 md:w-5/6 h-96 object-cover rounded-md bg-stone-300  shadow-gray-500 shadow-lg animate-blink">

                      </div>

                        <div className="flex gap-3">
                         
                        </div>
                        <div className="  shadow-gray-500 shadow-lg animate-blink h-8  bg-stone-300 rounded-md md:w-72 w-52">
                      
                        </div>
                        {/* <form className="flex justify-between p-2">
                            <input type="text" className="w-96 focus:border-none focus:outline-none" placeholder="Add a Comment" />
                            <button>Post</button>
                        </form> */}
                    </li>
       
            </div>
        }



{
            <div className="hidden md:flex flex-col gap-3 w-80 ml-10 mt-10  md:w-[500px]  md:ml-[40px] justify-center   absolute  z-50">
                    <li className="flex flex-col gap-3  rounded-lg">
                        <div className="flex justify-between h-full w-full">
                            <div className="flex gap-4">
                                <div className=' w-8 h-8   bg-stone-300 rounded-full shadow-gray-500 shadow-lg animate-blink  '>
                                </div>
                                
                                <span className='md:w-72 w-52 border bg-stone-300  shadow-gray-500 shadow-lg animate-blink rounded-md '>{""}</span>
                            </div>
                        </div>
                      <div  className="w-72 md:w-5/6 h-96 object-cover rounded-md bg-stone-300  shadow-gray-500 shadow-lg animate-blink">

                      </div>

                        <div className="flex gap-3">
                         
                        </div>
                        <div className="  shadow-gray-500 shadow-lg animate-blink h-8  bg-stone-300 rounded-md md:w-72 w-52">
                      
                        </div>
                        {/* <form className="flex justify-between p-2">
                            <input type="text" className="w-96 focus:border-none focus:outline-none" placeholder="Add a Comment" />
                            <button>Post</button>
                        </form> */}
                    </li>
       
            </div>
        }

    </div>
}

export default UserCard;