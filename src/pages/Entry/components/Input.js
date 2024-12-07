import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext, useState } from "react";
import { Button, Card, CardBody, CardFooter, Container, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Spinner, } from "react-bootstrap";
import { toast } from "react-toastify";
import { TableContext } from "../Entry";
import InputForm from "@/components/InputForm/InputForm";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { AuthContext } from "@/App";
import { db } from "@/firebase/firebase";
let table;
let user;
export default function Input() {
    table = useContext(TableContext);
    user = useContext(AuthContext);
    const formName = "main-form";
    const [validated, setValidated] = useState(false);
    const handleSubmit = (e, row) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;
        if (!form.checkValidity() === false) {
            let codedRow = { ...row, ["code"]: createCode() };
            table?.data?.row.add(codedRow).draw();
        }
        else {
            setValidated(true);
        }
    };
    return (_jsx(_Fragment, { children: _jsxs(Card, { children: [_jsx(CardBody, { children: _jsx(InputForm, { id: `${formName}`, handleSubmit: handleSubmit, validated: validated }) }), _jsxs(CardFooter, { className: "p-0 pt-2 d-flex justify-content-between flex-wrap", children: [_jsxs("div", { className: "d-flex gap-2 mx-2 mb-2", children: [_jsx(Add, { form: `${formName}` }), _jsx(Delete, {}), _jsx(Edit, {})] }), _jsxs("div", { className: "d-flex gap-2 mx-2 mb-2", children: [_jsx(Csv, {}), _jsx(Post, {}), _jsx(Save, {})] })] })] }) }));
}
function Add({ form }) {
    return (_jsx(_Fragment, { children: _jsx(Button, { type: "submit", form: `${form}`, children: "Add" }) }));
}
function Delete() {
    return (_jsx(_Fragment, { children: _jsx(Button, { onClick: () => {
                table?.data?.rows(".selected").remove().draw();
            }, children: "Delete" }) }));
}
function Edit() {
    const formName = "edit-form";
    const [show, setShow] = useState(false);
    const [editRowData, setEditRowData] = useState();
    const [validated, setValidated] = useState(false);
    const handleClose = () => setShow(false);
    const handleEditRow = () => {
        if ((table?.data?.rows({ selected: true }).data() ?? []).length !== 1) {
            alert("Select only one row to edit");
        }
        else {
            setShow(true);
            setEditRowData(table?.data?.rows({ selected: true }).data()[0]);
        }
    };
    const handleSubmit = (e, row) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;
        if (!form.checkValidity() === false) {
            const selectedIndex = table?.data?.rows({ selected: true }).indexes()[0];
            if (editRowData) {
                table?.data?.row(selectedIndex).data(row).draw();
            }
            setShow(false);
        }
        else {
            setValidated(true);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: handleEditRow, children: "Edit" }), _jsxs(Modal, { show: show, onHide: handleClose, children: [_jsx(ModalHeader, { closeButton: true, children: _jsx(ModalTitle, { children: "Edit Transaction" }) }), _jsx(ModalBody, { children: _jsx(InputForm, { id: `${formName}`, validated: validated, handleSubmit: handleSubmit, editRow: editRowData }) }), _jsxs(ModalFooter, { children: [_jsx(Button, { variant: "secondary", onClick: handleClose, children: "Close" }), _jsx(Button, { form: `${formName}`, type: "submit", children: "Save Changes" })] })] })] }));
}
function Csv() {
    return (_jsx(_Fragment, { children: _jsx(Button, { onClick: () => {
                console.log("triggerr");
                table?.data?.button(".buttons-csv").trigger();
            }, children: "CSV" }) }));
}
function Post() {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const postTables = async () => {
        if (!user?.uid)
            return;
        setLoading(true);
        try {
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);
            const userData = userDocSnap.data();
            if (!userData) {
                toast.error("User data not found.");
                return;
            }
            const currentPosts = userData.post ? JSON.parse(userData.post) : [];
            const draftTable = table?.data?.data().toArray();
            const newPosts = [...draftTable, ...currentPosts];
            console.log(newPosts);
            await updateDoc(userDocRef, {
                post: JSON.stringify(newPosts),
            });
            setLoading(false);
            toast("Table Posted", { autoClose: 4000 });
            handleClose();
            table?.data?.clear().draw();
        }
        catch (error) {
            console.error("Error updating document: ", error);
            toast.error("Error posting table.");
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: handleShow, children: "Post" }), _jsxs(Modal, { show: show, onHide: handleClose, children: [_jsx(ModalHeader, { closeButton: true, children: _jsx(ModalTitle, { children: "Are you sure you want to post your draft?" }) }), _jsx(ModalBody, { children: _jsx(Container, { children: "You can't make any changes after this." }) }), _jsxs(ModalFooter, { children: [_jsx(Button, { variant: "primary", onClick: postTables, children: loading ? (_jsx(Spinner, { animation: "border", style: { width: "20px", height: "20px" }, role: "status" })) : ("Post") }), _jsx(Button, { variant: "secondary", onClick: handleClose, children: "Close" })] })] })] }));
}
function Save() {
    const [loading, setLoading] = useState(false);
    const saveDraftTable = async () => {
        setLoading(true);
        if (!user?.uid)
            return;
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, {
            draft: JSON.stringify(table?.data?.data().toArray()),
        });
        setLoading(false);
        toast("Table Saved", { autoClose: 4000 });
    };
    return (_jsx(_Fragment, { children: _jsx(Button, { onClick: saveDraftTable, children: loading ? (_jsx(Spinner, { animation: "border", style: { width: "20px", height: "20px" }, role: "status" })) : ("Save") }) }));
}
const createCode = () => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0].replace(/-/g, "");
    let transactionCounters = JSON.parse(localStorage.getItem("transactionCounters") || "{}");
    const lastGeneratedDate = transactionCounters["lastGeneratedDate"];
    if (lastGeneratedDate !== formattedDate) {
        transactionCounters["lastGeneratedDate"] = formattedDate;
        transactionCounters[formattedDate] = 1;
    }
    const counter = transactionCounters[formattedDate]++;
    localStorage.setItem("transactionCounters", JSON.stringify(transactionCounters));
    return `${formattedDate}-${String(counter).padStart(4, "0")}`;
};
