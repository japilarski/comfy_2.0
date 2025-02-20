type FormSelectProps = {
  label: string;
  name: string;
  listToDisplay: string[];
  defaultValue?: string;
  size?: string;
};

export const FormSelect = (props: FormSelectProps) => {
  return (
    <div className="form-control">
      <label htmlFor={props.name} className="label">
        <span className="label-text capitalize">{props.label}</span>
      </label>
      <select
        name={props.name}
        id={props.name}
        defaultValue={props.defaultValue}
        className={`select select-bordered ${props.size}`}
      >
        {props.listToDisplay.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};
