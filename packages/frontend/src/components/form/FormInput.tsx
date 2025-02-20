type FormInputProps = {
  label: string;
  name: string;
  type: string;
  defaultValue?: string;
  size?: string;
};

export const FormInput = (props: FormInputProps) => {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text capitalize">{props.label}</span>
      </div>
      <input
        type={props.type}
        name={props.name}
        defaultValue={props.defaultValue}
        className={`input input-bordered ${props.size}`}
      />
    </label>
  );
};
