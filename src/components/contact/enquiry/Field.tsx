import { Input } from "../../ui/input";
import type { ContactFormData } from "../../../data/contact";
import { errorText, ledgerLabel, type FormBlurEvent, type FormFieldEvent } from "./fields";

type FieldProps = {
  id: keyof ContactFormData;
  label: string;
  type: string;
  autocomplete: string;
  placeholder: string;
  required: boolean;
  value: string;
  error?: string;
  onChange: (event: FormFieldEvent) => void;
  onBlur: (event: FormBlurEvent) => void;
};

const Field = ({
  id,
  label,
  type,
  autocomplete,
  placeholder,
  required,
  value,
  error,
  onChange,
  onBlur,
}: FieldProps) => (
  <div className="space-y-2">
    <label htmlFor={id} className={ledgerLabel}>
      {label}
    </label>
    <Input
      id={id}
      name={id}
      type={type}
      autoComplete={autocomplete}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      required={required}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className="h-11 rounded-xl px-4 text-sm placeholder:text-slate-400"
    />
    {error && (
      <p id={`${id}-error`} role="alert" className={errorText}>
        {error}
      </p>
    )}
  </div>
);

export default Field;
