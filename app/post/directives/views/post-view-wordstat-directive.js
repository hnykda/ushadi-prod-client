module.exports = [
function (
) {
    var controller = [
        '$scope',
        '$filter',
        'PostEndpoint',
        'd3',
        '_',
    function (
        $scope,
        $filter,
        PostEndpoint,
        d3,
        _
    ) {
        $scope.options = {
            chart: {
                type: 'pieChart',
                height: 450,
                margin: {
                    top: 0,
                    right: 40,
                    bottom: 40,
                    left: 5
                },
                x: function (d) {
                    return d.label;
                },
                y: function (d) {
                    return d.value;
                },
                showLabels: true,
            }
        };

        $scope.data = [{
            values: []
        }];

        $scope.groupByOptions = {
            'tags' : 'post.categories',
            'form' : 'post.type',
            'status' : 'post.status'
        };

        var getPostStats = function (query) {
            query = query || $scope.filters;
            var postQuery = _.extend({}, query, {
                'group_by' : $scope.groupBy
            });

            $scope.isLoading = true;
            PostEndpoint.stats(postQuery).$promise.then(function (results) {
                $scope.options.chart.xAxis.axisLabel = $filter('translate')($scope.groupByOptions[$scope.groupBy]);
                if (results.totals[0]) {
                    results.totals[0].key = $scope.options.chart.yAxis.axisLabel;
                }
                //$scope.data = results.totals;
                $scope.data = [{"label": "need", "value" : 1928},
                 {"label": "people", "value" : 1404},
                 {"label": "community", "value" : 1349},
                 {"label": "many", "value" : 1130},
                 {"label": "food", "value" : 1117},
                 {"label": "inhabitants", "value" : 720},
                 {"label": "water", "value" : 698},
                 {"label": "access", "value" : 649},
                 {"label": "know", "value" : 629},
                 {"label": "contact", "value" : 612},
                 {"label": "shelter", "value" : 565},
                 {"label": "help", "value" : 551},
                 {"label": "medical", "value" : 520},
                 {"label": "living", "value" : 497},
                 {"label": "houses", "value" : 471},
                 {"label": "much", "value" : 466},
                 {"label": "n't", "value" : 456},
                 {"label": "reports", "value" : 451},
                 {"label": "village", "value" : 438},
                 {"label": "tents", "value" : 432},
                 {"label": "Clothes", "value" : 431},
                 {"label": "relief", "value" : 408},
                 {"label": "house", "value" : 399},
                 {"label": "due", "value" : 368},
                 {"label": "report", "value" : 351},
                 {"label": "VDC", "value" : 345},
                 {"label": "assistance", "value" : 341},
                 {"label": "please", "value" : 338},
                 {"label": "cooking", "value" : 336},
                 {"label": "bHow", "value" : 329},
                 {"label": "drinking", "value" : 328},
                 {"label": "available", "value" : 326},
                 {"label": "main", "value" : 326},
                 {"label": "shortage", "value" : 318},
                 {"label": "visited", "value" : 310},
                 {"label": "problems", "value" : 305},
                 {"label": "communities", "value" : 295},
                 {"label": "settlement", "value" : 294},
                 {"label": "nobIs", "value" : 292},
                 {"label": "conflicts", "value" : 290},
                 {"label": "Contact1", "value" : 288},
                 {"label": "Contact2", "value" : 286},
                 {"label": "expecting", "value" : 285},
                 {"label": "continuous", "value" : 285},
                 {"label": "Adult", "value" : 284},
                 {"label": "local", "value" : 283},
                 {"label": "area", "value" : 273},
                 {"label": "needed", "value" : 271},
                 {"label": "materials", "value" : 267},
                 {"label": "blankets", "value" : 263}];
                $scope.isLoading = false;
            });
        };

        // whenever the filters changes, update the current list of posts
        $scope.$watch(function () {
            return $scope.filters;
        }, function (newValue, oldValue) {
            if (newValue !== oldValue) {
                getPostStats();
            }
        });

        // Initial values
        $scope.reload = getPostStats;
        $scope.groupBy = 'tags';

        // Initial load
        getPostStats();
    }];

    return {
        restrict: 'E',
        replace: true,
        scope: {
            filters: '=',
            isLoading: '='
        },
        controller: controller,
        templateUrl: 'templates/views/wordstat.html'
    };
}];
