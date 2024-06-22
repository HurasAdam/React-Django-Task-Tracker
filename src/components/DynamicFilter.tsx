import * as enums from "../types/enums";

type Props = {
    selectedStars: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  
  const DynamicFilter = ({ filterOptions, onChange }: Props) => {

    const enumName = Object.keys(enums).find(
      (key) => enums[key as keyof typeof enums] === filterOptions
    );

    return (
      <div className="border-b border-slate-300 pb-5">
        <h4 className="text-md font-semibold mb-2">{enumName}</h4>
        {Object.values(filterOptions).map((option,key) => (
          <label 
          key={key}
          className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded"
              value={option}
            //   checked={selectedStars.includes(star)}
              onChange={onChange}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    );
  };
  
  export default DynamicFilter;