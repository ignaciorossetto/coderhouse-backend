const socket = io();

const handleCreateButton = async (e) => {
  try {
    let obj = {};
    e.preventDefault();
    const form = document.getElementById("form");
    const formData = new FormData(form);
    for (let pair of formData.entries()) {
      obj[pair[0]] = pair[1];
    }
    await axios.post('http://localhost:8080/api/products', obj)

    // dejar en blanco el form
    const resetBtn = document.getElementById("resetButton");
    resetBtn.click();

    // disparar la llamada al socket para que devuelva los productos actualizados
    socket.emit("productsModified");
    socket.on("products", (data) => {
      document.getElementById("socketList").innerHTML = "";
      data.products.forEach((element) => {
        document.getElementById(
          "socketList"
        ).innerHTML += `<li>${element.title}</li>`;
      });
    });
  } catch (error) {
    return error;
  }
};

const handleDeleteButton = async () => {
  try {
    const element = document.getElementById("deleteItemInput");
    if (element.value.length === 0) {
      return "Must introudce an id";
    }
    socket.emit("deleteProduct", element.value);
    element.value = "";
  } catch (error) {
    return error;
  }
};

document
  .getElementById("createProductButton")
  .addEventListener("click", handleCreateButton);
document
  .getElementById("deletItemButton")
  .addEventListener("click", handleDeleteButton);

socket.on("products", (data) => {
  document.getElementById("socketList").innerHTML = "";
  data.products.forEach((element) => {
    document.getElementById(
      "socketList"
    ).innerHTML += `<li>${element.title}</li>`;
  });
});

window.onload = () => {
  socket.emit("authenticated");
  socket.on("products", (data) => {
    document.getElementById("socketList").innerHTML = "";
    data.products.forEach((element) => {
      document.getElementById(
        "socketList"
      ).innerHTML += `<li>${element.title}</li>`;
    });
  });
};