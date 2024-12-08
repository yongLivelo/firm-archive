import { Flow } from "@/interface/Flow";
import { Row } from "@/interface/Row";
import { useRef, useState } from "react";
import {
  ButtonGroup,
  Form,
  FormControl,
  FormGroup,
  FormSelect,
  ToggleButton,
} from "react-bootstrap";

interface Props {
  id: string;
  validated: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, row: Row) => void;
  editRow?: Row;
}
export default function InputForm({ ...Props }: Props) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [formData, setFormData] = useState<Row>(
    Props?.editRow
      ? Props.editRow
      : {
          code: "",
          date: "",
          flow: Flow.Sale,
          mode: "",
          amount: 0,
          description: "",
        }
  );

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <Form
      ref={formRef}
      id={Props.id}
      noValidate
      validated={Props.validated}
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // formRef.current?.reset();
        Props.handleSubmit(e, formData);
      }}
    >
      <DateForm
        value={formData.date}
        onChange={(value) => handleChange("date", value)}
      />
      <FlowForm
        value={formData.flow}
        onChange={(value) => handleChange("flow", value)}
      />
      <ModeForm
        value={formData.mode}
        onChange={(value) => handleChange("mode", value)}
      />
      <AmountForm
        value={formData.amount}
        onChange={(value) => handleChange("amount", value)}
      />
      <DescriptionForm
        value={formData.description}
        onChange={(value) => handleChange("description", value)}
      />
    </Form>
  );
}

function DateForm({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <FormGroup className="mb-2">
      <FormControl
        required
        type="datetime-local"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </FormGroup>
  );
}

function FlowForm({
  value,
  onChange,
}: {
  value: Flow;
  onChange: (value: Flow) => void;
}) {
  const flowRadio: { name: string; value: Flow }[] = [
    { name: "Sales", value: Flow.Sale },
    { name: "Expenses", value: Flow.Expense },
  ];

  return (
    <FormGroup className="mb-2">
      <ButtonGroup>
        {flowRadio.map((radio, id) => (
          <ToggleButton
            key={id}
            id={`flow-${id}`}
            type="radio"
            name="flow"
            value={radio.value}
            checked={value === radio.value}
            onChange={() => onChange(radio.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </FormGroup>
  );
}

function ModeForm({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const modeOptions = [
    { text: "Select mode of payment", value: "" },
    { text: "Gcash", value: "Gcash" },
    { text: "BPI", value: "BPI" },
    { text: "Cash", value: "Cash" },
  ];

  return (
    <FormGroup className="mb-2">
      <FormSelect
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {modeOptions.map((opt, id) => (
          <option key={id} value={opt.value}>
            {opt.text}
          </option>
        ))}
      </FormSelect>
    </FormGroup>
  );
}

function AmountForm({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <FormGroup className="mb-2">
      <FormControl
        required
        type="number"
        min={0.1}
        step="any"
        placeholder="Enter Amount"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </FormGroup>
  );
}

function DescriptionForm({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <FormGroup className="mb-2">
      <FormControl
        as="textarea"
        rows={3}
        placeholder="Enter Description"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </FormGroup>
  );
}
