import { NextResponse, NextRequest } from "next/server";
const nodemailer = require("nodemailer");


export async function POST(request: Request) {
    const sendingEmail = process.env.NEXT_SENDING_EMAIL;
    const password = process.env.NEXT_SENDING_PASSWORD;
    const myEmail = process.env.NEXT_RECEIVING_EMAIL;

    console.log("dealing with request");

    // console.log({ sendingEmail }, { password }, { myEmail });
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const subject = formData.get("subject");

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: sendingEmail,
            pass: password,
        },
    });

    try {
        const mail = await transporter.sendMail({
            from: `Portfolio 🚀<${sendingEmail}>`,
            to: myEmail,

            subject: subject,
            html: `
            <p>Name: ${name} </p>
            <p>Email: ${email} </p><br></br>
            <pre>${message}</pre>
            `,
        });


        return NextResponse.json({
            message: "Thanks for reaching out! Your message has been sent. I'll get back to you within 24 hours.",
        }, {
            status: 200, statusText: `Thanks for reaching out! Your message has been sent. I'll get back to you within 24 hours.`
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "We were unable to send your message at this time. Please try again later.",
        }, {
            status: 500, statusText: "Something went wrong. Please try again in a few minutes."
        });
    }
}
