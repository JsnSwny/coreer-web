export default async function handler(req: any, res: any) {
  try {
    console.log(req);

    const response = await fetch("/auth/github/callback", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.query), // Pass the query parameters received from the callback
    });

    const { access_token } = await response.json();

    // Store the access token securely (e.g., in a session or local storage)

    res.redirect("/dashboard"); // Redirect the user to the desired page after successful authentication
  } catch (error) {
    console.log(error);
    // Handle error
    res.status(500).json({ message: "Internal server error" });
  }
}
