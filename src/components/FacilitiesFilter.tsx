

type Props = {
    selectedFacilities: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };


  const hotelFacilities = [
    "Free WiFi",
    "Parking",
    "Airport Shuttle",
    "Family Rooms",
    "Non-Smoking Rooms",
    "Outdoor Pool",
    "Spa",
    "Fitness Center",
  ];
  
  const FacilitiesFilter = ({ selectedFacilities, onChange }) => {
    return (
      <div className="border-b border-slate-300 pb-5">
        <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
        {hotelFacilities.map((facility) => (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded"
              value={facility}
            //   checked={selectedFacilities.includes(facility)}
              onChange={onChange}
            />
            <span>{facility}</span>
          </label>
        ))}
      </div>
    );
  };
  
  export default FacilitiesFilter;