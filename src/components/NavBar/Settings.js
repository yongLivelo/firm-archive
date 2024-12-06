import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext, useEffect, useState } from "react";
import { Button, Container, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import settingsIcon from "@/assets/settings.png";
import profile from "@/assets/default-user.png";
import { AuthContext } from "@/App";
import { doc, getDoc } from "firebase/firestore";
function Settings() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleLogout = () => {
        signOut(auth)
            .then(() => console.log("Sign Out"))
            .catch(() => console.log("Error"));
    };
    const user = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const getUserData = async () => {
            if (user?.uid) {
                try {
                    const userDocRef = doc(db, "users", user.uid);
                    const userDocSnap = await getDoc(userDocRef);
                    if (userDocSnap.exists()) {
                        setUserData(userDocSnap.data());
                    }
                }
                catch (err) {
                    console.error("Error getting document: ", err);
                }
            }
        };
        if (user) {
            getUserData();
        }
    }, [user]);
    return (_jsxs(_Fragment, { children: [_jsx("img", { "data-bs-toggle": "modal", "data-bs-target": "#settings", id: "setting-btn", style: { width: "40px", cursor: "pointer" }, src: settingsIcon, alt: "Settings", onClick: handleShow }), _jsxs(Modal, { show: show, onHide: handleClose, children: [_jsx(ModalHeader, { closeButton: true, children: _jsx(ModalTitle, { children: "Settings" }) }), _jsx(ModalBody, { children: _jsxs(Container, { fluid: true, className: "d-flex align-items-center flex-column", children: [_jsx("img", { id: "user-profile", alt: "avatar", className: "rounded-circle mb-2", src: profile, style: {
                                        width: "150px",
                                        height: "150px",
                                        objectFit: "cover",
                                    } }), _jsx("h5", { id: "user-name", className: "mb-2", children: user?.email })] }) }), _jsxs(ModalFooter, { children: [_jsx(Button, { variant: "primary", onClick: handleLogout, children: "Logout" }), _jsx(Button, { variant: "secondary", onClick: handleClose, children: "Close" })] })] })] }));
}
export default Settings;
