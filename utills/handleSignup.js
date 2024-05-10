import { auth, database } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";


const onHandleSignup = async (email, password, name) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userRef = doc(database, "users", user.uid);
        await setDoc(userRef, {
            displayName: name,
            email: email,
            uid: user.uid,
            photoURL: imageURL || profile,
            phoneNumber: "",
        });
        return true
    } catch (error) {
        Alert.alert(error.message);
        return false
    }
};

export default onHandleSignup;