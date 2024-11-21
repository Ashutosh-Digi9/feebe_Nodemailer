const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Route to send email
app.post('/send-email', async (req, res) => {
    const { toEmail, userName, password } = req.body;

    if (!toEmail || !userName || !password) {
        return res.status(400).send({ error: 'Missing required fields' });
    }

    try {
        // Configure transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 465,
            secure: true,
            auth: {
                user: "Info@gully2global.com",
                pass: "Shasudigi@217",
            },
        });

        // Email template
        const emailTemplate = `
       <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Created</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }

        table {
            border-spacing: 0;
            width: 100%;
            height: 100%;
        }

        td {
            padding: 0;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .header {
            background: url('https://firebasestorage.googleapis.com/v0/b/feebee-8578d.firebasestorage.app/o/image%20(2).png?alt=media&token=c1bbc18d-4c1e-46cf-9d9b-999a28a5c96f') no-repeat center center;
            background-size: cover;
            padding: 20px;
            text-align: center;
        }

        .header .logo {
            font-size: 28px;
            font-weight: bold;
            color: #223344;
            margin-bottom: 8px;
        }

        .header .logo span {
            color: #FFA500;
        }

        .content {
            padding: 20px;
            font-family: Arial, sans-serif;
            text-align: center;
        }

        .content h1 {
            font-size: 24px;
            margin-bottom: 10px;
            color: #333;
        }

        .content p {
            font-size: 14px;
            color: #555;
            margin-bottom: 20px;
        }

        .credentials {
            margin: 20px auto;
            text-align: left;
            font-size: 14px;
            line-height: 1.5;
        }

        .credentials .field {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #f9f9f9;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            margin-bottom: 10px;
        }

        .credentials .field span {
            font-weight: bold;
        }

        .footer {
            padding: 20px;
            font-size: 12px;
            color: #777;
            text-align: center;
            border-top: 1px solid #ddd;
        }

        .footer a {
            color: #FFA500;
            text-decoration: none;
        }

        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>

<body>
    <table>
        <tr>
            <td align="center">
                <div class="email-container">
                    <div class="header">
                        <div class="logo">FEEBE <span>●</span></div>
                        <div>Where connectivity between Schools, Parents, and Teachers is as easy as 123.</div>
                    </div>
                    <div class="content">
                        <h1>Your Account Successfully Created</h1>
                        <p>Your credentials are below:</p>
                        <div class="credentials">
                            <div class="field">
                                <span>User ID: </span>
                                <span>${userName}</span>
                            </div>
                            <div class="field">
                                <span>Password: </span>
                                <span>${password}</span>
                            </div>
                        </div>
                    </div>
                   
                </div>
            </td>
        </tr>
    </table>
</body>

</html>
        `;

        // Mail options
        const mailOptions = {
            from: "Info@gully2global.com",
            to: toEmail,
            subject: "Welcome to Feebee, Your Account Has Been Created Successfully!",
            html: emailTemplate,
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Email sent', info });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ error: 'Error sending email', details: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
