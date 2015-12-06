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

      // PieChart. FailChart.
      //
      // $scope.options = {
      //     chart: {
      //         type: 'pieChart',
      //         x: function (d) {
      //             return d.label;
      //         },
      //         y: function (d) {
      //             return d.value;
      //         },
      //         showLabels: true
      //     }
      // };
      // $scope.data = [{"label": "need", "value" : 1928},
      //      {"label": "people", "value" : 1404},
      //      {"label": "community", "value" : 1349},
      //      {"label": "many", "value" : 1130},
      //      {"label": "food", "value" : 1117},
      //      {"label": "inhabitants", "value" : 720},
      //      {"label": "water", "value" : 698},
      //      {"label": "access", "value" : 649},
      //      {"label": "know", "value" : 629},
      //      {"label": "contact", "value" : 612},
      //      {"label": "shelter", "value" : 565},
      //      {"label": "help", "value" : 551},
      //      {"label": "medical", "value" : 520},
      //      {"label": "living", "value" : 497},
      //      {"label": "houses", "value" : 471}];

        $scope.options = {
            chart: {
                type: 'multiBarHorizontalChart',
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
                    return d.total;
                },
                showValues: false,
                showControls: false,
                valueFormat: d3.format('d'),
                transitionDuration: 500,
                xAxis: {
                    axisLabel: $filter('translate')('post.categories'),
                    tickPadding: -10,
                    axisLabelDistance: 0
                },
                yAxis: {
                    axisLabel: $filter('translate')('graph.post_count'),
                    tickFormat: d3.format('d')
                },
                tooltips: true,
                forceY: 0,
                barColor: d3.scale.category20().range()
            }
        };
        $scope.data = [{
            values: [{"label": "need", "total" : 1928},
             {"label": "people", "total" : 1404},
             {"label": "community", "total" : 1349},
             {"label": "many", "total" : 1130},
             {"label": "food", "total" : 1117},
             {"label": "inhabitants", "total" : 720},
             {"label": "water", "total" : 698},
             {"label": "access", "total" : 649},
             {"label": "know", "total" : 629},
             {"label": "contact", "total" : 612},
             {"label": "shelter", "total" : 565},
             {"label": "help", "total" : 551},
             {"label": "medical", "total" : 520},
             {"label": "living", "total" : 497},
             {"label": "houses", "total" : 471}]
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
