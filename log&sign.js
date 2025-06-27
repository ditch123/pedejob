const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

// Sign Up Form Submission
document.getElementById("signupForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
        const response = await fetch("http://localhost:8000/signupEmployee", {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        alert(result.Message);
        if (result.Status === "Successfull") {
            window.location.href = "sign_info.html"; // redirect after success
        }
    } catch (err) {
        console.error("Signup failed:", err);
        alert("Signup error");
    }
});

// Sign In Form Submission
document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = {
        email: formData.get("email"),
        password: formData.get("password")
    };

    try {
        const response = await fetch("http://localhost:8000/login-employee", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(result.Message);
        if (result.Status === "Success") {
            localStorage.setItem("access_token", result.Token);
            window.location.href = "Main.html"; // redirect after login
        }
    } catch (err) {
        console.error("Login failed:", err);
        alert("Login error");
    }
});
