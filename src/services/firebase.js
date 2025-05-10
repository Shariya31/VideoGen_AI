import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () =>{
    try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log(result)
        return result.user
    } catch (error) {
        console.error('Google signin error', error)
        throw error        
    }
}

export const logout = async () =>{
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Logout error', error)
        throw error
    }
}

export const generateRecaptcha = () => {
  try {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "visible",
          callback: (response) => {
            console.log(response)
          },
        }
      );
    }
  } catch (error) {
    console.error("Error initializing reCAPTCHA:", error);
  }
};