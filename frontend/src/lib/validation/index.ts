import * as z from "zod"

export const signupValidationSchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    username:z.string().min(2,{
        message:"Surname must be at least 2 characters."
    }),
    email:z.string().email(),
    password:z.string().min(8,{
        message:"Password must be at least 8 characters."
    }),
  
   
  });

  export const signinValidationSchema = z.object({
 
    email:z.string().email(),
    password:z.string().min(8,{
        message:"Password must be at least 8 characters."
    }),
    
  });

  export const ProjectValidationSchema = z.object({
 
    title:z.string().min(5).max(100),
    description:z.string().min(15).max(2200),
    file:z.custom<File[]>(),
    
    
  });