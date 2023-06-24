const unebookURI = `https://unebooksqa.s3.ap-south-1.amazonaws.com/unebook.png`;
const amnetURI = `https://unebooksqa.s3.ap-south-1.amazonaws.com/amnet-logo.png`;

const Publisher = (
  publisherName,
  publisherSuffix,
  contact,
  publisherAdminEmail,
  publisherAdminName
) => {
  const html = `
    <div id="email" style="width:600px;margin: auto;background:white; color:black">
        <table role="presentation" border="0" width="100%" cellspacing="0">
            <tr>
                <td style="vertical-align: top;
        padding: 30px 30px 10px 30px;">
                    <img alt="unebook.png" src="${unebookURI}" width="200px" align="center">
                </td>
            </tr>
        </table>
        <table role="presentation" border="0" width="100%">
            <tr>
                <td align="center">
                <h2
                style="font-size: 28px; font-family:Arial; color:#009CDE;">
                New Publisher Request</h2>
                </td>
            </tr>
        </table>
        <table role="presentation" border="0" width="100%" cellspacing="0">
            <tr>
                <td style="padding: 10px 30px 10px 60px";>
                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial">Hi Team,</p>
                    <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial;">Unebook has requested a new
                        Publisher instance. Please find the details below.</p>
                </td>
            </tr>
        </table>
        <table role="presentation" border="0" width="100%" cellspacing="0">
            <tr>
                <td style="padding: 10px 30px 10px 60px;">
                    <h1 style="font-size: 24px; margin:20px 0 20px 0; font-family:Arial;">Publisher Details</h1>
                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial">Publisher Name: ${publisherName}</p>
                    <p style="margin:0 0 16px 0;font-size:16px;line-height:24px;font-family:Arial">Publisher Suffix: https://${publisherSuffix}.unebook.es</p>
                    ${
                      publisherAdminName
                        ? `<p style="margin:0 0 16px 0;font-size:16px;line-height:24px;font-family:Arial">Publisher Admin Name: ${publisherAdminName}</p>`
                        : ""
                    }
                    ${
                      publisherAdminEmail
                        ? `<p style="margin:0 0 16px 0;font-size:16px;line-height:24px;font-family:Arial">Publisher Admin Email: <a
                        href="mailto:${publisherAdminEmail}">${publisherAdminEmail}</a></p>`
                        : ""
                    }
                 </td>
            </tr>
        </table>
        <table role="presentation" border="0" width="100%">
            <tr>
                <td bgcolor="#F5F8FA" align="center" style="padding: 30px 30px;">
                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial">The new instance will
                        be set up and made live within the next two business days. Please contact <a
                    href="mailto:${contact}">${contact}</a> for more information.</p>
                </td>
            </tr>
        </table>
    </div>
`;

  return html;
};

