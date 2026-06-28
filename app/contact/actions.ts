"use server";

export type FormState = {
  success: boolean;
  error?: string;
  message?: string;
};

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    return { success: false, error: "Form submission is not configured on the server." };
  }

  const name = formData.get("name") as string | null;
  const email = formData.get("email") as string | null;
  const message = formData.get("message") as string | null;

  // Validate fields
  if (!name || !email || !message) {
    return { success: false, error: "All fields are required." };
  }

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        message,
        timestamp: new Date().toISOString(),
      }),
    });

    // Google Apps Script returns 200 OK or occasionally redirects (302)
    if (response.ok || response.status === 302) {
      return { success: true, message: "Your inquiry has been sent successfully. We'll be in touch soon!" };
    } else {
      return { success: false, error: "There was an error sending your message. Please try again later." };
    }
  } catch (error) {
    console.error("Contact form submission error:", error);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}
