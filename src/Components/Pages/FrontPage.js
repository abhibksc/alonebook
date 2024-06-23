import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';





const FrontPage = () => {
    const navigate = useNavigate();

  


    // just check all good or not 

    const token = useSelector((state)=>state.auth.token)
    const userId = useSelector((state)=>state.auth.userId)
    const email = useSelector((state)=>state.auth.email)
    const password = useSelector((state)=>state.auth.password)
    const image = useSelector((state)=>state.auth.image)
    const name = useSelector((state)=>state.auth.name)
    const userName = useSelector((state)=>state.auth.userName)
    const messages = useSelector((state)=>state.auth.messages)

    const login = useSelector((state)=>state.IsLogin.login)
    const signupp = useSelector((state)=>state.IsLogin.signupp)
    

    // log

    console.log(token);
    console.log(userId);
    console.log(email);
    console.log(password);
    console.log(image);
    console.log(name);
    console.log(userName);
    console.log(messages);
    console.log(login);
    console.log(signupp);




    const handlebtn = () => {
        navigate("/login")
    }
    return (
        <div

            className="flex flex-col   gap-4 md:gap-8 md:my-4">

            <img className="w-[375px] object-cover   rounded-[6px] shadow-md shadow-black md:w-[400] md:h[400px] mx-auto" src="https://shorturl.at/UHmB9" alt="" />
            <h1 className="text-center text-5xl mt-6 font-customMyFont ">Let’s connect with each other</h1>
            <p className="text-center text-[#919191]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>

            <button onClick={() => handlebtn()} className="rounded-lg shadow-green-200 shadow-lg w-[325px] h-[50px]   mx-auto  bg-[#4DD969] hover:bg-[#28CD56] ">Get Started</button>
        </div>
    )
}

export default FrontPage;