const SuperAdminEmailTemplate = (
  name,
  email,
  password,
  clientUrl,
  contact,
  report
) => {
  const html = `
  <div id="email" style="width:600px;margin: auto;background:white; color:black">
        <table role="presentation" border="0" width="100%" cellspacing="0">
            <tr>
                <td style="vertical-align: top;
        padding: 30px 30px 10px 30px;">
                    <img alt="unebook.png" src="${unebookURI}" width="200px" align="center">
                </td>
            </tr>
        </table>
        <table role="presentation" border="0" width="100%">
            <tr>
                <td align="center">
                <h2
                style="font-size: 28px; font-family:Arial; color:#009CDE;">
                Unebook Super Admin Request</h2>
                </td>
            </tr>
        </table>
        <table role="presentation" border="0" width="100%" cellspacing="0">
            <tr>
                <td style="padding: 10px 30px 10px 60px;">
                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial">Dear ${name},</p>
                    <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial;">You have been requested to be a Super admin on the Unebook platform.Please find your login credentials below.
                    </p>
                </td>
            </tr>
        </table>
        <table role="presentation" border="0" width="100%" cellspacing="0">
            <tr>
                <td style="padding: 10px 30px 10px 60px;">
                    <h1 style="font-size: 24px; margin:20px 0 20px 0; font-family:Arial;">Login credentials</h1>
                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial">Username: ${email}</p>
                    <p style="margin:0 0 16px 0;font-size:16px;line-height:24px;font-family:Arial">Password: ${password}</p>
                    <p style="margin:0 0 16px 0;font-size:16px;line-height:24px;font-family:Arial">
                    Website URL: <a href="${clientUrl}" target="_blank">${clientUrl}</a></p>
                 </td>
            </tr>
        </table>
        <table role="presentation" border="0" width="100%" cellspacing="0">
            <tr>
                <td style="padding: 10px 30px 10px 60px;">
                    <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial;">Note: Please change your default password after 
                      your first successful login.
                    </p>
                </td>
            </tr>
        </table>
        <table role="presentation" border="0" width="100%">
            <tr>
                <td bgcolor="#F5F8FA" align="center" style="padding: 30px 30px;">
                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial">If you are not the correct recipient of this email,
                      please report to <a href="mailto:${contact}">${contact}</a>.If you have problems in logging into
                      the platform, please contact <a href="mailto:${report}">${report}</a>.
                    </p>
                </td>
            </tr>
        </table>
    </div>
`;

  return html;
};

const ForgotPasswordEmailTemplate = (name, password, contact, report) => {
  const html = `
  <div id="email" style="width:600px;margin: auto;background:white; color:black">
        <table role="presentation" border="0" width="100%" cellspacing="0">
            <tr>
                <td style="vertical-align: top;
        padding: 30px 30px 10px 30px;">
                    <img alt="unebook.png" src="${unebookURI}" width="200px" align="center">
                </td>
            </tr>
        </table>
        <table role="presentation" border="0" width="100%">
            <tr>
                <td align="center">
                <h2
                style="font-size: 28px; font-family:Arial; color:#009CDE;">
                Forgot password Request</h2>
                </td>
            </tr>
        </table>
        <table role="presentation" border="0" width="100%" cellspacing="0">
            <tr>
                <td style="padding: 10px 30px 10px 60px;">
                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial">Dear ${name},</p>
                    <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial;">Please find your new password below.</p>
                </td>
            </tr>
        </table>
        <table role="presentation" border="0" width="100%" cellspacing="0">
            <tr>
                <td style="padding: 10px 30px 10px 60px;">
                    <h1 style="font-size: 24px; margin:20px 0 20px 0; font-family:Arial;">${password}</h1>
                 </td>
            </tr>
        </table>
        <table role="presentation" border="0" width="100%" cellspacing="0">
            <tr>
                <td style="padding: 10px 30px 10px 60px;">
                    <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial;">Note: Please change your default password after 
                      your first successful login.
                    </p>
                </td>
            </tr>
        </table>
        <table role="presentation" border="0" width="100%">
            <tr>
                <td bgcolor="#F5F8FA" align="center" style="padding: 30px 30px;">
                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial">If you are not the correct recipient of this email,
                      please report to <a href="mailto:${contact}">${contact}</a>.If you have problems in logging into
                      the platform, please contact <a href="mailto:${report}">${report}</a>.
                    </p>
                </td>
            </tr>
        </table>
    </div>
`;

  return html;
};

