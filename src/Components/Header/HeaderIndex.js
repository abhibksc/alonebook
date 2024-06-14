
import { useState } from "react";
import { GoSearch } from "react-icons/go";
import { Link, NavLink } from "react-router-dom";
import { Profile_Img_URL } from "../../Constants/URLs";
import { useSelector } from "react-redux";



const HeaderIndex = () => {



    let userId = useSelector((state) => state.auth.userId);
    let Profileimage = useSelector((state) => state.auth.Profileimage)
    let name = useSelector((state) => state.auth.name)
    let mail = useSelector((state) => state.auth.email)






    const [popup, setpopup] = useState(false);


    const handleEnterImg = () => {

        setTimeout(() => {

            setpopup(true);
        }, 300);

        setpopup(true);
    }

    const HandleOutImg = () => {
        setTimeout(() => {

            setpopup(false);
        }, 300);
    }

    const handleSearch = () => {
        console.log("Searchbtn Clicked");
    }


    return (
        <header className="hidden md:flex relative left-[430px] mt-3 w-2/3 h-12  mb-10  ">
            {/* Only for laptop */}
            <nav className="md:flex  w-full   justify-between      ">

                <div className=" mx-10 h-full ">
                    <GoSearch className="relative top-5 left-3  " onClick={handleSearch} />
                    <input className="px-9 text-black bg-white  rounded border-b shadow-violet-300 shadow-md border-gray-400 focus:border-none focus:outline-none w-[500px]"
                        type="text"
                        placeholder='Search'

                    // readOnly
                    //   onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>

                <img onMouseEnter={() => handleEnterImg()} onMouseLeave={() => HandleOutImg()}
                    src={Profileimage !== "not Assigned " ? ` ${Profile_Img_URL}${userId}%2FProfile%2FimgFile?alt=media&token=${Profileimage}` : "https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png"}

               




                    alt={"M"}
                    className="active:scale-50 border object-cover rounded-full   h-[40px] w-[40px]  md:h-[40px] md:w-[40px] shadow-md shadow-violet-600 " />

                {popup &&
                    <span onMouseEnter={() => handleEnterImg()} onMouseLeave={() => HandleOutImg()}

                        className="  flex justify-start h-[80px] w-[180px]  rounded-md p-2 fixed z-50 left-[200px] md:left-[1150px] top-[55px]  inset-0 bg-black opacity-90 ">

                        <div className="flex flex-col bg-transparent text-white px-3">
                            <h1 className="text-[10px] font-bold">@Mail Account</h1>
                            <span className="text-[10px] text-gray-400">{name}</span>
                            <span className="text-[10px] text-gray-400">{mail}</span>
                            <span className="text-[11px] text-blue-400 ">
                                <Link to={"/Dashboard/ToUpdateProfile"}> Complete Now !</Link>
                            </span>
                        </div>


                    </span>
                }



            </nav>



        </header>
    )
}

export default HeaderIndex;