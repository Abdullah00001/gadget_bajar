const signupOtpTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - Gadget Bajar</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; max-width: 600px;">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 30px 20px; text-align: center; border-bottom: 2px solid #eeeeee;">
                            <h1 style="margin: 0; color: #333333; font-size: 24px;">Gadget Bajar</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 20px;">
                            <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.5;">
                                Hello,
                            </p>
                            <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.5;">
                                Your verification code is:
                            </p>
                            
                            <!-- OTP Code -->
                            <div style="text-align: center; margin: 30px 0;">
                                <div style="display: inline-block; background-color: #f8f8f8; border: 2px solid #dddddd; padding: 15px 30px; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #333333;">
                                    {{otp}}
                                </div>
                            </div>
                            
                            <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.5;">
                                This code will expire in {{expireAt}} minutes.
                            </p>
                            <p style="margin: 0 0 20px; color: #666666; font-size: 14px; line-height: 1.5;">
                                If you didn't request this code, please ignore this email.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px; text-align: center; border-top: 2px solid #eeeeee; background-color: #f9f9f9;">
                            <p style="margin: 0; color: #999999; font-size: 12px;">
                                © 2024 Gadget Bajar. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

export default signupOtpTemplate;
