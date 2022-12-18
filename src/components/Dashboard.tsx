import { IUser } from "../interfaces";

export function Dashboard(props: {
  user: IUser;
  onTokenChange: (token?: string) => void;
}) {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        Hello {props.user.email} vous avez l'id {props.user.id}
      </p>
      <button onClick={() => props.onTokenChange()}>Signout</button>
    </div>
  );
}
