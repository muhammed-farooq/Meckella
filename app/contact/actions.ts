"use server";

export async function submitContactForm(prevState: any, formData: FormData) {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  
  if (!scriptUrl) {
    return { success: false, error: "Form submission is not configured on the server." };
  }

  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  // Validate fields
  if (!name || !email || !message) {
    return { success: false, error: "All fields are required." };
  }

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    // Google Apps Script usually returns 200 OK or 302 Redirect
    if (response.ok || response.status === 302) {
      return { success: true, message: "Your inquiry has been sent successfully." };
    } else {
      return { success: false, error: "There was an error sending your message. Please try again later." };
    }
  } catch (error) {
    console.error("Contact form error:", error);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}
