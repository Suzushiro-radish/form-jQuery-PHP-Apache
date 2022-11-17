$(function () {
	$("input").change(function () {
		$(this).next().css("display", "inline");
	});

	$("form").on("submit", function (event) {
		let err = [];

		//氏名のバリデーション
		if (!$("#name").val()) {
			err.push("name");
		}

		console.log(err);
		if (err.length) {
			event.preventDefault();
			$("#name").next().text("Error");
		}
	});
});

// const validateName = function (input) {
// 	err = false;
// 	if
// };
