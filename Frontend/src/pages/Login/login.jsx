import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../services/firebase";
import styles from "./login.module.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    toast.promise(
      (async () => {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          navigate("/home");
          return "Login successful";
        } else {
          throw new Error("User not found");
        }
      })(),
      {
        loading: "Logging in...",
        success: (msg) => msg,
        error: "Login failed. Check credentials.",
      }
    );
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              className={styles.input}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.button}>
            Sign in
          </button>
          <p>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
