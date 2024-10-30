const appointmentConfEmailTemplate = (
  name,
  serviceProvider,
  service,
  date,
  time
) => {
  return `<div style={{}} fontfamily:="" "'arial,="" sans-serif'",="" maxwidth:="" 600,="" margin:="" "auto",="" padding:="" 20,="" border:="" "1px="" solid="" #ddd",="" borderradius:="" 8,="" backgroundcolor:="" "#f9f9f9"="" }}="">
  <h2 style={{}} color:="" "#333"="" }}="">Hello Mr./Miss. ${name},</h2>
  <p style={{}} fontsize:="" 16,="" color:="" "#555"="" }}="">
    Your appointment with ${serviceProvider} for ${service} on ${date
    .split("-")
    .reverse()
    .join("-")} at ${time} is confirmed.
  </p>
  <p style={{}} fontsize:="" 14,="" color:="" "#555"="" }}="">
    Thanks and regards,<br />
    <strong>${serviceProvider}</strong><br />
    Team - ABS
  </p>
</div>`;
};

module.exports = appointmentConfEmailTemplate;
