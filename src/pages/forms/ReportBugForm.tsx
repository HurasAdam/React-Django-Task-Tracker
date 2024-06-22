import React from "react";
import { useForm } from "react-hook-form";
import { useAccountStore } from "../../store";
import { reportBug } from "../../services/userApi";
import { useMutation } from "@tanstack/react-query";
import { VscReport } from "react-icons/vsc";
import toast from "react-hot-toast"

const ReportBugForm:React.FC = ({closePopupHandler}) => {

    const csrfToken = useAccountStore((state) => state.csrfToken);
    const account = useAccountStore((state) => state.account);
    const {register,handleSubmit}=useForm({
        defaultValues:{
       message:"",
    

        }
    })
console.log(account)

    const {mutate}=useMutation({
        mutationFn:({ formData })=>{
            return reportBug({ formData })
        },
        onSuccess:()=>{
            toast.success("Your Report has been sent sucessfully")
            closePopupHandler()
        }
    })
    

    const handleSave = handleSubmit((data) => {
        console.log(data);
        const formData = {
    ...data,
    name:account.first_name,
    email:account.email
        }
        mutate({  formData });
      });
    



  return (
<div>
    <h2 className="mb-10 flex items-center font-semibold gap-1"><VscReport className="w-9 h-9 text-violet-600"/> Have you noticed any bug or issue? Please report it. </h2>
<form onSubmit={handleSave} className="flex flex-col gap-6">

<div className="flex flex-col">
<label 
className="text-xs text-slate-500 my-1"
htmlFor="category">Select category</label>
   <select 
   className="bg-slate-100 p-2 rounded"
   id="category">
    <option value="">Projects</option>
    <option value="">Tickets</option>
    <option value="">Ariche</option>
    <option value="">User</option>
    <option value="">Profile</option>
    <option value="">Other</option>
   </select>
</div>
<div className="flex flex-col">
<label 
className="text-xs text-slate-500 my-1"
htmlFor="description">problem description</label>
<textarea 
{...register("message",{required:"Please describe issue u have faced"})}
rows={8}
id="description"
className=" bg-slate-100"
/>
</div>
<button 
type="submit"
className="bg-blue-500 py-1 rounded text-white font-semibold">Submit</button>
    </form>
</div>
  )
}

export default ReportBugForm