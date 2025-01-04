import { z } from "zod";
import { Resend } from "resend";

//resend instance using API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler(event) {
	//check if the method is post, if not return error
	if (event.httpMethod !== "POST") {
		return {
			statusCode: 405,
			body: JSON.stringify({ error: "Method not allowed" }),
		};
	}
	//schema for validating data
	try {
		const schema = z.object({
			name: z.string().min(1, "Name is required"),
			email: z.string().email("Invalid email ddress"),
			message: z.string().min(1, "Message is required"),
		});

		const body = JSON.parse(event.body);
		const data = schema.parse(body);

		//eliteglobalcs1.llc@gmail.com
		await resend.emails.send({
			from: "nicolerodriguezcab@gmail.com",
			to: "nicolerodriguezcab909@gmail.com",
			subject: `New message from ${data.name}`,
			html: `<p><strong>Name:</strong> ${data.name}</p>
                   <p><strong>Email:</strong> ${data.email}</p>
                   <p><strong>Message:</strong><br/>${data.message}</p>`,
		});

		return {
			statusCode: 200,
			body: JSON.stringify({ success: true }),
		};
	} catch (error) {
		return {
			statusCode: 400,
			body: JSON.stringify({ error: error.message || "Invalid request" }),
		};
	}
}
