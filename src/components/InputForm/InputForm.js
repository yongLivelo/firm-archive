import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flow } from "@/interface/Flow";
import { useState } from "react";
import { ButtonGroup, Form, FormControl, FormGroup, FormSelect, ToggleButton, } from "react-bootstrap";
export default function InputForm({ ...Props }) {
    const [formData, setFormData] = useState(Props?.editRow
        ? Props.editRow
        : {
            code: "",
            date: "",
            flow: Flow.Sale,
            mode: "",
            amount: 0,
            description: "",
        });
    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };
    return (_jsxs(Form, { id: Props.id, noValidate: true, validated: Props.validated, onSubmit: (e) => {
            e.preventDefault();
            Props.handleSubmit(e, formData);
        }, children: [_jsx(DateForm, { value: formData.date, onChange: (value) => handleChange("date", value) }), _jsx(FlowForm, { value: formData.flow, onChange: (value) => handleChange("flow", value) }), _jsx(ModeForm, { value: formData.mode, onChange: (value) => handleChange("mode", value) }), _jsx(AmountForm, { value: formData.amount, onChange: (value) => handleChange("amount", value) }), _jsx(DescriptionForm, { value: formData.description, onChange: (value) => handleChange("description", value) })] }));
}
function DateForm({ value, onChange, }) {
    return (_jsx(FormGroup, { className: "mb-2", children: _jsx(FormControl, { required: true, type: "datetime-local", value: value, onChange: (e) => onChange(e.target.value) }) }));
}
function FlowForm({ value, onChange, }) {
    const flowRadio = [
        { name: "Sales", value: Flow.Sale },
        { name: "Expenses", value: Flow.Expense },
    ];
    return (_jsx(FormGroup, { className: "mb-2", children: _jsx(ButtonGroup, { children: flowRadio.map((radio, id) => (_jsx(ToggleButton, { id: `flow-${id}`, type: "radio", name: "flow", value: radio.value, checked: value === radio.value, onChange: () => onChange(radio.value), children: radio.name }, id))) }) }));
}
function ModeForm({ value, onChange, }) {
    const modeOptions = [
        { text: "Select mode of payment", value: "" },
        { text: "Gcash", value: "Gcash" },
        { text: "BPI", value: "BPI" },
        { text: "Cash", value: "Cash" },
    ];
    return (_jsx(FormGroup, { className: "mb-2", children: _jsx(FormSelect, { required: true, value: value, onChange: (e) => onChange(e.target.value), children: modeOptions.map((opt, id) => (_jsx("option", { value: opt.value, children: opt.text }, id))) }) }));
}
function AmountForm({ value, onChange, }) {
    return (_jsx(FormGroup, { className: "mb-2", children: _jsx(FormControl, { required: true, type: "number", min: 0.1, step: "any", placeholder: "Enter Amount", value: value, onChange: (e) => onChange(parseFloat(e.target.value)) }) }));
}
function DescriptionForm({ value, onChange, }) {
    return (_jsx(FormGroup, { className: "mb-2", children: _jsx(FormControl, { as: "textarea", rows: 3, placeholder: "Enter Description", value: value, onChange: (e) => onChange(e.target.value) }) }));
}
