'use strict';

//=== Testing gpaCtrl =============================================
describe('Testing controller: gpaCtrl', function(){

    // load the controller's module
    beforeEach(module('appModule'));

    var gpaCtrl, scope, check;

    // Initialize the controller and mock scope.
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        gpaCtrl = $controller('gpaCtrl', {
            $scope: scope
        });
        check = 0;
    }));

    it('dummy test should pass', function(){
        expect(true).toEqual(true);
    });

    it('testing variable check', function(){
        expect(check).toEqual(0);
    });

    it('testing return grade value function', function(){
        expect(scope.returnGradeValue("A")).toBe(4.0);
    });

    it('testing return grade value function again', function(){
        expect(scope.returnGradeValue("F")).toBe(0);
    });

    it('testing grade input validation',function(){
        scope.gradeCheck("A");
        expect(check).toBe(0);
    });

    it('testing credit input validation',function(){
        scope.creditCheck(1);
        expect(check).toBe(0);
    });

    it('testing class input validation', function(){
        scope.classCheck("math");
        expect(check).toBe(0);
    });

    it('testing grade input validation fail',function(){
        scope.gradeCheck("4");
        expect(check).toBe(0);
    });

    it('testing credit input validation fail',function(){
        scope.creditCheck("A");
        expect(check).toBe(0);
    });

    it('testing class input validation fail', function(){
        scope.classCheck("");
        expect(check).toBe(0);
    });
});