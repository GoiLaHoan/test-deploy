import type { UseFormRegisterReturn } from "react-hook-form/dist/types/form";

interface Props {
  type?: string;
  name: string;
  register: (arg: any) => UseFormRegisterReturn<any>;
  errors: any;
  placeholder?: string;
}

const InputWithValidation = ({ register, ...props }: Props) => {
  const isError = props.errors[props.name];

  return (
    <div className="w-full lg:w-1/2">
      <input
        id={props.name}
        type={props.type !== undefined ? props.type : "text"}
        className={isError ? "error w-full" : "w-full"}
        placeholder={props.placeholder}
        {...register(props.name)}
      />

      {isError && (
        <label className="error block text-xs text-[red]">
          {isError.message}
        </label>
      )}
    </div>
  );
};

export default InputWithValidation;
