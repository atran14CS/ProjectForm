"use strict";

(function() {
    window.addEventListener("load", init);

    /**
     * the inital point of the program as soon as window loads
     */
    function init() {
        document.querySelector('.submitBtn').addEventListener("click", verifyInfromation);
        document.querySelectorAll('.backBtn').forEach(btn => {
            btn.addEventListener("click", returnMain);
        });
        // document.getElementById('confirmBtn').addEventListener('click', function() { // for PHP Submission
        // document.querySelector('form').submit();
        // });
        document.getElementById('confirmBtn').addEventListener('click', function() {
            document.getElementById("confirmModal").classList.add('hidden');
            document.getElementById("successModal").classList.remove('hidden');
        });
        document.querySelectorAll('.field input, .field select').forEach(field => {
        field.addEventListener('focus', () => {
            const hint = field.nextElementSibling;
            if (hint && hint.tagName.toLowerCase() === "p") {
            hint.classList.remove('hidden');
            }
        });

        field.addEventListener('blur', () => {
            const hint = field.nextElementSibling;
            if (hint && hint.tagName.toLowerCase() === "p") {
            hint.classList.add('hidden');
            }
        });
    });

    }

    /**
     * Verifies the infromation the user submits ensures first name, last name,
     * email, account number, and year follow proper format.
     * @param {Event} event - action of the submit button.
     */
    function verifyInfromation(event) {
        event.preventDefault();
        const fname = document.getElementById('fname').value.trim();
        const lname = document.getElementById('lname').value.trim();
        const email = document.getElementById('email').value.trim();
        const accountNum = document.getElementById("accountNum").value.trim();
        const year = document.getElementById('year').value.trim();

        const errors = [];

        if(!validateName(fname)) {
            errors.push("First name must contain only letters and spaces.");
        }
        if(!validateName(lname)) {
            errors.push("Last name must contain only letters and spaces.");
        }
        if(!validateEmail(email)) {
            errors.push("Invalid email format.");
        }
        if(!validateAccountNum(accountNum)) {
            errors.push("Account number must be 12 alphanumeric characters.");
        }
        if(!validateYear(year)) {
            errors.push("Invalid year selected.");
        }

        if(errors.length > 0) {
            displayError(errors)
        } else {
            displayInfo(fname, lname, email, accountNum, year);
        }
    }

    // Helper Functions for input validations
    /**
     * Checks if the name is valid not empty
     * @param {String} name - the name of the user first or last name
     * @returns - returns true if the name is not empty false otherwise
     */
    function validateName(name) {
        return /^[a-zA-Z ]+$/.test(name);
    }

    /**
     * Checks if email follows email regex pattern
     * @param {String} email - the email of the user
     * @returns - returns true if the email is valid false otherwise
     */
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    /**
     * Checks to see if the account number is valid
     * REQUIREMENTS:
     * 12 characters long
     * non alpha numeric characters
     * @param {String} accountNum - the account number of the user
     * @returns true if requirements are met false otherwise
     */
    function validateAccountNum(accountNum) {
        return /^[A-Za-z0-9]{12}$/.test(accountNum);
    }

    /**
     * Checks if year is valid
     * @param {String} year - the selected year by user
     * @returns - true if a year selected false otherwise
     */
    function validateYear(year) {
        return /^(2021|2022|2023|2024|2025)$/.test(year);
    }
    // end of input validations functions

    /**
     * Returns the page back to the infopage
     */
    function returnMain() {
        document.getElementById("confirmModal").classList.add('hidden');
        document.getElementById("errorModal").classList.add('hidden');
        document.getElementById("successModal").classList.add('hidden');2
    }

    /**
     * Displays the user info
     * @param {String} fname - first name of user
     * @param {String} lname - last name of user
     * @param {String} email - email of user
     * @param {String} accountNum - account number of the user
     * @param {String} year - year selected by the user (2021 - 2025)
     */
    function displayInfo(fname, lname, email, accountNum, year) {
        document.getElementById("confirmModal").classList.remove('hidden');
        const userInfoList = document.querySelector(".userInfo-order-list");
        userInfoList.innerHTML = "";

        const userFirstName = helperCreateLi(fname, "First Name");
        const userLastName = helperCreateLi(lname, "Last Name");
        const userEmail = helperCreateLi(email, "Email");
        const userAccountNumber = helperCreateLi(accountNum, "Account Number");
        const userYear = helperCreateLi(year, "Year");

        userInfoList.append(userFirstName, userLastName, userEmail, userAccountNumber, userYear);
    }

    function helperCreateLi(value, fieldName) {
        const li = document.createElement("li");
        li.textContent = `${fieldName}: ${value}`
        return li;
    }


    /**
     * Displays the any errors with the values submitted with the input
     * @param {Object} errors - Array of string message errors
     */
    function displayError(errors) {
        const heading = document.querySelector(".error-content h2");
        if (errors.length === 1) {
            heading.textContent = "Please review the following error";
        } else {
            heading.textContent = "Please review the following errors";
        }
        const errorContainer = document.querySelector(".errorInfo");
        errorContainer.innerHTML = "";
        const ul = document.createElement('ul');
        document.getElementById("errorModal").classList.remove('hidden');
        for (let i = 0; i < errors.length; i++) {
            const li = document.createElement('li');
            li.textContent = errors[i];
            ul.append(li);
        }
        errorContainer.append(ul);
    }

})();
