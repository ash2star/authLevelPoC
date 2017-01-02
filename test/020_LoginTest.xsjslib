var Login = $.import("de.linuxdozent.gittest.test.lib", "Login");

describe("Login Users", function() {

	it("should detect that there is no session active", function() {
		Login.checkSession();
	});

	it("should get CSRF token", function() {
		var sCSRFtoken = Login.getCSRFtoken();
		expect(sCSRFtoken).toBe('unsafe');
	});

    it("should login users and change password", function() {
        var users = [
                "BSCUSTOMER",
                "BSADMIN"
            ];
        var initpwd  = "Init1234";
        for (var user in users){
            if(user) {
                Login.checkSession();
                var csrfToken = Login.getCSRFtoken();
                expect(csrfToken).toBe("unsafe");
                var loginResult = Login.login(users[user], initpwd, csrfToken);
                expect(loginResult.body.pwdChange).toBe(true);
                csrfToken = Login.getCSRFtoken(loginResult.cookies);
                Login.changePassword(users[user], initpwd, Login.newpwd, csrfToken, loginResult.cookies);
                Login.logout(csrfToken, loginResult.cookies);
            }
        }
    });
});