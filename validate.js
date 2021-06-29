let forbidden_usernames = [];
const key = "bidonow1234keyscecret";

// Making an HTTP Request to access badwords.json file
function loadJSON(callback) {
   var xobj = new XMLHttpRequest();
   xobj.overrideMimeType("application/json");
   xobj.open("GET", "badwords.json", true);
   xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
         // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
         callback(xobj.responseText);
      }
   };
   xobj.send(null);
}
window.onload = () => {
   loadJSON(function (response) {
      // Getting the data in the JSON object
      var data = JSON.parse(response);
      forbidden_usernames = data.words;
   });
};

// Function to validate each input
const validate = (item) => {
   const phone_regex = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/;
   const username_regex = /^[\w+]{4,21}$/;
   const password_regex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,33}$/;

   // Variable to help with username validation
   let uname_check = {
      char_len: document.getElementById("u_char_len"),
      char_check: document.getElementById("u_char_check"),
      num_check: document.getElementById("u_num_check"),
      username_len: document.getElementById("username_len"),
   };

   // Variable to help with password validation
   let pass_check = {
      char_len: document.getElementById("pass_len"),
      big_case: document.getElementById("big_case"),
      num_check: document.getElementById("pass_num"),
      sym_check: document.getElementById("pass_sym"),
      max_len: document.getElementById("max_len"),
   };

   // Variable to help with display input validity status messages
   let status_message = {
      phone: document.getElementById("phone_validator"),
      fname: document.getElementById("fname_validator"),
      lname: document.getElementById("lname_validator"),
      username: document.getElementById("username_validator"),
      password: document.getElementById("password_validator"),
   };

   // Switch statement to step through each input element to update their validity

   switch (item.name) {
      case "phone":
         // Checks if Phone number syntax is valid

         item.addEventListener("keydown", (event) => {
            // Adding seperators to phone number
            if (event.key !== "Backspace") {
               if (!/^[0-9]+$/.test(event.key) || item.value.length > 13) {
                  event.preventDefault();
               }
               if (item.value == "") {
                  item.value += "(";
               }
               if (item.value.length == 4) {
                  item.value += ")-";
               }

               if (item.value.length == 9) {
                  item.value += "-";
               }
            }
         });

         // Validates Phone number input

         if (item.value !== "" && phone_regex.test(item.value)) {
            formState.phone = "valid";
         } else {
            formState.phone = "invalid";
         }
         localStorage.setItem("Mem_Mobile", "VARCHAR");

         break;
      case "first_name":
         // checks if first name is valid and contains only letters
         item.addEventListener("keydown", (event) => {
            if (!/^[A-Za-z]+$/.test(event.key)) {
               event.preventDefault();
            }
         });
         if (item.value !== "" && /^[A-Za-z]+$/.test(item.value)) {
            formState.fname = "valid";
         } else {
            formState.fname = "invalid";
         }
         localStorage.setItem("Mem_F_Name ", "VARCHAR");

         break;
      case "last_name":
         // checks if last name is valid and contains only letters
         item.addEventListener("keydown", (event) => {
            if (!/^[A-Za-z]+$/.test(event.key)) {
               event.preventDefault();
            }
         });
         if (item.value !== "" && /^[A-Za-z]+$/.test(item.value)) {
            formState.lname = "valid";
         } else {
            formState.lname = "invalid";
         }
         localStorage.setItem("Mem_L_Name ", "VARCHAR");

         break;
      case "username":
         item.addEventListener("keydown", (event) => {
            if (/[^A-Za-z 0-9_-]+/.test(event.key)) {
               event.preventDefault();
            }
         });
         if (item.value !== "" && !badwordChecker(item.value)) {
            // Checks if username has more than 4 characters
            if (item.value.length < 21) {
               uname_check.username_len.classList.add("active");

               // Checks if username has less than 21 characters
               if (item.value.length >= 4) {
                  uname_check.char_len.classList.add("active");
               } else {
                  uname_check.char_len.classList.remove("active");
               }
            } else {
               uname_check.username_len.classList.remove("active");
            }

            // Checks if username Contains a number
            if (/\d+/.test(item.value)) {
               uname_check.num_check.classList.add("active");
            } else {
               uname_check.num_check.classList.remove("active");
            }

            // Checks if username Contains an Alphabet
            if (/[A-Za-z]+/.test(item.value)) {
               uname_check.char_check.classList.add("active");
            } else {
               uname_check.char_check.classList.remove("active");
            }
         } else {
            formState.username = "invalid";
            uname_check.num_check.classList.remove("active");
            uname_check.username_len.classList.remove("active");
            uname_check.char_len.classList.remove("active");
            uname_check.char_check.classList.remove("active");
         }

         // Checks if username is a bad word and matches all the other rules

         if (username_regex.test(item.value) && !badwordChecker(item.value)) {
            formState.username = "valid";
         } else {
            formState.username = "invalid";
         }
         localStorage.setItem("Referral_UserName", "VARCHAR");

         break;

      case "password":
         const show = document.getElementById("eye");
         const show_icon = document.getElementById("eye-icon");

         // Checks if there is a character in input
         if (item.value !== "") {
            // Activates show password icon
            show_icon.classList.add("active");
            show.disabled = false;

            // Checks if password has more than 8 characters
            if (item.value.length >= 8) {
               pass_check.char_len.classList.add("active");
            } else {
               pass_check.char_len.classList.remove("active");
            }

            // Checks if password has at least one Upper Case letter
            if (/[A-Z]+/.test(item.value)) {
               pass_check.big_case.classList.add("active");
            } else {
               pass_check.big_case.classList.remove("active");
            }

            // Checks if password has at least one number

            if (/[0-9]+/.test(item.value)) {
               pass_check.num_check.classList.add("active");
            } else {
               pass_check.num_check.classList.remove("active");
            }

            // Checks if password has at least one special character

            if (/\W|_/.test(item.value)) {
               pass_check.sym_check.classList.add("active");
            } else {
               pass_check.sym_check.classList.remove("active");
            }

            // Checks if password has less than 33 characters

            if (item.value.length <= 33) {
               pass_check.max_len.classList.add("active");
            } else {
               pass_check.max_len.classList.remove("active");
            }

            if (password_regex.test(item.value)) {
               formState.password = "valid";
            } else {
               formState.password = "invalid";
            }
         } else {
            // Deactivates show password icon
            show_icon.classList.remove("active");
            show.disabled = true;

            formState.password = "invalid";

            pass_check.sym_check.classList.remove("active");
            pass_check.num_check.classList.remove("active");
            pass_check.big_case.classList.remove("active");
            pass_check.char_len.classList.remove("active");
            pass_check.max_len.classList.remove("active");
         }
         localStorage.setItem("Mem_Psswrd", "VARCHAR");

         break;
   }
};

// Helper function that checks if username is a bad word
const badwordChecker = (value) => {
   if (forbidden_usernames.includes(value)) {
      return true;
   }
   if (forbidden_usernames.includes(value.replace(/\d+/, ""))) {
      return true;
   }

   return false;
};
