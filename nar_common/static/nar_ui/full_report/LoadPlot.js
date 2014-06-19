var nar = nar || {};
nar.fullReport = nar.fullReport || {};
(function(){
    
    var getXcoord = nar.fullReport.PlotUtils.getXCoord;
    
    /**
     * @param {TimeSeriesVisualization} tsViz
     * returns {jquery.flot}
     */

    nar.fullReport.LoadPlot = function(tsViz){
        var plotContainer = tsViz.plotContainer;
        var splitData = nar.fullReport.PlotUtils.getDataSplitIntoCurrentAndPreviousYears(tsViz);
        var previousYearsData = splitData.previousYearsData;
        var currentYearData = splitData.currentYearData;  
        var miscConstituentInfo = nar.fullReport.PlotUtils.getConstituentNameAndColors(tsViz);
        var constituentName =miscConstituentInfo.name; 
        var previousYearsColor = miscConstituentInfo.colors.previousYears;
        var currentYearColor= miscConstituentInfo.colors.currentYear;
        
        var makeSeriesConfig = function(dataSet, color){
            return {
                label: constituentName,
                data: dataSet,
                bars: {
                    barWidth: 1e10,
                    align: 'center',
                    show: true,
                    fill: true,
                    fillColor: color
                },
              };
        };
        var previousYearsSeries = makeSeriesConfig(previousYearsData, previousYearsColor);
        var currentYearSeries = makeSeriesConfig(currentYearData, currentYearColor); 
        var series = [
          previousYearsSeries,
          currentYearSeries
        ];
        
        var plot = $.plot(plotContainer, series, {
            xaxis: {
                mode: 'time',
                timeformat: "%Y",
                minTickSize: [1, 'year']
            },
            yaxis: {
                axisLabel: constituentName + " load (kg*10^6)",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 10,
                axisLabelFontFamily: "Verdana, Arial, Helvetica, Tahoma, sans-serif",
                axisLabelPadding: 40
            },
            legend: {
                   show: false
            },
            colors:[previousYearsColor, currentYearColor] 
        });
        return plot;
    };    
}());