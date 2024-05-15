

interface IProps{
    selectedHotelTypes: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    tags:string[];
  };




  
  const ProjectTypesFilter:React.FC<IProps> = ({ selectedHotelTypes, onChange,tags }) => {
    return (
      <div className="border-b border-slate-300 pb-5">
        <h4 className="text-md font-semibold mb-2">Tags</h4>
        {tags&&tags.map(({id,name}) => (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded"
              value={name}
            //   checked={selectedHotelTypes.includes(hotelType)}
              onChange={onChange}
            />
            <span>{name}</span>
          </label>
        ))}
      </div>
    );
  };
  
  export default ProjectTypesFilter;