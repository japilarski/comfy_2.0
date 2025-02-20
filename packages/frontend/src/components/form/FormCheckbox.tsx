export type FormCheckboxProps = {
  label: string;
  name: string;
  defaultValue?: string;
  size?: string;
};
export const FormCheckbox = (props: FormCheckboxProps) => {
  return (
    <div className="form-control items-center">
      <label htmlFor={props.name} className="label cursor-pointer">
        <span className="label-text capitalize">{props.label}</span>
      </label>
      <input
        type="checkbox"
        name={props.name}
        defaultChecked={props.defaultValue === 'on' ? true : false}
        className={`checkbox checkbox-primary ${props.size}`}
      ></input>
    </div>
  );
};
