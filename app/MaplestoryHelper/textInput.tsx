type prop = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  size: string;
};

export default function TextInput({label, value, onChange, maxLength, size}: prop) {
  return (
    <label className="font-bold">{label}
      <input className={`maple-input font-normal ${size}`} maxLength={maxLength} value={value} onFocus={(e) => e.target.select()} onChange={(e) => onChange(e.target.value)}></input>
    </label>   
  );
}