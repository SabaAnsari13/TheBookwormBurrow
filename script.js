document.getElementById("showRegister").addEventListener("click", function(event){
    event.preventDefault();
    document.getElementById("registerContainer").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
});

document.getElementById("showLogin").addEventListener("click", function(event){
    event.preventDefault();
    document.getElementById("registerContainer").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
});

document.getElementById("registerForm").addEventListener("submit", async function(event){
    event.preventDefault();
    var username = document.getElementById("registerUsername").value;
    var password = document.getElementById("registerPassword").value;

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        console.log(data.message); // Log the response from the backend
        // For simplicity, let's assume registration is successful and show login form
        document.getElementById("registerContainer").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
    } catch (error) {
        console.error('Error:', error);
        // Handle error
    }
});

document.getElementById("loginForm").addEventListener("submit", async function(event){
    event.preventDefault();
    var username = document.getElementById("loginUsername").value;
    var password = document.getElementById("loginPassword").value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        console.log(data.message); // Log the response from the backend
        // For simplicity, let's assume authentication is successful and redirect to another page
        window.location.href = "/dashboard"; // Redirect to dashboard page
    } catch (error) {
        console.error('Error:', error);
        // Handle error
    }
});

  