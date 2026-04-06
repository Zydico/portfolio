type prop = {
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  list: string[];
  size: string;
};

export default function DropdownInput({label, value, onChange, list, size}: prop) {
  return (
    <label className="font-bold">{label}
      <select className={`maple-input font-normal bg-white ${size} px-2 py-1`} value={value} onChange={(e) => onChange(e.target.value)}>
        {list.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>   
  );
}