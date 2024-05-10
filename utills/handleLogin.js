import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";



const onHandleLogin = (email, password) => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Login success"))
        .catch((err) => Alert.alert("Login error", err.message));
    }
  };

  export default onHandleLogin