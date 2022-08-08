const Validator = require("validator");
const isEmpty = require("./isEmpty");

export function validateLoginInput(data) {
	let errors = {};

	data.userName = !isEmpty(data.userName) ? data.userName : "";
	data.password = !isEmpty(data.password) ? data.password : "";

	if (Validator.isEmpty(data.userName)) {
		errors.userName = "UserName is required";
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = "Password is required";
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
}
export function validateRegisterInput({
	userName,
	firstName,
	lastName,
	email,
	password,
}) {
	let errors = {};

	userName = !isEmpty(userName) ? userName : "";
	password = !isEmpty(password) ? password : "";
	firstName = !isEmpty(firstName) ? firstName : "";
	lastName = !isEmpty(lastName) ? lastName : "";
	email = !isEmpty(email) ? email : "";

	if (!Validator.isEmail(email)) {
		errors.email = "Email is invalid";
	}

	if (Validator.isEmpty(userName)) {
		errors.userName = "UserName is required";
	}

	if (Validator.isEmpty(password)) {
		errors.password = "Password is required";
	}
	if (Validator.isEmpty(firstName)) {
		errors.firstName = "FirstName is required";
	}

	if (Validator.isEmpty(lastName)) {
		errors.lastName = "LastName is required";
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
}
