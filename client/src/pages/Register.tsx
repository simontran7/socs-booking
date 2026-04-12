import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/User.css";

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      firstName,
      lastName,
      email,
      password,
      role,
      agreed,
    });
  };

  return (
    <div className="user-page">
      <div className="user-container">
        <header className="user-navbar">
          <div className="user-navbar-left">
            <img
              src="/mcgill-logo.png"
              alt="McGill logo"
              className="user-navbar-logo"
            />
            <span className="user-navbar-title">| SOCS Connect</span>
          </div>

          <nav className="user-navbar-links">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </nav>
        </header>

        <main className="user-main">
          <section className="user-left">
            <h1>
              Join <br />
              <span className="red-text">SOCS Connect</span> <br />
              today.
            </h1>

            <p className="user-subtext">
              Create your account and start booking office hours, requesting
              meetings, and managing your schedule.
            </p>

            <h3 className="user-side-heading">TWO TYPES OF ACCOUNTS</h3>

            <div className="account-type-list">
              <div className="account-type-item">
                <span className="account-icon">🎓</span>
                <div>
                  <strong>Student</strong>
                  <p>Browse slots and book appointments</p>
                </div>
              </div>

              <div className="account-type-item">
                <span className="account-icon">🧑‍🏫</span>
                <div>
                  <strong>Professor / TA</strong>
                  <p>Create and manage office hours</p>
                </div>
              </div>
            </div>
          </section>

          <section className="user-right">
            <div className="user-right-inner">
              <p className="user-label-top">CREATE YOUR ACCOUNT</p>
              <h2>Register your account</h2>

              <p className="user-switch-text">
                Already have an account?{" "}
                <Link to="/login" className="user-inline-link">
                  Login →
                </Link>
              </p>

              <form className="user-form-card" onSubmit={handleSubmit}>
                <div className="name-row">
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />

                  <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <input
                  type="email"
                  placeholder="you@mail.mcgill.ca"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="role-section">
                  <p>I am registering as a...</p>

                  <div className="role-options">
                    <button
                      type="button"
                      className={`role-card ${role === "student" && "active"}`}
                      onClick={() => setRole("student")}
                    >
                      <strong>Student</strong>
                      <small>@mail.mcgill.ca</small>
                    </button>

                    <button
                      type="button"
                      className={`role-card ${role === "prof" && "active"}`}
                      onClick={() => setRole("prof")}
                    >
                      <strong>Professor / TA</strong>
                      <small>@mcgill.ca</small>
                    </button>
                  </div>
                </div>

                <label className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <span>
                    I agree to the <span className="red-text">terms</span>
                  </span>
                </label>

                <button type="submit" className="user-submit-btn">
                  Create account →
                </button>
              </form>
            </div>
          </section>
        </main>

        <footer className="user-footer">
          © 2026 McGill University · School of Computer Science
        </footer>
      </div>
    </div>
  );
};

export default Register;