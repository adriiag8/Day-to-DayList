const submit = document.getElementById("submit");
const username = document.getElementById("username");
const password = document.getElementById("password");
const visible = document.getElementById("visible");

document.addEventListener("change", (e) => {
    if (e.target === visible) {
        if (visible.checked === false) password.type = "password";
        else password.type = "text";
    }
});

document.addEventListener("click", (e) => {
    if (e.target === submit) {
        if (password.value !== "" && username.value !== "") {
            e.preventDefault();
            window.location.href = "/pages/main.html";
        }
    }
})