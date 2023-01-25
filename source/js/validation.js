const name = document.getElementById("name");
const sex = document.getElementById("male");
const dateOfBirth = document.getElementById("date-of-birth");
const postalCode = document.getElementById("postal-code");
const address = document.getElementById("address");
const tel = document.getElementById("tel");
const email = document.getElementById("email");
const inqueryType = document.getElementById("inquery-type");
const inqueryBody = document.getElementById("inquery-body");

export default class Validation {
	name() {
		validateName();
	}
	sex() {
		validateSex();
	}
	DoB() {
		validateDoB();
	}
	postalCode() {
		validatePostalCode();
	}
	address() {
		validateAddress();
	}
	tel() {
		validateTel();
	}
	email() {
		validateEmail();
	}
	inqueryType() {
		validateInqueryType();
	}
	inqueryBody() {
		validateInqueryBody();
	}
	form() {
		let isValid = true;
		//　名前のバリデーション
		if (!validateName()) isValid = false;
		// 性別のバリデーション
		if (!validateSex()) isValid = false;
		// 生年月日のバリデーション
		if (!validateDoB()) isValid = false;
		// 郵便番号のバリデーション
		if (!validatePostalCode()) isValid = false;
		// 住所のバリデーション
		if (!validateAddress()) isValid = false;
		// 電話番号のバリエーション
		if (!validateTel()) isValid = false;
		// メールアドレスのバリデーション
		if (!validateEmail()) isValid = false;
		// お問い合わせの種類のバリデーション
		if (!validateInqueryType()) isValid = false;
		// お問い合わせ本文のバリデーション
		if (!validateInqueryBody()) isValid = false;
		return isValid;
	}
}

const validateName = () => {
	if (name.validity.valid) {
		$("#name-error").text("").removeClass("active");
		return true;
	} else if (name.validity.valueMissing) {
		$("#name-error").text("名前は必ず入力してください").addClass("active");
		return false;
	} else if (name.validity.tooLong) {
		$("#name-error").text("名前は50文字以内で入力してください").addClass("active");
		return false;
	} else {
		$("#name-error").text("名前は正しく入力してください").addClass("active");
		return false;
	}
};

const validateSex = () => {
	if (sex.validity.valid) {
		$("#sex-error").text("").removeClass("active");
		return true;
	} else if (sex.validity.valueMissing) {
		$("#sex-error").text("性別は必ず入力してください").addClass("active");
		return false;
	} else {
		$("#sex-error").text("性別は正しく入力してください").addClass("active");
		return false;
	}
};

const validateDoB = () => {
	if (dateOfBirth.validity.valid) {
		$("#dob-error").text("").removeClass("active");
		return true;
	} else if (dateOfBirth.validity.valueMissing) {
		$("#dob-error").text("生年月日は必ず入力してください").addClass("active");
		return false;
	} else if (dateOfBirth.validity.patternMismatch) {
		$("#dob-error").text("生年月日は正しい形式で入力してください").addClass("active");
		return false;
	} else {
		$("#dob-error").text("生年月日は正しく入力してください").addClass("active");
		return false;
	}
};
const validatePostalCode = () => {
	if (postalCode.validity.valid) {
		$("#postal-code-error").text("").removeClass("active");
		return true;
	} else if (postalCode.validity.valueMissing) {
		$("#postal-code-error").text("郵便番号は必ず入力してください").addClass("active");
		return false;
	} else if (postalCode.validity.patternMismatch) {
		$("#postal-code-error").text("郵便番号は正しい形式で入力してください").addClass("active");
		return false;
	} else {
		$("#postal-code-error").text("郵便番号は正しい形式で入力してください").addClass("active");
		return false;
	}
};
const validateAddress = () => {
	if (address.validity.valid) {
		$("#address-error").text("").removeClass("active");
		return true;
	} else if (address.validity.valueMissing) {
		$("#address-error").text("住所は必ず入力してください").addClass("active");
		return false;
	} else if (address.validity.tooLong) {
		$("#address-error").text("住所は200文字以内で入力してください").addClass("active");
		return false;
	} else {
		$("#address-error").text("住所は正しく入力してください").addClass("active");
		return false;
	}
};
const validateTel = () => {
	if (tel.validity.valid) {
		$("#tel-error").text("").removeClass("active");
		return true;
	} else if (tel.validity.patternMismatch) {
		$("#tel-error")
			.text("電話番号は半角数字とハイフン(-)のみで入力してください")
			.addClass("active");
		return false;
	} else {
		$("#tel-error").text("電話番号は正しい形式で入力してください").addClass("active");
		return false;
	}
};
const validateEmail = () => {
	if (email.validity.valid) {
		$("#email-error").text("").removeClass("active");
		return true;
	} else if (email.validity.typeMismatch) {
		$("#email-error").text("有効なメールアドレスを入力してください").addClass("active");
		return false;
	} else if (email.validity.tooLong) {
		$("#email-error").text("メールアドレスは200文字以内で入力してください").addClass("active");
		return false;
	} else {
		$("#email-error").text("メールアドレスは正しい形式で入力してください").addClass("active");
		return false;
	}
};
const validateInqueryType = () => {
	if (inqueryType.validity.valid) {
		$("#inquery-type-error").text("").removeClass("active");
		return true;
	} else {
		$("#inquery-type-error").text("お問い合わせの種類は必ず選択してください").addClass("active");
		return false;
	}
};
const validateInqueryBody = () => {
	if (inqueryBody.validity.valid) {
		$("#inquery-body-error").text("").removeClass("active");
		return true;
	} else if (inqueryBody.validity.valueMissing) {
		$("#inquery-body-error").text("お問い合わせ内容は必ず入力してください").addClass("active");
		return false;
	} else if (inqueryBody.validity.tooLong) {
		$("#inquery-body-error")
			.text("お問い合わせ内容は1000字以内で入力してください")
			.addClass("active");
		return false;
	} else {
		$("#inquery-body-error")
			.text("お問い合わせ内容は正しい形式で入力してください")
			.addClass("active");
		return false;
	}
};
