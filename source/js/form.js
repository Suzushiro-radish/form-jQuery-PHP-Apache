$(function () {
	const name = document.getElementById("name");
	const sex = document.getElementById("male");
	const dateOfBirth = document.getElementById("date-of-birth");
	const postalCode = document.getElementById("postal-code");
	const address = document.getElementById("address");
	const tel = document.getElementById("tel");
	const email = document.getElementById("email");
	const inqueryType = document.getElementById("inquery-type");
	const inqueryBody = document.getElementById("inquery-body");

	const sexList = { 1: "男性", 2: "女性", 9: "その他" };
	const inqueryTypeList = {
		1: "ホームページに関して",
		2: "製品に関して",
		3: "会社に関して",
		4: "その他",
	};

	// 確認画面,完了画面を隠す
	$(".inquery-confirmation").hide();
	$(".completed").hide();

	// 生年月日の制限を設定
	const now = new Date();
	const maxDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
	$("#date-of-birth").attr("max", maxDate);

	$(".inquery-form > form").on("submit", function (event) {
		event.preventDefault();
		const isValid = validateForm();

		if (isValid) {
			showConfirmation();
		} else {
			showForm();
		}
	});

	$("#register-button").click(function (event) {
		event.preventDefault();
		if (!validateForm()) {
			window.alert("入力内容に誤りがあります。");
			showForm();
			return;
		}

		const name = $("#name").val();
		const sex = $('input:radio[name="sex"]:checked').val();
		const DoB = $("#date-of-birth").val();
		const postalCode = $("#postal-code").val();
		const address = $("#address").val();
		const tel = $("#tel").val();
		const email = $("#email").val();
		const inqueryType = $("#inquery-type").val();
		const inqueryBody = $("#inquery-body").val();
		data = {
			name: name,
			sex: sex,
			date_of_birth: DoB,
			postal_code: postalCode,
			address: address,
			tel: tel,
			email: email,
			inquery_type: inqueryType,
			inquery_body: inqueryBody,
		};

		posting = $.post("/register.php", data);
		posting
			.done(function (res) {
				const result = JSON.parse(res);
				if (result.status && result.status === "success") {
					showCompleted();
				} else {
					window.alert("登録に失敗しました");
					showForm();
				}
			})
			.fail(function () {
				window.alert(res);
			});
	});

	$("#correct-btn").click(function (event) {
		event.preventDefault();
		showForm();
	});

	// フォームの検証（個別）
	{
		$("#name").on("change keyup", function (e) {
			e.preventDefault();
			validateName();
		});

		$("#sex").on("change", function (e) {
			e.preventDefault();
			validateSex();
		});

		$("#date-of-birth").on("change keyup", function (e) {
			e.preventDefault();
			validateDoB();
		});

		$("#postal-code").on("change keyup", function (e) {
			e.preventDefault();
			validatePostalCode();
		});

		$("#address").on("change keyup", function (e) {
			e.preventDefault();
			validateAddress();
		});

		$("#tel").on("change keyup", function (e) {
			e.preventDefault();
			validateTel();
		});

		$("#email").on("change keyup", function (e) {
			e.preventDefault();
			validateEmail();
		});

		$("#inquery-type").on("change", function (e) {
			e.preventDefault();
			validateInqueryType();
		});

		$("#inquery-body").on("change keyup", function (e) {
			e.preventDefault();
			validateInqueryBody();
		});
	}

	const validateForm = () => {
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
	};

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

	const showForm = () => {
		$(".inquery-confirmation").hide();
		$(".inquery-form").show();
	};

	const showConfirmation = () => {
		setValOnConfirmation();
		$(".inquery-form").hide();
		$(".inquery-confirmation").show();
	};

	const showCompleted = () => {
		$(".inquery-confirmation").hide();
		$(".completed").show();
	};

	const setValOnConfirmation = () => {
		const name = $("#name").val();
		const sex = $('input:radio[name="sex"]:checked').val();
		const DoB = $("#date-of-birth").val();
		const postalCode = $("#postal-code").val();
		const address = $("#address").val();
		const tel = $("#tel").val();
		const email = $("#email").val();
		const inqueryType = $("#inquery-type").val();
		const inqueryBody = $("#inquery-body").val();
		$("#confirmation-name > span").text(name);
		$("#confirmation-sex > span").text(sexList[sex]);
		$("#confirmation-DoB > span").text(DoB);
		$("#confirmation-postal-code > span").text(postalCode);
		$("#confirmation-address > span").text(address);
		$("#confirmation-tel > span").text(tel);
		$("#confirmation-email > span").text(email);
		$("#confirmation-inquery-type > span").text(`${inqueryType}: ${inqueryTypeList[inqueryType]}`);
		$("#confirmation-inquery-body > span").text(inqueryBody);
	};

	$("#set-sample-button").click(function (e) {
		e.preventDefault();
		setSampleInput();
	});

	const setSampleInput = () => {
		$("#name").val("Daiki");
		$('input:radio[name="sex"]').val(["1"]);
		$("#date-of-birth").val("2000-01-10");
		$("#postal-code").val("123-4567");
		$("#address").val("埼玉県北区3丁目15");
		$("#tel").val("09012345678");
		$("#email").val("example@example.com");
		$("#inquery-type").val(1);
		$("#inquery-body").val("いつもお世話になっております。");
	};
});
