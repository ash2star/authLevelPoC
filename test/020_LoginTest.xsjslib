var Login = $.import("de.linuxdozent.gittest.test.lib", "Login");

describe("Login Users", function() {

	it("should detect that there is no session active", function() {
		Login.checkSession();
	});

	it("should get CSRF token", function() {
		var sCSRFtoken = Login.getCSRFtoken();
		expect(sCSRFtoken).toBe('unsafe');
	});

});