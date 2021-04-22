$(document).ready(async () => {
	$("#main").hide();

	let response = await axios.get("/currency");
	let data = response.data;
	$("#dollar-value").text(data.usd);
	$("#euro-value").text(data.eur);
	$("#pound-value").text(data.gbp);
	$("#cardano-value").text(data.ada);

	$("#main").show();
	$(".dimmer").removeClass("active");
	$(".dimmer").addClass("disabled");

	$("#dollar-input").on("input", () => {
		let lira = $("#dollar-input").val() * data.usd;
		let euro = lira / data.eur;
		let pound = lira / data.gbp;

		lira = lira.toFixed(2);
		euro = euro.toFixed(2);
		pound = pound.toFixed(2);

		$("#lira-input").val(lira);
		$("#euro-input").val(euro);
		$("#pound-input").val(pound);
	});
	$("#euro-input").on("input", () => {
		let lira = $("#euro-input").val() * data.eur;
		let dollar = lira / data.usd;
		let pound = lira / data.gbp;

		lira = lira.toFixed(2);
		dollar = dollar.toFixed(2);
		pound = pound.toFixed(2);

		$("#lira-input").val(lira);
		$("#dollar-input").val(dollar);
		$("#pound-input").val(pound);
	});
	$("#pound-input").on("input", () => {
		let lira = $("#pound-input").val() * data.gbp;
		let dollar = lira / data.usd;
		let euro = lira / data.eur;

		lira = lira.toFixed(2);
		dollar = dollar.toFixed(2);
		euro = euro.toFixed(2);

		$("#lira-input").val(lira);
		$("#dollar-input").val(dollar);
		$("#euro-input").val(euro);
	});
	$("#lira-input").on("input", () => {
		let pound = $("#lira-input").val() / data.gbp;
		let dollar = $("#lira-input").val() / data.usd;
		let euro = $("#lira-input").val() / data.eur;

		pound = pound.toFixed(2);
		dollar = dollar.toFixed(2);
		euro = euro.toFixed(2);

		$("#pound-input").val(pound);
		$("#dollar-input").val(dollar);
		$("#euro-input").val(euro);
	});
	$("input").on("input", () => {
		if ($("#pound-input").val().length === 0 || $("#euro-input").val().length === 0 || $("#dollar-input").val().length === 0 || $("#lira-input").val().length === 0) {
			$("#pound-input").val("");
			$("#dollar-input").val("");
			$("#euro-input").val("");
			$("#lira-input").val("");
		}
	});
});
