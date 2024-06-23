useEffect(()=>{

  if (localStorage.length = 1) {
    const data = localStorage.getItem("user");
    if (data) {
      try {
        let response = JSON.parse(data);
        console.log(response);

     





           dispatch(signup({

            token : response.token,
            userId : response.userId,
            email : response.email,
            ragistered : response.ragistered,
            userName : response.userName,
    
          

          }))


      } catch (e) {
        console.error("Failed to parse JSON:", e);
      }
    } else {
      console.log("No data found for key 'user'.");
    }
  }
 },[localStorage.length])