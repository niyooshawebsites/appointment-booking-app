const verificationEmailTemplate = (link) => {
  return `<div style={{}} fontfamily:="" "arial,="" sans-serif",="" maxwidth:="" 600,="" margin:="" "auto",="" padding:="" 20,="" border:="" "1px="" solid="" #ddd",="" borderradius:="" 8,="" backgroundcolor:="" "#f9f9f9"="" }}="">
  <h2 style={{}} color:="" "#333"="" }}="">Hello there,</h2>
  <p style={{}} fontsize:="" 16,="" color:="" "#555"="" }}="">
    Please click the link below to verify your email address:
  </p>
  <a href=${link} target="_blank" style={{}} display:="" "inline-block",="" margin:="" "20px="" 0",="" padding:="" "10px="" 20px",="" backgroundcolor:="" "#007bff",="" color:="" "#fff",="" textdecoration:="" "none",="" borderradius:="" 5="" }}="">Verify Email</a>
  <p style={{}} fontsize:="" 14,="" color:="" "#555"="" }}="">
    Thank you and regards,<br />
    <strong>Team - ABS</strong>
  </p>
</div>`;
};

module.exports = verificationEmailTemplate;
