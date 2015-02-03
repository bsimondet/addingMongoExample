'use strict';

    //=== Testing mainCtrl =============================================
        describe('Testing controller: mainCtrl', function(){

                   // load the controller's module
                        beforeEach(module('appModule'));

                    var mainCtrl, scope;

                    // Initialize the controller and mock scope.
                        beforeEach(inject(function($controller, $rootScope) {
                                scope = $rootScope.$new();
                                mainCtrl = $controller('mainCtrl', {
                                        $scope: scope
                                });
                }));

        it('dummy test should pass', function(){
                expect(true).toEqual(true);
            });

    });