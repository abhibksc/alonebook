import { createSlice } from "@reduxjs/toolkit";





const LoginSignUpSlice = createSlice({
    name : "LoginSignUpSlice",
    initialState : {
        token : '',
        userId : '',
        email : '',
        password : '',
        Profileimage : '',
        name : '',
        userName : '',
        messages : [],
        ragistered : false


 

    },
    reducers : {
        signup(state, action){
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.email = action.payload.email;
            state.ragistered = action.payload.ragistered;
            state.userName = action.payload.userName;






        },
        signIn(state, action) {
          console.log(action);
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.email = action.payload.email;
            state.ragistered = action.payload.ragistered;
            state.Profileimage = action.payload.Profileimage;
            state.userName = action.payload.userName;
          },
          messages(state, actions){
            state.messages = actions.payload
          },
          logout(state) {
            state.token = "";
            state.userId = "";
            state.email = "";
            state.name = "";
            state.Profileimage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr36oDwlyD6PdPl0pTr13oxXuU1wsQNX_YjA&s";
          },
          update(state, action) {
            state.userName = action.payload.userName;
            state.Profileimage = action.payload.Profileimage;
          },
          updateName(state, action) {
            state.name= action.payload.name;
            // 
          },




    }
})

const Islogin = createSlice({
  name : "Islogin",
  initialState : {
    login : false,
    signupp : false
  },
  reducers : {
    login(state){
      state.login = true
    },
    signupCheck(state){
    }
  }
})

export const loginreducer =  Islogin.reducer;
export const {login,signupCheck} =  Islogin.actions;
export const  LoginSignUpSlicee  = LoginSignUpSlice.reducer;
export const {signup , signIn,logout,update,messages,updateName}  = LoginSignUpSlice.actions;