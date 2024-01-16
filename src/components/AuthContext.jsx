import { createContext, useContext, useEffect, useState } from "react";
import { auth , db } from '../context/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; 


const AuthContext = createContext()

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState({})

    async function signUp(email,password, displayName){
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(userCredential.user, {
            displayName: displayName
        });
        await setDoc(doc(db,'user', email),{
            savedShows: [],
            displayName: displayName
        })
    }

    function logIn(email, password){
        return signInWithEmailAndPassword(auth,email,password)
    }

    function logOut(){
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
        });

        return () => {
            unsubscribe();
        }

    })

    return (
        <AuthContext.Provider value={{signUp,logIn,logOut,user}}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth() {
    return useContext(AuthContext)
}