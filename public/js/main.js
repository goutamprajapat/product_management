window.addEventListener("load", function () {
  // store data in list
  let list = [];

  // ! get all product data form api
  async function getAllData() {
    const data = await fetch("http://localhost:3031/api/getProduct", {
      method: "GET",
    });
    const product = await data.json();

    // check status of product
    if (product.status === true) {
      list = product.result;
      printData(list);
    } else {
      console.log(error.message);
    }
  }

  // ! print data form dashboaed
  const printData = (list) => {
    let tbody = document.querySelector("#tbody");
    tbody.innerHTML = list
      .map((product, index) => {
        return `<tr>
      <th scope="row">${index + 1}</th>
      <td>${product.name}</td>
      <td>${product.Qty}</td>
      <td>${product.price}</td>
      <td>
        <div>
        <button data-remove-id="${
          product._id
        }" class="removebtn btn btn-danger"><i class="bi bi-trash3"></i></button>
        <button class="editBtn btn btn-danger"><i class="bi bi-pencil-square"></i></button>
        </div>
      </td>
      </tr>
      `;
      })
      .join("");

    // ! remove data using button
    const removebtn = document.querySelectorAll(".removebtn");
    removebtn.forEach((button) => {
      button.addEventListener("click", () => {
        const { removeId } = button.dataset;
        removeProduct(removeId);
      });
    });
  };
  // ! if check peoduct data delet or not
  async function removeProduct(id) {
    const URL = `http://localhost:3031/api/getProduct/${id}`;
    console.log(URL);
    const data = await fetch(URL, {
      method: "DELETE",
    });

    const respons = await data.json();

    if (respons.status === true) {
      alert(respons.message);
      getAllData();
    } else {
      console.log(error.message);
    }
  }
  // ! call the data function
  getAllData();
});
