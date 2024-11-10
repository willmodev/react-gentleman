import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: string;
  error?: FieldError;
}

const FormElement = <T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  error,
}: Props<T>) => {
  return (
    <div className="mb-1 max-w-64 flex flex-col">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            id={name}
            type={type}
            {...field}
            onChange={(e) => {
              const value =
                type === "number" ? parseFloat(e.target.value) : e.target.value;
              field.onChange(value);
            }}
            className={`py-2 px-4 text-gray-500 bg-white ${
              error ? "border border-red-500" : ""
            }`}
          />
        )}
      />
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};

export default FormElement;
