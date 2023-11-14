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
    <>
      <input
        id={props.name}
        type={props.type !== undefined ? props.type : "text"}
        className={isError ? "error" : ""}
        placeholder={props.placeholder}
        {...register(props.name)}
      />

      {isError && <label className="error">{isError.message}</label>}
    </>
  );
};

export default InputWithValidation;
