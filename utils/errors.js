function serverError() {
	return {
		"Error Message": `Could Not Complete The Request`,
		Status: 500,
	};
}

module.exports = { serverError };
