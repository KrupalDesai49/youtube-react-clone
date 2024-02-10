import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../context/firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = await result.user;

      // Check if the user object exists before proceeding
      if (user) {
        const docRef = doc(db, "user", user.email);

        const checkDocumentExistenceAndExecute = async (docRef) => {
          const docSnapshot = await getDoc(docRef);

          if (!docSnapshot.exists()) {
            await setDoc(doc(db, "user", user.email), {
              displayName: user.displayName,
              description: null,
              logo_link: null,
              banner_link: null,
              channelID:
                "@" +
                user.displayName
                  ?.split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(""),
              tick: false,
              subscribers: 0,
              timestamp: Date.now(),
              isLogInByGoogle: true,
            });
          }
        };

        await checkDocumentExistenceAndExecute(docRef);

      }
    } catch (error) {
      console.error(error);
    }
  };

  async function signUp(email, password, displayName) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(userCredential.user, {
        displayName: displayName,
      });
      await setDoc(doc(db, "user", email), {
        displayName: displayName,
        description: null,
        logo_link: null,
        banner_link: null,
        channelID:
          "@" +
          displayName
            ?.split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(""),
        tick: false,
        subscribers: 0,
        timestamp: Date.now(),
        isLogInByGoogle: false,
      });
    } catch (error) {
      console.error(error);
    }
  }

  function logIn(email, password) {
    try {
      return signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  }

  function logOut() {
    try {
      return signOut(auth);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("User::", currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user, googleSignIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
