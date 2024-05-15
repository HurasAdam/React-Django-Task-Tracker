import * as enums from "./enums";
export interface ITicketRespone{
    id:number;
    owner:string;
    attachments:IAttachment[];
    createdBy:ICreated_By;
updated_by:string;
title:string;
description:string;
priority:string;
status:string;
type:string;
archive:boolean;
created:Date;
updated:Date;
project:number;
assignees:null;
}


export interface ICommentsListResponse{
    count:number;
    next:null;
    previous:null,
    results:
}


export interface IProjectsListResponse{
    count:number;
    next:string|null;
    previous:string|null;
    results:IProject[];
}

export interface IProject{
    id:number;
    owner: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        role: string;
        profile: {
          user: number;
          bio: string;
          url: string;
          birthdate: string | null;
          gender: string;
        };
    }
        assignees:IAssignee[];
        attachments:IAttachment[];
        tags:ITag[];
        created_by:ICreated_By;
        updated_by: null ;
        title: string;
        description: string;
        deadline: string;
        visibility: enums.Visibility;
        status: string;
        archive: boolean;
        created: string;
        updated: string | null;

}
export interface IComment{
    id:number;
    created_by:ICreated_By;
    updated_by:null;
    attachments:IAttachment[],
    text:string;
    created:Date;
    updated:Date;
    project:number;
    task:number;
}


export interface IAttachment{
id:number;
url?:string;
created:Date;
task:number;
project:null;
comment:null;
filename_to_display:string;
mimetType:string;
size_in_mb:number;
}

export interface ICreated_By{
    id:number;
    first_name:string;
    last_name:string;
    email:string;
    photo:string|null
}


export interface IAssignee{
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    profile: {
      user: number;
      bio: string;
      url: string;
      birthdate: string | null;
      gender: string;
}
}
export interface IAffectedComment {
    type: string;
    _id: string;
  }

  export interface ICommentFormData{
    text:string;
    task:number;
    project:number;
  }

export interface ITag{
    id: number;
    name: string;
}

export interface IProjectsSearchParams{
    params:{
      limit:number;
      ordering:string;
      offset:number;
    },
    title?:{
        title?:string;
    }
  }