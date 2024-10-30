const forgotPasswordEmailTemplate = (link) => {
  return `<div style={{ fontFamily: "'Arial, sans-serif'", maxWidth: 600, margin: "auto", padding: 20, border: "1px solid #ddd", borderRadius: 8, backgroundColor: "#f9f9f9" }}>
  <h2 style={{ color: "#333" }}>Hello there,</h2>
  <p style={{ fontSize: 16, color: "#555" }}>
    Please click the link to reset your password: 
    <a href=${link} target="_blank" style={{ color: "#007bff", textDecoration: "none" }}>Reset Password</a>
  </p>
  <p style={{ fontSize: 14, color: "#555" }}>
    Thanks and regards,<br />
    <strong>Team - ABS</strong>
  </p>
</div>`;
};

module.exports = forgotPasswordEmailTemplate;
