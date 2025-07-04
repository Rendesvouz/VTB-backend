const axios = require("axios").default;
const { EventEmitter } = require("events");
const crypto = require("crypto");
const emailEvent = new EventEmitter();

async function sendVerificationEmail(req, email, token) {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://api.rendezvouscare.com"
      : "https://api.rendezvouscare.com";

  // Generate verification link and log it
  const verificationLink = `${baseUrl}/v1/authentication/verify?token=${token}`;

  const emailPayload = {
    email: email,
    name: "User",
    verificationLink: verificationLink,
  };

  try {
    const response = await axios.post(
      "https://email.rendezvouscare.com/send-email",
      emailPayload
    );
    console.log("Email sent successfully, response:", response.data);
  } catch (error) {
    console.log(`Error sending email to ${email}: ${error.message}`);

    if (error.response) {
      console.log("Response status:", error.response.status);
      console.log("Response data:", error.response.data);
      console.log("Response headers:", error.response.headers);
    }

    if (error.response) {
      console.log("Response status:", error.response.status);
      console.log("Response data:", error.response.data);
      console.log("Response headers:", error.response.headers);
    }
  }
}

async function sendPasswordResetEmail(req, email, resetLink) {
  const emailPayload = {
    email: email,
    resetLink: resetLink,
  };

  try {
    // Adjusted endpoint with simplified payload
    const response = await axios.post(
      "https://email.rendezvouscare.com/password-reset",
      emailPayload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log(
        `Password reset link sent successfully to ${email}: ${response.data}`
      );
    } else {
      console.log(
        `Error sending password reset link to ${email}: ${error.message}`
      );
    }
  } catch (error) {
    console.log(
      `Error sending password reset link to ${email}: ${error.message}`
    );

    if (error.response) {
      console.log("Response status:", error.response.status);
      console.log("Response data:", error.response.data);
      console.log("Response headers:", error.response.headers);
    }
  }
}

// Send login link email (magic link)
function sendLoginLinkEmail(req, email, magicLink) {
  console.log(`Sending login link to: ${email}`);
  emailEvent.emit("sendLoginLinkEmail", req, email, magicLink);
}

// Event listener for sending the login link
emailEvent.on("sendLoginLinkEmail", async (req, email, magicLink) => {
  try {
    // Send the login link email
    const mailer = await axios.post(
      "https://email.rendezvouscare.com/send-email",
      {
        to: email,
        subject: "Login with Magic Link",
        body: `Please click the link below to log in: <a href="${magicLink}">Login</a>`,
      }
    );

    // Log the response from the email server
    if (mailer.status === 200) {
      console.log(`Magic link sent successfully to ${email}: ${mailer.data}`);
    } else {
      console.log(`Magic link sending failed with status ${mailer.status}`);
    }
  } catch (err) {
    // Log error details
    console.log(`Error sending magic link to ${email}: ${err.message}`);
  }
});

async function sendVerificationCodeEmail(req, email, code) {
  const emailPayload = {
    email: email,
    code: code,
  };

  // console.log("Payload being sent to the email server:", emailPayload);

  try {
    const response = await axios.post(
      "https://email.rendezvouscare.com/send-verification-code",
      emailPayload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log(
        `Verification code sent successfully to ${email}: ${response.data}`
      );
    } else {
      console.log(
        `Failed to send verification code to ${email}, status: ${response.status}`
      );
    }
  } catch (error) {
    console.error(
      `Error sending verification code to ${email}: ${error.message}`
    );
    console.error(
      `Error sending verification code to ${email}: ${error.message}`
    );

    if (error.response) {
      console.log("Response status:", error.response.status);
      console.log("Response data:", error.response.data);
      console.log("Response headers:", error.response.headers);
    }
  }
}

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendLoginLinkEmail,
  sendVerificationCodeEmail,
};
