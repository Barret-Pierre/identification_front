import { useMutation } from "@apollo/client";
import { useState } from "react";
import { SIGNIN } from "../graphql/singin";

interface IUser {
  id: number;
  email: string;
}

export function Signin() {
  const [user, setUser] = useState<null | IUser>(null);
  const [email, setEmail] = useState("test1@gmail.com");
  const [password, setPassword] = useState("secretSecret");
  const [wrongCredentials, setWrongCredentials] = useState(false);

  const [doSignupMutation, { loading, error }] = useMutation(SIGNIN);

  async function doSingin() {
    try {
      const { data } = await doSignupMutation({
        variables: {
          email: email,
          password: password,
        },
      });
      if (data.signin) {
        setUser(data.signin);
        setEmail("");
        setPassword("");
        setWrongCredentials(false);
      } else {
        setWrongCredentials(true);
      }
    } catch {}
  }

  return (
    <div>
      <h1>Signin</h1>
      {wrongCredentials === true && <p>Identifiants incorrectes</p>}
      {user && <p>Tu es connecté en tant que {user.id}</p>}
      {error && (
        <pre style={{ color: "red" }}>{JSON.stringify(error, null, 4)}</pre>
      )}
      <label htmlFor="email">Email:</label>
      <input
        disabled={loading}
        type="mail"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="email">Password:</label>
      <input
        disabled={loading}
        type="password"
        id="paswword"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={doSingin}>Se Connecter</button>
    </div>
  );
}
