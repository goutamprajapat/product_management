window.addEventListener("load", function () {
  // store data in list
  let list = [];

  const imgpreview = document.getElementById("imgpreview");
  let imageFile = document.querySelector("#pic");

  imageFile.addEventListener("change", () => {
    if (imageFile.files[0] !== undefined) {
      let ext = imageFile.files[0].name.substring(
        imageFile.files[0].name.lastIndexOf(".") + 1
      );
      if (ext === "png" || ext === "jpg" || ext === "jpeg") {
        const reader = new FileReader();
        reader.onload = () => {
          imgpreview.src = reader.result;
        };
        reader.readAsDataURL(imageFile.files[0]);
      } else {
        alert("File must of type JPG/JPEG/PNG");
        imageFile.value = "";
        document.getElementById("imgpreview").src =
          "https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg";
      }
    }
  });

  const SaveProduct = document.querySelector("#saveNewProduct");

  SaveProduct.addEventListener("click", async function () {
    try {
      const productFile = document.querySelector("#pic");

      let file = productFile.files[0];
      if (file === undefined) {
        alert("please select a file");
        return false;
      }
      // formData
      const fromData = new FormData();

      fromData.append("name", document.querySelector("#ProductName").value);
      fromData.append("Qty", document.querySelector("#productOuantity").value);
      fromData.append("price", document.querySelector("#ProductPrice").value);
      fromData.append("mfgDate", document.querySelector("#ProductDate").value);
      fromData.append("id", id);
      fromData.append("pic", file);

      const Options = {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: fromData,
      };
      const URL = "http://localhost:3031/api/saveNewproduct";
      const res = await fetch(URL, Options);
      let data = await res.json();
      if (data.status === true) {
        const isAddNew = confirm(
          data.message + " do you want to add new product"
        );
        if (isAddNew) {
          document.getElementById("imgpreview").src =
            "https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg";
          document.querySelector("#ProductName").value =
            document.querySelector("#productOuantity").value =
            document.querySelector("#ProductPrice").value =
            document.querySelector("#ProductDate").value =
            document.querySelector("#pic").value =
              "";
        } else {
          window.location.reload();
        }
      } else {
        alert(data.message);
      }
      getAllData();
    } catch (error) {
      console.log(error);
    }
  });

  // ! get all product data form api
  async function getAllData() {
    try {
      const data = await fetch("http://localhost:3031/api/getProduct", {
        method: "GET",
      });
      let product = await data.json();
      // check status of product
      if (product.status === true) {
        list = product.result;
        printData(list);
      } else {
        console.log(product.message);
        window.location.reload();
      }
    } catch (error) {
      alert(product.message);
      console.log(product.message);
    }
  }

  // ! print data form dashboaed
  const printData = (list) => {
    let tbody = document.querySelector("#tbody");
    tbody.innerHTML = list
      .map((product, index) => {
        return `<tr>
      <th scope="row">${index + 1}</th>
      <th><img src="../images/${product.images}" width='30' alt="img" /></th>
      <td>${product.name}</td>

      <td>${product.Qty}</td>
      <td>${product.price}</td>
      <td>
        <div>
        <button data-remove-id="${
          product._id
        }" class="removebtn btn btn-danger"><i class="bi bi-trash3"></i></button>
        <button data-update-id="${product._id}"data-bs-toggle="modal",
        data-bs-target="#updateProduct"
        class="modle editBtn btn btn-danger"><i class="bi bi-pencil-square"></i></button>
        </div>
      </td>
      </tr>
      `;
      })
      .join("");

    // ! working on update product data
    const getProductUpdateId = document.querySelectorAll(".editBtn");
    const UpdateProduct = document.querySelector("#UpdateNewProduct");

    getProductUpdateId.forEach((button) => {
      button.addEventListener("click", () => {
        var { updateId } = button.dataset;
        getSingleProductId(updateId);
      });
    });

    // const data = {

    async function getSingleProductId(id) {
      const URL = `http://localhost:3031/api/getProduct/${id}`;
      const data = await fetch(URL, {
        method: "GET",
      });
      const respons = await data.json();
      let product = respons.result[0];
      (document.querySelector("#updateProductName").value = product.name),
        (document.querySelector("#updateproductOuantity").value = product.Qty),
        (document.querySelector("#updateProductPrice").value = product.price),
        (document.querySelector("#updateProductDate").value = product.mfgDate),
        (document.querySelector("#updatepic").src = product.images);
      var userId = product.id;
      UpdateProduct.addEventListener("click", () => {
        fetchproduct(userId);
        console.log(userId);
      });
    }

    async function fetchproduct(id) {
      let name = document.querySelector("#updateProductName").value;
      let Qty = document.querySelector("#updateproductOuantity").value;
      let price = document.querySelector("#updateProductPrice").value;
      let mfgDate = document.querySelector("#updateProductDate").value;

      console.log("value " + name, Qty, price, mfgDate);
      // fromData.append("id", id);
      // fromData.append("pic", file);
      const URL = `http://localhost:3031/api/getProduct/${id}`;
      let updateData = {
        name,
        Qty,
        price,
        mfgDate,
      };
      const data = await fetch(URL, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "multipart/form-data",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(updateData),
      });

      const respons = await data.json();
      if (!respons.status === true) {
        console.log("respons " + respons);
        console.log("sucessfully fetch data");
        getAllData();
      } else {
        console.log("unable fetch data");
      }
    }

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
