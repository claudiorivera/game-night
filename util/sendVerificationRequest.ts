// https://next-auth.js.org/providers/email#customising-emails
import { appTitle, primaryColor } from "@config";
import { SendVerificationRequest } from "next-auth/providers";
import nodemailer from "nodemailer";

const sendVerificationRequest: SendVerificationRequest = ({
  identifier: email,
  url,
  token,
  baseUrl,
  provider,
}) => {
  return new Promise((resolve, reject) => {
    const { server, from } = provider;
    // Strip protocol from URL and use domain as site name
    const site = baseUrl.replace(/^https?:\/\//, "");

    nodemailer.createTransport(server).sendMail(
      {
        to: email,
        from,
        subject: `Sign in to ${appTitle}`,
        text: text({ url }),
        html: html({ url, site, email }),
      },
      (error) => {
        if (error) {
          console.error("SEND_VERIFICATION_EMAIL_ERROR", email, error);
          return reject(new Error(`SEND_VERIFICATION_EMAIL_ERROR: ${error}`));
        }
        return resolve();
      }
    );
  });
};

interface HtmlProps {
  url: string;
  site: string;
  email: string;
}

// Email HTML body
const html = ({ url, site, email }: HtmlProps) => {
  // Insert invisible space into domains and email address to prevent both the
  // email address and the domain from being turned into a hyperlink by email
  // clients like Outlook and Apple mail, as this is confusing because it seems
  // like they are supposed to click on their email address to sign in.
  const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`;

  // Some simple styling options
  const backgroundColor = "#f9f9f9";
  const textColor = "#444444";
  const mainBackgroundColor = "#ffffff";
  const buttonBackgroundColor = primaryColor;
  const buttonBorderColor = primaryColor;
  const buttonTextColor = "#ffffff";

  // Uses tables for layout and inline CSS due to email client limitations
  return `
<body style="background: ${backgroundColor};">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        <strong>${appTitle}</strong>
      </td>
    </tr>
  </table>
  <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        Sign in as <strong>${escapedEmail}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${buttonBackgroundColor}"><a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${buttonTextColor}; text-decoration: none; text-decoration: none;border-radius: 5px; padding: 10px 20px; border: 1px solid ${buttonBorderColor}; display: inline-block; font-weight: bold;">Sign in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`;
};

interface TextProps {
  url: string;
}

// Email text body – fallback for email clients that don't render HTML
const text = ({ url }: TextProps) => `Sign in to ${appTitle}\n${url}\n\n`;

export default sendVerificationRequest;
