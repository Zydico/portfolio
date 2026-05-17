type prop = {
  label?: string;
  value?: boolean;
  onChange: (value: boolean) => void;
};

export default function CheckboxInput({label, value, onChange}: prop) {
  return (
    <label className="font-bold flex items-center">{label && <span>{label}</span>}
      <input type="checkbox" className={`maple-input font-normal bg-white`} checked={value} onChange={(e) => onChange(e.target.checked)}></input>
    </label>   
  );
}