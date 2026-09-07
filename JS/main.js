// let searchBtn = document.querySelector(".search-btn");
let navLinks = document.querySelectorAll(".nav-link");
// let link = navLinks[1];
// let link = navLinks[0];
// console.log(link.href);
// console.log(navLinks[0]);

let propertyRooms = document.querySelector("#propertyRooms");
let propertyBathrooms = document.querySelector("#propertyBathrooms");
let propertyArea = document.querySelector("#propertyArea");

// Deleted properties
let deletedProperties =
  JSON.parse(localStorage.getItem("deletedProperties")) || [];

document.querySelectorAll(".property-item").forEach(function (property) {
  let propertyId = property.dataset.propertyId;

  if (deletedProperties.includes(propertyId)) {
    property.remove();
  }
});

// Search input
let searchInput = document.querySelector(".search-box input");
let suggestionsBox = document.querySelector(".location-suggestions");

let governorates = [
  "القاهرة",
  "الجيزة",
  "الإسكندرية",
  "الدقهلية",
  "البحر الأحمر",
  "البحيرة",
  "الفيوم",
  "الغربية",
  "الإسماعيلية",
  "المنوفية",
  "المنيا",
  "القليوبية",
  "الوادي الجديد",
  "السويس",
  "أسوان",
  "أسيوط",
  "بني سويف",
  "بورسعيد",
  "دمياط",
  "الشرقية",
  "جنوب سيناء",
  "كفر الشيخ",
  "مطروح",
  "الأقصر",
  "قنا",
  "شمال سيناء",
  "سوهاج",
];

// Filter
let propertyType = document.querySelector("#filterPropertyType");
let operationType = document.querySelector("#filterOperation");
let priceFilter = document.querySelector("#filterPrice");

// Search button
let searchBtn = document.querySelector(".search-btn");

// Property cards
let properties = document.querySelectorAll(".property-item");

// link.classList.add("active")

searchInput.addEventListener("focus", function () {
  showSuggestions(governorates);
});
searchInput.addEventListener("input", function () {
  let searchValue = searchInput.value.trim().toLowerCase();

  let matchedGovernorates = governorates.filter(function (governorates) {
    return governorates.toLowerCase().includes(searchValue);
  });

  showSuggestions(matchedGovernorates);
});

function showSuggestions(list) {
  suggestionsBox.innerHTML = "";

  for (let i = 0; i < list.length; i++) {
    let suggestion = document.createElement("div");

    suggestion.classList.add("suggestion");

    suggestion.textContent = list[i];

    suggestion.addEventListener("click", function () {
      searchInput.value = list[i];
      suggestionsBox.innerHTML = "";
    });
    suggestionsBox.appendChild(suggestion);
  }
}

searchBtn.addEventListener("click", function () {
  let searchValue = searchInput.value.toLowerCase();

  let selectedType = propertyType.value;
  let selectedOperation = operationType.value;
  let selectedPrice = priceFilter.value;

  for (let i = 0; i < properties.length; i++) {
    let property = properties[i];

    let type = property.dataset.type;
    let operation = property.dataset.operation;
    let price = Number(property.dataset.price);
    let location = property.dataset.location.toLowerCase();

    // Type
    let typeMatch = selectedType === "" || type === selectedType;

    // Operation
    let operationMatch =
      selectedOperation === "" || operation === selectedOperation;

    // Price
    let priceMatch = true;

    if (selectedPrice === "low") {
      priceMatch = price < 1000000;
    } else if (selectedPrice === "medium") {
      priceMatch = price >= 1000000 && price <= 3000000;
    } else if (selectedPrice === "high") {
      priceMatch = price > 3000000;
    }

    // Location
    let locationMatch = location.includes(searchValue);

    // Show/Hide
    if (typeMatch && operationMatch && priceMatch && locationMatch) {
      property.style.display = "";
    } else {
      property.style.display = "none";
    }
  }
});

// console.log(navLinks);
for (let i = 0; i < navLinks.length; i++) {
  let link = navLinks[i];

  link.addEventListener("click", function () {
    for (let j = 0; j < navLinks.length; j++) {
      navLinks[j].classList.remove("active");
    }
    link.classList.add("active");
  });
}

let scrollElements = document.querySelectorAll(".scroll-animation");

