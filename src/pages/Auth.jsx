import { useEffect, useState } from "react";
import { auth, generateRecaptcha } from "../services/firebase";
import { signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Auth() {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [confirmation, setConfirmation] = useState(null);
    const navigate = useNavigate();

    const handleSendOtp = async () => {
        try {
            const appVerifier = window.recaptchaVerifier;
            const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
            setConfirmation(confirmationResult);
        } catch (err) {
            alert("OTP send failed");
            console.error(err);
        }
    };
    const handleVerifyOtp = async () => {
        try {
            await confirmation.confirm(otp);
            navigate("/dashboard");
        } catch (err) {
            alert("Invalid OTP");
            console.log(err)
        }
    };

    useEffect(() => {
        try {
            generateRecaptcha();
            console.log('recaptcha generated')
        } catch (error) {
            console.error("Failed to load reCAPTCHA:", error);
        }
    }, []);

    return (
        <div className="p-6 max-w-md mx-auto">
            <div id="recaptcha-container" />
            <h2 className="text-xl font-semibold mb-4">OTP Login</h2>
            <input
                type="tel"
                placeholder="+917004382399"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border p-2 w-full mb-2"
            />
            <button onClick={handleSendOtp} className="btn btn-primary w-full mb-2">
                Send OTP
            </button>
            <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border p-2 w-full mb-2"
            />
            <button onClick={handleVerifyOtp} className="btn btn-secondary w-full">
                Verify & Login
            </button>
        </div>
    );
}
export default Auth;
