import { login, signup } from "./acctions";

export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <label htmlFor="first_name">First Name:</label>
      <input id="first_name" name="first_name" type="text" />
      <label htmlFor="last_name">Last Name:</label>
      <input id="last_name" name="last_name" type="text" />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
  );
}
