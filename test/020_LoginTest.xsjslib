var Login = $.import("de.linuxdozent.gittest.test.lib", "Login");

describe("Login Users", function() {

	it("should detect that there is no session active", function() {
		Login.checkSession();
	});

});