const PublisherAdminEmailTemplate = (
  publisherName,
  publisherSuffix,
  publisherAdminName,
  publisherAdminEmail,
  contact,
  report
) => {
  const html = `
  <div id="email" style="width:600px;margin: auto;background:white; color:black">
        <table role="presentation" border="0" width="100%" cellspacing="0">
            <tr>
                <td style="vertical-align: top;
        padding: 30px 30px 10px 30px;">
                    <img alt="unebook.png" src="${unebookURI}" width="200px" align="center">
                </td>
            </tr>
        </table>
        <table role="presentation" border="0" width="100%">
            <tr>
                <td align="center">
                <h2
                style="font-size: 28px; font-family:Arial; color:#009CDE;">
                Unebook Publisher Admin Request</h2>
                </td>
            </tr>
        </table>
        <table role="presentation" border="0" width="100%" cellspacing="0">
            <tr>
                <td style="padding: 10px 30px 10px 60px;">
                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial">Hi Team,</p>
                    <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial;">A new publisher admin request has been created by the Unebook team.
                      Please find the details of the publisher and publisher admin below.
                    </p>
                </td>
            </tr>
        </table>
        <table role="presentation" border="0" width="100%" cellspacing="0">
            <tr>
                <td style="padding: 10px 30px 10px 60px;">
                    <h1 style="font-size: 24px; margin:20px 0 20px 0; font-family:Arial;">Details</h3>
                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial">Publisher Name: ${publisherName}</p>
                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial">Publisher Suffix: https://${publisherSuffix}.unebook.es</p>
                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial">Publisher Admin Name: ${publisherAdminName}</p>
                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial">Publisher Admin Email: <a
                    href="mailto:${publisherAdminEmail}">${publisherAdminEmail}</a></p>
                 </td>
            </tr>
        </table>
        <table role="presentation" border="0" width="100%" cellspacing="0">
          <tr>
            <td style="padding: 10px 30px 10px 60px;">
                <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial;">Note: Please change your default password after 
                  your first successful login.
                </p>
            </td>
         </tr>
       </table>
        <table role="presentation" border="0" width="100%">
            <tr>
                <td bgcolor="#F5F8FA" align="center" style="padding: 30px 30px;">
                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial">If you are not the correct recipient of this email,
                    please report to <a href="mailto:${contact}">${contact}</a>.If you have problems in logging into
                    the platform, please contact <a href="mailto:${report}">${report}</a>.
                    </p>
                </td>
            </tr>
        </table>
    </div>
`;

  return html;
};

const PublisherStatus = (name, publisherName, publisherSuffix, contact) => {
  const html = `
      <div id="email" style="width:600px;margin: auto;background:white; color:black">
          <table role="presentation" border="0" width="100%" cellspacing="0">
              <tr>
                  <td style="vertical-align: top;
          padding: 30px 30px 10px 30px;">
                      <img alt="unebook.png" src="${unebookURI}" width="200px" align="center">
                  </td>
              </tr>
          </table>
          <table role="presentation" border="0" width="100%">
              <tr>
                  <td align="center">
                  <h2
                  style="font-size: 28px; font-family:Arial; color:#009CDE;">
                  Publisher Status Change</h2>
                  </td>
              </tr>
          </table>
          <table role="presentation" border="0" width="100%" cellspacing="0">
              <tr>
                  <td style="padding: 10px 30px 10px 60px;">
                      <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial">Hi ${name},</p>
                      <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial;">The following publisher 
                      status has been changed from setup In Progress to Active.</p>
                  </td>
              </tr>
          </table>
          <table role="presentation" border="0" width="100%" cellspacing="0">
              <tr>
                  <td style="padding: 10px 30px 10px 60px;">
                      <h1 style="font-size: 24px; margin:20px 0 20px 0; font-family:Arial;">Publisher Details</h1>
                      <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial">Publisher Name: <b>${publisherName}</b></p>
                      <p style="margin:0 0 16px 0;font-size:16px;line-height:24px;font-family:Arial">Publisher Suffix: <b><a href="https://${publisherSuffix}.unebook.es" target="_blank">
                      https://${publisherSuffix}.unebook.es</a></b></p>
                   </td>
              </tr>
          </table>
          <table role="presentation" border="0" width="100%">
              <tr>
                  <td bgcolor="#F5F8FA" align="center" style="padding: 30px 30px;">
                      <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial">For more details
                      Please contact <a
                      href="mailto:${contact}">${contact}</a>.</p>
                  </td>
              </tr>
          </table>
      </div>
  `;

  return html;
};

module.exports = {
  Publisher,
  SuperAdminEmailTemplate,
  ForgotPasswordEmailTemplate,
  PublisherAdminEmailTemplate,
  PublisherStatus,
};
