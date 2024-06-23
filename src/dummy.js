useEffect(()=>{

    console.log("cheking");
    if (localStorage.length = 1) {
      const data = localStorage.getItem("user");
      console.log(data);
      if (data) {
        try {
          let response = JSON.parse(data);
          console.log(response);
  
  
  
          const fun = async() =>{
  
  
            dispatch(signIn({ 
              token : response.token,
              userId : response.userId,
              email : response.email,
              ragistered : response.registered,
              userName : response.userName,
              Profileimage : response.Profileimage
  
            }))
  
          }
  
          fun();
  
       
        } catch (e) {
          console.error("Failed to parse JSON:", e);
        }
      } else {
        console.log("No data found for key 'user'.");
      }
    }

  },[])