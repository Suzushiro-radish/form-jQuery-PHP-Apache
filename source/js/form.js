$(function () {
	const name = document.getElementById("name");
	const sex = document.getElementById("male");
	const dateOfBirth = document.getElementById("date-of-birth");
	const postalCode = document.getElementById("postal-code");
	const pref = document.getElementById("pref");
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

	// 確認画面を隠す
	$(".inquery-confirmation").hide();

	// 生年月日の制限を設定
	const now = new Date();
	const maxDate = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
	console.log(maxDate);
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
		const pref = $("#pref").val();
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
			pref: pref,
			address: address,
			tel: tel,
			email: email,
			inquery_type: inqueryType,
			inquery_body: inqueryBody,
		};

		posting = $.post("/register.php", data);
		posting
			.done(function (res) {
				console.log(res);
				window.alert("登録成功");
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
		$("#name").change(function (e) {
			e.preventDefault();
			if (name.validity.valid) {
				$(this).removeClass("invalid").next().text("").removeClass("active");
			} else {
				$(this).addClass("invalid");
			}
		});

		$("#sex").change(function (e) {
			e.preventDefault();
			if (sex.validity.valid) {
				$(this).removeClass("invalid").next().text("").removeClass("active");
			} else {
				$(this).addClass("invalid");
			}
		});

		$("#date-of-birth").change(function (e) {
			e.preventDefault();
			if (dateOfBirth.validity.valid) {
				$(this).removeClass("invalid").next().text("").removeClass("active");
			} else {
				$(this).addClass("invalid");
			}
		});

		$("#postal-code").change(function (e) {
			e.preventDefault();
			if (postalCode.validity.valid) {
				$(this).removeClass("invalid").next().text("").removeClass("active");
			} else {
				$(this).addClass("invalid");
			}
		});

		$("#pref").change(function (e) {
			e.preventDefault();
			if (pref.validity.valid) {
				$(this).removeClass("invalid").next().text("").removeClass("active");
			} else {
				$(this).addClass("invalid");
			}
		});

		$("#tel").change(function (e) {
			e.preventDefault();
			if (tel.validity.valid) {
				$(this).removeClass("invalid").next().text("").removeClass("active");
			} else {
				$(this).addClass("invalid");
			}
		});

		$("#email").change(function (e) {
			e.preventDefault();
			if (email.validity.valid) {
				$(this).removeClass("invalid").next().text("").removeClass("active");
			} else {
				$(this).addClass("invalid");
			}
		});

		$("inquery-type").change(function (e) {
			e.preventDefault();
			if (inqueryType.validity.valid) {
				$(this).removeClass("invalid").next().text("").removeClass("active");
			} else {
				$(this).addClass("inalid");
			}
		});

		$("#inquery-body").change(function (e) {
			e.preventDefault();
			if (inqueryBody.validity.valid) {
				$(this).removeClass("invalid").next().text("").removeClass("active");
			} else {
				$(this).addClass("invalid");
			}
		});
	}

	const showForm = () => {
		$(".inquery-confirmation").hide();
		$(".inquery-form").show();
	};

	const showConfirmation = () => {
		setValOnConfirmation();
		$(".inquery-form").hide();
		$(".inquery-confirmation").show();
	};

	const validateForm = () => {
		let isValid = true;
		//　名前のバリデーション
		if (name.validity.valid) {
			$("#name-error").text("").removeClass("active");
		} else {
			$("#name-error").text("名前は正しく入力してください").addClass("active");
			isValid = false;
		}
		// 性別のバリデーション
		if (sex.validity.valid) {
			$("#sex-error").text("").removeClass("active");
		} else {
			$("#sex-error").text("性別は正しく入力してください").addClass("active");
			isValid = false;
		}
		// 生年月日のバリデーション
		if (dateOfBirth.validity.valid) {
			$("#dob-error").text("").removeClass("active");
		} else {
			$("#dob-error").text("生年月日は正しく入力してください").addClass("active");
			isValid = false;
		}
		// 郵便番号のバリデーション
		if (postalCode.validity.valid) {
			$("#postal-code-error").text("").removeClass("active");
		} else {
			$("#postal-code-error").text("郵便番号は正しく入力してください").addClass("active");
			isValid = false;
		}
		// 都道府県のバリデーション
		if (pref.validity.valid) {
			$("#pref-error").text("").removeClass("active");
		} else {
			$("#pref-error").text("都道府県は正しく入力してください").addClass("active");
			isValid = false;
		}
		// 住所のバリデーション
		if (address.validity.valid) {
			$("#address-error").text("").removeClass("active");
		} else {
			$("#address-error").text("住所は正しく入力してください").addClass("active");
			isValid = false;
		}
		// 電話番号のバリエーション
		if (tel.validity.valid) {
			$("#tel-error").text("").removeClass("active");
		} else {
			$("#tel-error").text("電話番号は正しく入力してください").addClass("active");
			isValid = false;
		}
		// メールアドレスのバリデーション
		if (email.validity.valid) {
			$("#email-error").text("").removeClass("active");
		} else {
			$("#email-error").text("メールアドレスは正しく入力してください").addClass("active");
			isValid = false;
		}
		// お問い合わせの種類のバリデーション
		if (inqueryType.validity.valid) {
			$("#inquery-type-error").text("").removeClass("active");
		} else {
			$("#inquery-type-error")
				.text("お問い合わせの種類は正しく入力してください")
				.addClass("active");
			isValid = false;
		}
		// お問い合わせ本文のバリデーション
		if (inqueryBody.validity.valid) {
			$("#inquery-body-error").text("").removeClass("active");
		} else {
			$("#inquery-body-error").text("お問い合わせ内容は正しく入力してください").addClass("active");
			isValid = false;
		}

		return isValid;
	};

	const setValOnConfirmation = () => {
		const name = $("#name").val();
		const sex = $('input:radio[name="sex"]:checked').val();
		const DoB = $("#date-of-birth").val();
		const postalCode = $("#postal-code").val();
		const pref = $("#pref").val();
		const address = $("#address").val();
		const tel = $("#tel").val();
		const email = $("#email").val();
		const inqueryType = $("#inquery-type").val();
		const inqueryBody = $("#inquery-body").val();
		$("#confirmation-name > span").text(name);
		$("#confirmation-sex > span").text(sexList[sex]);
		$("#confirmation-DoB > span").text(DoB);
		$("#confirmation-postal-code > span").text(postalCode);
		$("#confirmation-address > span").text(`${pref} ${address}`);
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
		$("#pref").val("埼玉県");
		$("#address").val("北区3丁目15");
		$("#tel").val("09012345678");
		$("#email").val("example@example.com");
		$("#inquery-type").val(1);
		$("#inquery-body").val("いつもお世話になっております。");
	};
});
