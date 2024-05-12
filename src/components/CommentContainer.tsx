import React from "react";
import Comment from "../components/Comment";
import { useAccountStore } from "../store";
import * as types from "../types/index";


interface Props{
  comments:types.IComment[];
  className?:string;
  handleUpdateComment:({csrfToken, commentId, formData}:{csrfToken:string,commentId:number,formData:types.ICommentFormData})=>void;
  affectedComment:types.IAffectedComment|null;
  setAffectedComment: React.Dispatch<React.SetStateAction<types.IAffectedComment | null>>;
  handleDeleteComment:()=>void;
}

const CommentContainer:React.FC<Props> = ({
  comments,
  className,
  handleUpdateComment,
  affectedComment,
  setAffectedComment,
  handleDeleteComment,
}) => {



  const userAccount = useAccountStore((state) => state.account);

  return (
    <div className={className}>
      <div className="space-y-4 mt-8">
        {comments?.map((comment) => {
          return (
            <Comment
              projectId={comment?.project}
              ticketId={comment?.task}
              commentBelongsToUser={
                comment?.created_by?.id === userAccount?.user_id
              }
              key={comment.id}
              affectedComment={affectedComment}
              setAffectedComment={setAffectedComment}
              comment={comment}
              handleUpdateComment={handleUpdateComment}
              handleDeleteComment={handleDeleteComment}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CommentContainer;
