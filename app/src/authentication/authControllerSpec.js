describe('AuthController', function() {
    var scope;
    var controller;
    var httpBackend;

    beforeEach(module('angularStubApp'));

    beforeEach(inject(function($rootScope, $controller, $httpBackend) {
        scope = $rootScope;
        controller = $controller;
        httpBackend = $httpBackend;
    }));

    it('should do something', function() {
    });
})