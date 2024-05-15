

interface IProps{
    selectedPrice?: number;
    onChange?: (value?:number) => void;
  };
  
  const DeadlineFilter:React.FC<IProps> = ({ selectedPrice, onChange }) => {
    return (
      <div className="border-b border-slate-300 pb-5">
        <h4 className="text-md font-semibold mb-2">Max Deadline</h4>
 <select 
 className="p-2 border rounded-md w-full"
 value={selectedPrice} 
 onChange={(e)=>onChange(e.target.value ?parseInt(e.target.value):undefined)}>

    <option value="">Select Max Deadline</option>
    {["3 days","1 week","2 weeks","1 month","3 months"].map((price)=>{
return(
    <option value={price}>{price}</option>
)
    })}
 </select>
      </div>
    );
  };
  
  export default DeadlineFilter;