
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



 const Discard_Modal = ({ onClose })=>{

    const navigate = useNavigate();
    console.log("yes");
    return ReactDOM.createPortal(<>
      <div className=' fixed z-10 inset-0 bg-black opacity-90  shadow-inner  hover:shadow-green-300 h-screen w-screen mx-auto my-auto   '>
  
        <div className="  mt-52 mx-auto w-80  bg-white  flex justify-center items-center rounded-lg shadow-md shadow-red-500  ">
  
          <div className="    text-black gap-5 md:h-3/6 p-3 flex flex-col justify-around md:justify-around md:gap-7
} " >
         
  
            <div className='flex flex-col '>
  
              <h1 className="text-2xl text-center font-bold mb-2 md:mb-0 ">Discard post?</h1>
              <p>If you leave, your edits won't be saved.</p>
  
            </div>
  
            <div className='flex flex-col gap-4'>
            <button 
            onClick={()=>navigate("/dashboard/Home")}
            className=' w-full border-t text-red-500 mx-auto  text-xl border-b'
            >Discard</button>
            <button 
            onClick={onClose}
            className=' w-full mx-auto text-xl  '
            >Cancel</button>
            </div>
  
  
          </div>
  
        </div>
      </div>
    </>, document.getElementById('root'));
  }


  export default Discard_Modal