const submit = document.getElementById("submit");
const name = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const username = document.getElementById("username");
const password = document.getElementById("password");
const visible = document.getElementById("visible");
const new_user = document.getElementById("new_user");

document.addEventListener("change", (e) => {
    if (e.target === visible) {
        if (visible.checked === false) password.type = "password";
        else password.type = "text";
    }
});

document.addEventListener("click", (e) => {
    if (e.target === submit) {
        if (password.value !== "" && username.value !== "" && name.value !== "" && apellido.value !== "") {
            e.preventDefault();
            alert("La cuenta ha sido creada con éxito");
            window.location.href = "/index.html";
        }
    }
})