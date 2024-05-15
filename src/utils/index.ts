export const daysUntilDeadline=({createdAt, deadline}) => {
const createdDate = new Date(createdAt);
const deadlineDate = new Date(deadline);
const differenceInMs = Math.abs(deadlineDate.getTime() - createdDate.getTime());
const differenceInDays = Math.round(differenceInMs / (1000 * 60 * 60 * 24));
  
if(differenceInDays>1)return differenceInDays + "days remaining"
else if(differenceInDays===1)return differenceInDays + "day remaining"
else if(differenceInDays===0)return "deadline passed"

}