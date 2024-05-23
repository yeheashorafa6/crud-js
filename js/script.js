let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let search = document.getElementById("search");
let mood = "create";
let tmp;

// get total

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#212529";
  } else {
    total.innerHTML = "";
    total.style.background = "none";
  }
}

//create prodect

let dataProdect;

if (localStorage.prodect != null) {
  dataProdect = JSON.parse(localStorage.prodect);
} else {
  dataProdect = [];
}

create.onclick = function () {
  let newProdect = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  let condetion =
    newProdect.title.length > 1 ||
    newProdect.price.value > 50 ||
    (newProdect.count > 1 && newProdect.count < 100);

  if (condetion) {
    console.log("success")
    
    if (mood === "create") {
      if (newProdect.count > 1 && newProdect.count < 100) {
        document.getElementById("error").innerHTML = "";
        for (let index = 0; index < newProdect.count; index++) {
          dataProdect.push(newProdect);
        }
      } else {
        dataProdect.push(newProdect);
        document.getElementById("error").innerHTML = "Adding One Prodect";
        document.getElementById("error").style.color = "#fa4";
      }
    } else {
      dataProdect[tmp] = newProdect;
      count.style.display = "block";
      create.innerHTML = "Create";
    }

    //save localstorage
    localStorage.setItem("prodect", JSON.stringify(dataProdect));
  } else {
    document.getElementById("error_msg").classList.remove("d-none");
    document.getElementById("error_msg").innerHTML = `
          <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
      <div>
        Mis Input in Title Or Price 
      </div>
    `;
  }

  //count

  clearData();
  showData();
};

//clear input

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
  total.style.background = "none";
}

// read

function showData() {
  let table = "";

  for (let index = 0; index < dataProdect.length; index++) {
    table += `
    <tr>
    <th scope="row">${index + 1}</th>
    <td>${dataProdect[index].title}</td>
    <td>${dataProdect[index].price}</td>
    <td>${dataProdect[index].taxes}</td>
    <td>${dataProdect[index].ads}</td>
    <td>${dataProdect[index].discount}</td>
    <td>${dataProdect[index].total}</td>
    <td>${dataProdect[index].category}</td>
    <td>
      <button onclick="updateItem(${index})" type="submit" class="update" id="update">
        Update
      </button>
    </td>
    <td>
      <button onclick="deleteItem(${index})" type="submit" class="delete" id="delete">
        Delete
      </button>
    </td>
  </tr>
    `;
  }

  document.getElementById("tbody").innerHTML = table;

  if (dataProdect.length > 0) {
    document.getElementById("deleteAll").innerHTML = `
    <button onclick="deleteAll()" type="submit" class="form-control deleteAll" id="delete">
    Delete All (${dataProdect.length})
  </button>
    `;
  }
}

showData();

//deleteData

function deleteItem(index) {
  dataProdect.splice(index, 1);
  localStorage.prodect = JSON.stringify(dataProdect);
  showData();
}
//deleteAllData

function deleteAll() {
  localStorage.clear();
  dataProdect.splice(0);
  showData();
  document.getElementById("deleteAll").innerHTML = "";
}

//update

function updateItem(index) {
  title.value = dataProdect[index].title;
  price.value = dataProdect[index].price;
  taxes.value = dataProdect[index].taxes;
  ads.value = dataProdect[index].ads;
  discount.value = dataProdect[index].discount;
  category.value = dataProdect[index].category;

  getTotal();
  count.style.display = "none";
  document.getElementById("countLabel").style.display = "none";
  create.innerHTML = "Update";
  mood = "update";
  tmp = index;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//search

let searchMood = "title";

function getSearchMood(id) {
  if (id !== "searchTitle") {
    searchMood = "category";
  } else {
    searchMood = "title";
  }
  search.placeholder = "Search By " + searchMood;
  search.value = "";
  showData();

  search.focus();
}

function searchData(value) {
  let table = "";
  for (let index = 0; index < dataProdect.length; index++) {
    if (searchMood == "title") {
      if (dataProdect[index].title.includes(value.toLowerCase())) {
        table += `
      <tr>
      <th scope="row">${index + 1}</th>
      <td>${dataProdect[index].title}</td>
      <td>${dataProdect[index].price}</td>
      <td>${dataProdect[index].taxes}</td>
      <td>${dataProdect[index].ads}</td>
      <td>${dataProdect[index].discount}</td>
      <td>${dataProdect[index].total}</td>
      <td>${dataProdect[index].category}</td>
      <td>
        <button onclick="updateItem(${index})" type="submit" class="update" id="update">
          Update
        </button>
      </td>
      <td>
        <button onclick="deleteItem(${index})" type="submit" class="delete" id="delete">
          Delete
        </button>
      </td>
    </tr>
      `;
      }
    } else {
      if (dataProdect[index].category.includes(value.toLowerCase())) {
        table += `
      <tr>
      <th scope="row">${index + 1}</th>
      <td>${dataProdect[index].title}</td>
      <td>${dataProdect[index].price}</td>
      <td>${dataProdect[index].taxes}</td>
      <td>${dataProdect[index].ads}</td>
      <td>${dataProdect[index].discount}</td>
      <td>${dataProdect[index].total}</td>
      <td>${dataProdect[index].category}</td>
      <td>
        <button onclick="updateItem(${index})" type="submit" class="update" id="update">
          Update
        </button>
      </td>
      <td>
        <button onclick="deleteItem(${index})" type="submit" class="delete" id="delete">
          Delete
        </button>
      </td>
    </tr>
      `;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}

//clean data
