function submitContactForm() {
    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const message = document.getElementById("contact-message").value.trim();
    const status = document.getElementById("contact-message-status");

    // Basic email format check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
        status.textContent = "❗ Please fill in all fields!";
        status.style.color = "red";
        return;
    }

    if (!emailPattern.test(email)) {
        status.textContent = "❗ Please enter a valid email address.";
        status.style.color = "red";
        return;
    }

    // Store message in localStorage
    let contactMessages = JSON.parse(localStorage.getItem("contactMessages")) || [];
    contactMessages.push({ name, email, message });
    localStorage.setItem("contactMessages", JSON.stringify(contactMessages));

    // Clear form
    document.getElementById("contact-name").value = "";
    document.getElementById("contact-email").value = "";
    document.getElementById("contact-message").value = "";

    // Show success
    status.textContent = "✅ Message sent successfully!";
    status.style.color = "green";
}
