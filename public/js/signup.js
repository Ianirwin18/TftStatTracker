const signupForm = document.querySelector("#signup-form");
const signupFormHandler = async (event) => {
  event.preventDefault();
  const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  // Check all form variables
  if (username && email && password) {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
          username,
          email,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        console.log(response);
        return document.location.replace("/");
      }
    } catch (err) {
      console.log(err);
    }
  }
};

signupForm.addEventListener("submit", signupFormHandler);
