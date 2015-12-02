import angular from 'angular';
import Directive from './directive';

angular
  .module('TestDirectiveModule', [])
  .directive('Test',
    () => {

      return Directive.new({

        controllerAs: 'my',
        template: '<test></test>',

        // this replaces the normal 'scope'
        // I personally think 'interfaces' is a better word
        interfaces: {
          // public is a special interface that let outsider to peek inside into props and methods freely!
          // like...
          // <test name="abc"></test>
          // $scope.abc.x => 0
          public: '=name',
        },

        // all the properties are here!
        props: {
          x: 0,
          y: 0,
          // element and attrs (from link) are automatically included here as well
          // be advised: link is invoked after the controller, then element and attrs
          // will not be available at the starter() and watcher() time
        },

        // all the $watch code should all be put here!
        // you shall write the watch destroyer here as well
        watcher($scope) {
          $scope.$watch('my.x', (x) => {
            console.log('x has changed! to:', x);
          });
        },

        // this block of code will be invoked first!
        // starter -> watcher; link is invoked normally according to angular's directive
        // if you like to use the scope, it is provided.
        starter($scope) {
          this.moveDiagonal();
        },

        // just the conventional link
        link($scope, element, attrs) {
          element.fadeIn(200);
        },

        // list all the methods
        methods: {

          moveDiagonal() {
            this.x += 10;
            this.y += 10;
          }

        }

      });

    });
