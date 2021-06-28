const form = document.getElementById("form"); // Form HTML Element

// FormState to track validity of form
let formState = {
   phone: "invalid",
   fname: "invalid",
   lname: "invalid",
   username: "invalid",
   password: "invalid",
};

// Checks if form is Valid to enable submit button
form.addEventListener("change", () => {
   document.getElementById("submit-btn").disabled = !isFormValid();
});

// Manages form submit event and calls submit method to submit the form
form.addEventListener("submit", (event) => {
   event.stopImmediatePropagation();
   event.preventDefault();
   submit(event.timeStamp);
});

// Helper function to check validity of form
const isFormValid = () => {
   return Object.values(formState).every((val) => val == "valid");
};

// reset form to invalid
const reset = () => {
   return (formState = {
      phone: "invalid",
      fname: "invalid",
      lname: "invalid",
      username: "invalid",
      password: "invalid",
   });
};

// Method to toggle Show/Hide Password
const showPassword = () => {
   let eye = document.getElementById("eye");
   let x = document.getElementById("password");
   if (x.type === "password") {
      x.type = "text";
      eye.classList.remove("fa-eye-slash");
      eye.classList.add("fa-eye", "active");
      eye.title = "Show Password";
   } else {
      x.type = "password";
      eye.classList.remove("fa-eye", "active");
      eye.classList.add("fa-eye-slash");
      eye.title = "Hide Password";
   }
};

// Submit Form Data
async function submit(timestamp) {
   console.log("clicked");
   const encrypted = CryptoJS.AES.encrypt(
      document.register.password.value,
      key
   );
   const data = {
      phone: document.register.phone.value,
      first_name: document.register.first_name.value,
      last_name: document.register.last_name.value,
      username: document.register.username.value,
      password: encrypted.toString(),
      updatedAt: Date.now(),
      latest_timestamp: timestamp,
   };
   localStorage.setItem("bidonow_data", JSON.stringify(data));
   await accessDatabase();
   await verifyNumber();
   form.reset();
   alert("Submitted");
   reset();
   return true;
}

async function accessDatabase() {}

async function verifyNumber() {}
