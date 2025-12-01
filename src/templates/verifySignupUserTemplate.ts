const verifySignupUserTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Verified - Gadget Bajar</title>
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
                                Great news! Your account has been successfully verified.
                            </p>
                            
                            <!-- Success Icon -->
                            <div style="text-align: center; margin: 30px 0;">
                                <div style="display: inline-block; width: 60px; height: 60px; border-radius: 50%; background-color: #28a745; text-align: center; line-height: 60px;">
                                    <span style="color: #ffffff; font-size: 36px; font-weight: bold;">✓</span>
                                </div>
                            </div>
                            
                            <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.5;">
                                You can now login and start shopping for the latest gadgets.
                            </p>
                            
                            <!-- Login Button -->
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="https://gadgetbajar.com/login" style="display: inline-block; padding: 12px 40px; background-color: #007bff; color: #ffffff; text-decoration: none; font-size: 16px; border-radius: 4px;">
                                    Login Now
                                </a>
                            </div>
                            
                            <p style="margin: 0 0 20px; color: #666666; font-size: 14px; line-height: 1.5;">
                                If you have any questions, feel free to contact our support team.
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

export default verifySignupUserTemplate;
