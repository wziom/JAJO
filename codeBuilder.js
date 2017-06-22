/**
 * Created by Ziomek on 23.06.2017.
 */

var CodeBuilder = function () {

    CodeBuilder.prototype.getMapMatrix = function (matchedEntitiesInfo) {
        var mapMatrix = [];
        var mapHeight = 400;
        var mapWidth = 400;
        if (getElementFromMatchedEntitiesObject("create", matchedEntitiesInfo)){
            var heightObj = getElementFromMatchedEntitiesObject("height", matchedEntitiesInfo);
            if (heightObj) {
                mapHeight = heightObj.entityValue;
            }
            var widthObj = getElementFromMatchedEntitiesObject("width", matchedEntitiesInfo);
            if (widthObj) {
                mapWidth = widthObj.entityValue;
            }

            for (var height = 0; height < mapHeight; height++) {
                var row = [];
                for (var width = 0; width < mapWidth; width++) {
                    // make the frame
                    if (height == 0 || width == 0 || height == mapHeight -1 || width == mapWidth -1) {
                        row.push(2);
                    // } else if (height == 10 && (width > 2 && width < 6)) {
                    //     row.push(2);
                    } else {
                        row.push(1);
                    }
                }
                mapMatrix.push(row);
            }
        }

        return {mapMatrix: mapMatrix, height: mapHeight, width: mapWidth};

        function getElementFromMatchedEntitiesObject(elementName, matchedEntities) {
            var greppedArray = $.grep(matchedEntities, function(e){ return e.entityMeaning == elementName; });
            return greppedArray[0];
        }
    }
}