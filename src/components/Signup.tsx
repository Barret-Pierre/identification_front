import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_USER } from "../graphql/createUsers";

export function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [doSignupMutation, { loading, error }] = useMutation(CREATE_USER);

  async function doSignup() {
    try {
      await doSignupMutation({
        variables: {
          data: {
            email: email,
            password: password,
          },
        },
      });
      setEmail("");
      setPassword("");
    } catch {}
  }

  return (
    <div>
      <h1>Signup</h1>
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
      <button onClick={doSignup}>S'inscrire</button>
    </div>
  );
}
