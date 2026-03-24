type prop = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min: number;
  max: number;
  size: string;
};

export default function NumberInput({label, value, onChange, min, max, size}: prop) {
  return (
    <label className="font-bold">{label}
      <input className={`maple-input font-normal ${size} ${(Number.isNaN(Number(value)) || value.length <= 0 || Number(value) < min || Number(value) > max) ? 'invalid-input' : ''}`} value={value} onFocus={(e) => e.target.select()} onChange={(e) => onChange(e.target.value)}></input>
    </label>   
  );
}