window.addEventListener("scroll", function () {
  for (let i = 0; i < scrollElements.length; i++) {
    let element = scrollElements[i];

    let elementPosition = element.getBoundingClientRect().top;

    let screenPosition = window.innerHeight - 100;

    if (elementPosition < screenPosition) {
      element.classList.add("show");
    }
  }
});

// =========================
// Add Property
// =========================

let propertyName = document.querySelector("#propertyName");
let propertyLocation = document.querySelector("#propertyLocation");
let propertyPrice = document.querySelector("#propertyPrice");
let propertyImage = document.querySelector("#propertyImage");
let propertyShortDesc = document.querySelector("#propertyShortDesc");
let propertyTypes = document.querySelector("#propertyTypes");
let propertyOperation = document.querySelector("#propertyOperation");
let propertyLongDesc = document.querySelector("#propertyLongDesc");

let addPropertyBtn = document.querySelector("#addPropertyBtn");
let propertiesContainer = document.querySelector("#propertiesContainer");

// Get saved properties from localStorage
let savedProperties =
  JSON.parse(localStorage.getItem("keyoraProperties")) || [];

// =========================
// Display Saved Properties
// =========================

function displaySavedProperties() {
  for (let i = 0; i < savedProperties.length; i++) {
    createPropertyCard(savedProperties[i]);
  }
}

// =========================
// Create Property Card
// =========================

function createPropertyCard(property) {
  let propertyCard = document.createElement("div");

  propertyCard.classList.add("col-md-4", "property-item");

  // Important for filtering
  propertyCard.dataset.propertyId = property.id;
  propertyCard.dataset.type = property.type;
  propertyCard.dataset.operation = property.operation;
  propertyCard.dataset.price = property.price;
  propertyCard.dataset.location = property.location;

  propertyCard.innerHTML = `

        <div class="property-card">

            <div class="property-image">

                <img 
                    src="${property.image}" 
                    alt="${property.name}"
                >

                <span class="property-type">
                    ${property.operation === "sale" ? "للبيع" : "للإيجار"}
                </span>

            </div>


            <div class="property-content">

                <h3>
                    ${property.name}
                </h3>


                <span class="price">
                    ${Number(property.price).toLocaleString()} EGP
                </span>
                <p class="location">

                    <i class="fa-solid fa-location-dot"></i>

                    ${property.location}

                </p>

                <div class="property-features">

                

    <span>
        <i class="fa-solid fa-bed"></i>
        ${property.rooms} غرف
    </span>

    <span>
        <i class="fa-solid fa-bath"></i>
        ${property.bathrooms} حمام
    </span>

    <span>
        <i class="fa-solid fa-ruler-combined"></i>
        ${property.area} م²
    </span>

</div>


                


                <p class="description">
                    ${property.shortDesc}
                </p>


                <div class="property-buttons">

                    <button 
                        type="button" 
                        class="btn details-btn"
                    >

                        تفاصيل

                        <i class="fa-solid fa-arrow-left"></i>

                    </button>


                    <button 
                        type="button" 
                        class="btn delete-btn"
                    >

                        حذف

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </div>

        </div>

    `;

  // Details button data

  let detailsBtn = propertyCard.querySelector(".details-btn");

  detailsBtn.dataset.name = property.name;

  detailsBtn.dataset.image = property.image;

  detailsBtn.dataset.longDesc = property.longDesc;

  detailsBtn.dataset.operation = property.operation;

  detailsBtn.dataset.rooms = property.rooms;

  detailsBtn.dataset.bathrooms = property.bathrooms;

  detailsBtn.dataset.area = property.area;
  // Add card to page

  propertiesContainer.appendChild(propertyCard);
}

// =========================
// Add New Property
// =========================

