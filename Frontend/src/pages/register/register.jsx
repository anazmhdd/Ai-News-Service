import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../services/firebase";
import styles from "./register.module.css"; // Import CSS file

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.promise(
      (async () => {
        // Create user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Save user data in Firestore
        await setDoc(doc(db, "users", user.uid), { email, role: "user" });

        // Return success message
        return "Registration successful!";
      })(),
      {
        loading: "Registering...",
        success: (data) => {
          navigate("/login");
          return data;
        },
        error: "Registration failed. Please check details and try again.",
      }
    );
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerBox}>
        <h2>Sign Up</h2>
        <p className={styles.description}>
          Stay updated with the latest headlines and easily access the most
          current news articles.
        </p>

        <form onSubmit={handleSubmit}>
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
            Sign Up
          </button>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
