import { combineReducers } from 'redux';

export default combineReducers( {
    replaceMe: () => "replace me"
});

export const signIn = () => {
    return {
      type: "SIGN_IN",
    };
  };
  
  export const signOut = () => {
    return {
      type: "SIGN_OUT",
    };
  };