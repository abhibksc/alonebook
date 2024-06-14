import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const navigate = useNavigate();
  const userNames = useSelector((state) => state.auth.userName);

  return (
    <div>
      {/* mobile use */}

      <div className="md:hidden relative z-10 bg-white h-full">
        <nav className="border-b p-4 flex w-screen justify-between shadow-md">
          <span className="font-bold text-xl">Notifications</span>

          <img
            onClick={() => navigate("/Dashboard/MobleProfile")}
            src="https://i.pinimg.com/736x/68/c5/0a/68c50ac30605fdb8ce0836aaeaacd48c.jpg"
            alt={"M"}
            className="border object-cover rounded-full size-10  shadow-md shadow-violet-600 "
          />
        </nav>

        <body data-aos="fade-up">{}</body>
      </div>

      {/* laptop */}

      <div className="hidden md:flex flex-col gap-3 w-[500px] mx-auto ml-[440px] justify-center   absolute z-50 ">

        {
            <body data-aos="fade-up">No Notificaitons</body>
        }
     

      </div>
    </div>
  );
};

export default Notification;
