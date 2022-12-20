import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { CREATE_COMMENT } from "../graphql/createComment";
import { READ_COMMENTS } from "../graphql/readComments";
import { IComment, IUser } from "../interfaces";

export function Commments(props: { user: IUser }) {
  const [comment, setComment] = useState("");
  const { data, refetch } = useQuery<{ readComments: IComment[] }>(
    READ_COMMENTS
  );

  const [doCreateCommmentMutation, { error }] = useMutation(CREATE_COMMENT);

  async function doCreateComment() {
    try {
      const { data } = await doCreateCommmentMutation({
        variables: {
          data: {
            comment: comment,
          },
        },
      });
      if (data) {
        setComment("");
        refetch();
      }
    } catch {}
  }
  return (
    <div>
      <h1>Comments</h1>
      {error && (
        <pre style={{ color: "red" }}>{JSON.stringify(error, null, 4)}</pre>
      )}
      {data ? (
        data.readComments.map((comment) => (
          <p key={comment.id}>
            "{comment.comment}" by {comment.createdBy.email} at{" "}
            {comment.createdAt}
          </p>
        ))
      ) : (
        <p>Loading</p>
      )}
      <input
        type="text"
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      />
      <button
        onClick={() => {
          doCreateComment();
        }}
      >
        Add Commment
      </button>
    </div>
  );
}
