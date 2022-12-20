import { useQuery } from "@apollo/client";
import { READ_USERS } from "../graphql/readUsers";
import { IUser } from "../interfaces";

export function Dashboard(props: {
  user: IUser;
  onTokenChange: (token?: string) => void;
}) {
  const { data } = useQuery<{ readUsers: IUser[] }>(READ_USERS, {
    fetchPolicy: "network-only",
  });

  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        Hello {props.user.email} vous avez l'id {props.user.id}
      </p>
      {data?.readUsers.map((user) => (
        <p key={user.id}> {user.email} </p>
      ))}
      <button onClick={() => props.onTokenChange()}>Signout</button>
    </div>
  );
}
