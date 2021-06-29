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
form.addEventListener("keyup", () => {
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
   let eye = document.getElementById("eye-icon");
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

   // get signed up users from local storage
   const users = JSON.parse(localStorage.getItem("bidonow_data")) || [];

   // Gets session Id from local storage
   let session = JSON.parse(localStorage.getItem("session"));

   // Encrypts Password
   const encrypted = CryptoJS.AES.encrypt(
      document.register.password.value,
      key
   );

   // Form Data
   const data = {
      Mem_Mobile: document.register.phone.value,
      Mem_F_Name: document.register.first_name.value,
      Mem_L_Name: document.register.last_name.value,
      Referral_UserName: document.register.username.value,
      Mem_Psswrd: encrypted.toString(),
      createdAt: Date.now(),
      latest_timestamp: timestamp,
   };
   users.push(data);

   // Storing Form Inputs in Local storage on submission (Not neccessary)
   // Acting as Database in the moment

   localStorage.setItem("bidonow_data", JSON.stringify(users));

   // Generating a Session Id fro user
   if (!session) {
      const id = "_" + Math.random().toString(36).substr(2, 9);
      var future = new Date();

      session = {
         SID: id,
         expires: future.setDate(future.getDate() + 30),
      };
      localStorage.setItem("session", JSON.stringify(session));
   }

   // Carrying out Async Functions to submit data to databse and verify number

   await accessDatabase()
      .then(async (res) => {
         if (res) {
            await verifyNumber()
               .then(() => {
                  // Reset Form on submission.
                  form.reset();
                  alert("Submitted");
                  reset();
                  location.reload();
               })
               .catch((err) => console.error(err));
         }
      })
      .catch((err) => console.error(err));
}

async function accessDatabase() {
   return true;
}

async function verifyNumber() {
   return true;
}
