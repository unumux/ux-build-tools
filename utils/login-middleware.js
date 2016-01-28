var request = require("request");

module.exports = function(user, pass) {
    return function(req, res, next) {
        var setHeader = res.setHeader;
        res.setHeader = function() {
            if (arguments[0] === "location" && arguments[1].match(/.*\/MemberServices\/Login.*/)) {
                var location = arguments[1];
                var writeHead = res.writeHead;
                var end = res.end;

                res.writeHead = function() {};

                res.write = function() {};

                res.end = function() {};
                request.post(location, {
                    form: {
                        LoginId: user,
                        Password: pass,
                        RememberMe: true
                    }
                }, function(err, loginRes) {
                    var cookies = loginRes.headers["set-cookie"];
                    if (cookies.length > 0) {
                        cookies.forEach(function(cookie) {
                            cookies.push(cookie.replace("domain=.localhost.com", "domain="));
                        });
                    }

                    loginRes.headers.location = "http://" + req.headers.host + req.url;
                    writeHead(301, loginRes.headers);
                    end(loginRes.body);
                });
            } else {
                setHeader.apply(this, arguments);
            }

        };

        next();
    };
};