addPropertyBtn.addEventListener("click", function () {
  let name = propertyName.value.trim();

  let location = propertyLocation.value.trim();

  let price = propertyPrice.value;

  let shortDesc = propertyShortDesc.value.trim();

  let type = propertyTypes.value;

  let operation = propertyOperation.value;

  let longDesc = propertyLongDesc.value.trim();

  let imageFile = propertyImage.files[0];

  // =========================
  // Validation
  // =========================

  if (
    name === "" ||
    location === "" ||
    price === "" ||
    propertyRooms.value === "" ||
    propertyBathrooms.value === "" ||
    propertyArea.value === "" ||
    shortDesc === "" ||
    type === "" ||
    operation === "" ||
    longDesc === "" ||
    !imageFile
  ) {
    alert("من فضلك املأ جميع البيانات");

    return;
  }

  // =========================
  // Read Image
  // =========================

  let reader = new FileReader();

  reader.onload = function () {
    let imageURL = reader.result;

    // =========================
    // Create Property Object
    // =========================

    let newProperty = {
      id: "property-" + Date.now(),

      name: name,

      location: location,

      price: Number(price),

      type: type,

      operation: operation,

      // بيانات العقار
      rooms: Number(propertyRooms.value),
      bathrooms: Number(propertyBathrooms.value),
      area: Number(propertyArea.value),

      shortDesc: shortDesc,

      longDesc: longDesc,

      image: imageURL,
    };

    // =========================
    // Save Property
    // =========================

    savedProperties.push(newProperty);

    localStorage.setItem("keyoraProperties", JSON.stringify(savedProperties));

    // =========================
    // Display Property
    // =========================

    createPropertyCard(newProperty);

    // =========================
    // Clear Form
    // =========================

    propertyName.value = "";

    propertyLocation.value = "";

    propertyPrice.value = "";

    propertyImage.value = "";

    propertyShortDesc.value = "";

    propertyTypes.value = "";

    propertyOperation.value = "";

    propertyLongDesc.value = "";

    propertyRooms.value = "";

    propertyBathrooms.value = "";

    propertyArea.value = "";

    alert("تم إضافة العقار بنجاح ✅");
  };

  reader.readAsDataURL(imageFile);
});

// =========================
// Display Properties When Page Loads
// =========================

displaySavedProperties();

let propertyModal = document.querySelector("#propertyModal");
let modalPropertyImage = document.querySelector("#modalPropertyImage");
let modalPropertyLongDesc = document.querySelector("#modalPropertyLongDesc");
let propertyModalLabel = document.querySelector("#propertyModalLabel");
let modalOperationBtn = document.querySelector("#modalOperationBtn");
let modalPropertyRooms = document.querySelector("#modalPropertyRooms");
let modalPropertyBathrooms = document.querySelector("#modalPropertyBathrooms");
let modalPropertyArea = document.querySelector("#modalPropertyArea");

propertiesContainer.addEventListener("click", function (e) {
  // =========================
  // Delete
  // =========================

  let deleteBtn = e.target.closest(".delete-btn");

  if (deleteBtn) {
    let propertyCard = deleteBtn.closest(".property-item");

    let confirmDelete = confirm("هل أنت متأكد من حذف هذا العقار؟");

    if (confirmDelete) {
      let propertyId = propertyCard.dataset.propertyId;

      // Get deleted properties
      let deletedProperties =
        JSON.parse(localStorage.getItem("deletedProperties")) || [];

      // Add property ID
      if (!deletedProperties.includes(propertyId)) {
        deletedProperties.push(propertyId);
      }

      // Save deleted properties
      localStorage.setItem(
        "deletedProperties",
        JSON.stringify(deletedProperties),
      );

      // Remove from page
      propertyCard.remove();

      properties = document.querySelectorAll(".property-item");

      alert("تم حذف العقار بنجاح 🗑️");
    }

    return;
  }

  // =========================
  // Details
  // =========================

  let detailsBtn = e.target.closest(".details-btn");

  if (!detailsBtn) {
    return;
  }

  let name = detailsBtn.dataset.name;
  let image = detailsBtn.dataset.image;
  let longDesc = detailsBtn.dataset.longDesc;
  let operation = detailsBtn.dataset.operation;

  let rooms = detailsBtn.dataset.rooms;
  let bathrooms = detailsBtn.dataset.bathrooms;
  let area = detailsBtn.dataset.area;

  // Fill Modal

  propertyModalLabel.textContent = name;

  modalPropertyImage.src = image;
  modalPropertyImage.alt = name;

  modalPropertyLongDesc.textContent = longDesc;

  modalPropertyRooms.textContent = rooms + " غرف";

  modalPropertyBathrooms.textContent = bathrooms + " حمام";

  modalPropertyArea.textContent = area + " م²";

  // Operation Button

  if (operation === "sale") {
    modalOperationBtn.textContent = "شراء";
  } else {
    modalOperationBtn.textContent = "إيجار";
  }

  // Show Modal

  let modal = bootstrap.Modal.getOrCreateInstance(propertyModal);

  modal.show();
});
