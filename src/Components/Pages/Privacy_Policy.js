
import { useNavigate } from "react-router-dom";

const Privacy_Policy = ()=>{
    const navigate = useNavigate();

    return (
        <div>
                   {/* mobile use */}

                   <div className="md:hidden relative z-10 bg-white h-full">

<nav className="border-b p-4 flex w-screen justify-between shadow-md">

    <span className="font-bold text-xl">
        Privacy & Policy
    </span>

    <img onClick={() => navigate("/Dashboard/MobleProfile")} src="https://i.pinimg.com/736x/68/c5/0a/68c50ac30605fdb8ce0836aaeaacd48c.jpg" alt={"M"} className="border object-cover rounded-full size-10  shadow-md shadow-violet-600 " />


</nav>




</div>
        </div>
    )
}

export default Privacy_Policy;