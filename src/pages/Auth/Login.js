import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Form, FormControl, FormGroup, FormLabel, Button, Spinner, } from "react-bootstrap";
import { auth, db } from "@/firebase/firebase";
import { AuthContext } from "@/App";
import { doc, getDoc, setDoc } from "firebase/firestore";
function Login() {
    const user = useContext(AuthContext); // Get user context
    const [loading, setLoading] = useState(false);
    const checkInput = async (e) => {
        e.preventDefault();
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;
        if (!email || !password)
            return;
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userDocRef = doc(db, "users", userCredential.user.uid);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
                console.log("User document:", userDocSnap.data());
            }
            else {
                await setDoc(userDocRef, {
                    email: userCredential.user.email,
                    draft: "",
                    post: "",
                }).then(() => {
                    setLoading(false);
                });
            }
            console.log(userCredential.user);
        }
        catch (err) {
            alert("Wrong Password/ Email");
        }
        finally {
            setLoading(false);
        }
    };
    if (user && !loading) {
        return _jsx(Navigate, { to: "/entry" });
    }
    return (_jsx("div", { className: "vh-100 d-flex align-items-center justify-content-center", children: _jsxs(Form, { onSubmit: checkInput, className: "border p-5 rounded shadow bg-light", children: [_jsxs(FormGroup, { className: "mb-4", children: [_jsx(FormLabel, { children: "Email" }), _jsx(FormControl, { name: "email", type: "email", placeholder: "Enter your email", required: true })] }), _jsxs(FormGroup, { className: "mb-4", children: [_jsx(FormLabel, { children: "Password" }), _jsx(FormControl, { name: "password", type: "password", placeholder: "Enter your password", required: true })] }), _jsx(Button, { type: "submit", variant: "primary", disabled: loading, children: loading ? (_jsx(Spinner, { animation: "border", style: { width: "20px", height: "20px" }, role: "status" })) : ("Login") })] }) }));
}
export default Login;
