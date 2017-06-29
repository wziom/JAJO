/**
 * Created by Ziomek on 23.06.2017.
 */
SIZES_COMPARISION_DICTIONARY = {};
SIZES_COMPARISION_DICTIONARY['left'] = 0;
SIZES_COMPARISION_DICTIONARY['up'] = 0;
SIZES_COMPARISION_DICTIONARY['middle'] = 1;
SIZES_COMPARISION_DICTIONARY['right'] = 2;
SIZES_COMPARISION_DICTIONARY['down'] = 2;

var CodeBuilder = function () {

    CodeBuilder.prototype.getMapMatrix = function (matchedEntitiesInfo) {
        var mapMatrix = [];
        var mapHeight = 400;
        var mapWidth = 400;

        // platformsMapPlacementArray
        generatePlatformsMapPlacementArray();

        // columnsMapPlacementArray
        generateColumnsMapPlacementArray();

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
                    } else if (isPlatformDefined(width, height, 0, 0)) {
                        row.push(getPlatformTileNumber(width, 0, 0));
                    } else if (isPlatformDefined(width, height, 0, 1)) {
                        row.push(getPlatformTileNumber(width, 0, 1));
                    } else if (isPlatformDefined(width, height, 0, 2)) {
                        row.push(getPlatformTileNumber(width, 0, 2));
                    } else if (isPlatformDefined(width, height, 1, 0)) {
                        row.push(getPlatformTileNumber(width, 1, 0));
                    } else if (isPlatformDefined(width, height, 1, 1)) {
                        row.push(getPlatformTileNumber(width, 1, 1));
                    } else if (isPlatformDefined(width, height, 1, 2)) {
                        row.push(getPlatformTileNumber(width, 1, 2));
                    } else if (isPlatformDefined(width, height, 2, 0)) {
                        row.push(getPlatformTileNumber(width, 2, 0));
                    } else if (isPlatformDefined(width, height, 2, 1)) {
                        row.push(getPlatformTileNumber(width, 2, 1));
                    } else if (isPlatformDefined(width, height, 2, 2)) {
                        row.push(getPlatformTileNumber(width, 2, 2));
                    } else if (isColumnDefined(width, height, 0, 0)) {
                        row.push(getColumnTileNumber(height, 0, 0));
                    } else if (isColumnDefined(width, height, 0, 1)) {
                        row.push(getColumnTileNumber(height, 0, 1));
                    } else if (isColumnDefined(width, height, 0, 2)) {
                        row.push(getColumnTileNumber(height, 0, 2));
                    } else if (isColumnDefined(width, height, 1, 0)) {
                        row.push(getColumnTileNumber(height, 1, 0));
                    } else if (isColumnDefined(width, height, 1, 1)) {
                        row.push(getColumnTileNumber(height, 1, 1));
                    } else if (isColumnDefined(width, height, 1, 2)) {
                        row.push(getColumnTileNumber(height, 1, 2));
                    } else if (isColumnDefined(width, height, 2, 0)) {
                        row.push(getColumnTileNumber(height, 2, 0));
                    } else if (isColumnDefined(width, height, 2, 1)) {
                        row.push(getColumnTileNumber(height, 2, 1));
                    } else if (isColumnDefined(width, height, 2, 2)) {
                        row.push(getColumnTileNumber(height, 2, 2));
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

        function generatePlatformsMapPlacementArray() {
            platformsMapPlacementArray = [];
            platformsMapPlacementArray[0] = [];
            platformsMapPlacementArray[1] = [];
            platformsMapPlacementArray[2] = [];
            platformsMapPlacementArray[0][0] = {elementType: 'no element', elementLength: 'no element'};
            platformsMapPlacementArray[0][1] = {elementType: 'no element', elementLength: 'no element'};
            platformsMapPlacementArray[0][2] = {elementType: 'no element', elementLength: 'no element'};
            platformsMapPlacementArray[1][0] = {elementType: 'no element', elementLength: 'no element'};
            platformsMapPlacementArray[1][1] = {elementType: 'no element', elementLength: 'no element'};
            platformsMapPlacementArray[1][2] = {elementType: 'no element', elementLength: 'no element'};
            platformsMapPlacementArray[2][0] = {elementType: 'no element', elementLength: 'no element'};
            platformsMapPlacementArray[2][1] = {elementType: 'no element', elementLength: 'no element'};
            platformsMapPlacementArray[2][2] = {elementType: 'no element', elementLength: 'no element'};

            platformsArray = [];
            matchedEntitiesInfo.forEach(function (element) {
                if (element.entityMeaning.indexOf("element") >= 0) {
                    if (typeof platformsArray[element.mapsElementNumber] == 'undefined') {
                        platformsArray[element.mapsElementNumber] = [];
                    }
                    platformsArray[element.mapsElementNumber][element.entityMeaning] = element.entityValue;
                }
            });
            platformsArray.forEach(function (data, key) {
                if (data.elementType == 'platform') {
                    platformsMapPlacementArray[SIZES_COMPARISION_DICTIONARY[data.elementVerticalPlacement]][SIZES_COMPARISION_DICTIONARY[data.elementHorizontalPlacement]]
                        = {elementType: data.elementType, elementLength: data.elementSize}
                }
            });
        }

        function generateColumnsMapPlacementArray() {
            columnsMapPlacementArray = [];
            columnsMapPlacementArray[0] = [];
            columnsMapPlacementArray[1] = [];
            columnsMapPlacementArray[2] = [];
            columnsMapPlacementArray[0][0] = {elementType: 'no element', elementLength: 'no element'};
            columnsMapPlacementArray[0][1] = {elementType: 'no element', elementLength: 'no element'};
            columnsMapPlacementArray[0][2] = {elementType: 'no element', elementLength: 'no element'};
            columnsMapPlacementArray[1][0] = {elementType: 'no element', elementLength: 'no element'};
            columnsMapPlacementArray[1][1] = {elementType: 'no element', elementLength: 'no element'};
            columnsMapPlacementArray[1][2] = {elementType: 'no element', elementLength: 'no element'};
            columnsMapPlacementArray[2][0] = {elementType: 'no element', elementLength: 'no element'};
            columnsMapPlacementArray[2][1] = {elementType: 'no element', elementLength: 'no element'};
            columnsMapPlacementArray[2][2] = {elementType: 'no element', elementLength: 'no element'};

            columnsArray = [];
            matchedEntitiesInfo.forEach(function (element) {
                if (element.entityMeaning.indexOf("element") >= 0) {
                    if (typeof columnsArray[element.mapsElementNumber] == 'undefined') {
                        columnsArray[element.mapsElementNumber] = [];
                    }
                    columnsArray[element.mapsElementNumber][element.entityMeaning] = element.entityValue;
                }
            });
            columnsArray.forEach(function (data, key) {
                if (data.elementType == 'column') {
                    columnsMapPlacementArray[SIZES_COMPARISION_DICTIONARY[data.elementVerticalPlacement]][SIZES_COMPARISION_DICTIONARY[data.elementHorizontalPlacement]]
                        = {elementType: data.elementType, elementLength: data.elementSize}
                }
            });
        }

        /**
         * @param width
         * @param height
         * @param rowNumber int 0, 1 or 2
         * @param columnNumber int 0, 1 or 2
         * @returns {boolean}
         */
        function isPlatformDefined(width, height, rowNumber, columnNumber) {
            var platformHeight = mapHeight/5;
            switch (rowNumber) {
                case 0:
                    platformHeight = mapHeight/5;
                    break;
                case 1:
                    platformHeight = mapHeight/2;
                    break;
                case 2:
                    platformHeight = 4*mapHeight/5;
                    break;
            }
            return height == Math.round(platformHeight) &&
                platformsMapPlacementArray[rowNumber][columnNumber].elementType == 'platform'  &&
                width > columnNumber * (mapWidth/3) &&
                width < (columnNumber + 1) * mapWidth/3
        };

        /**
         * @param width
         * @param height
         * @param rowNumber int 0, 1 or 2
         * @param columnNumber int 0, 1 or 2
         * @returns {boolean}
         */
        function isColumnDefined(width, height, rowNumber, columnNumber) {
            var columnWidth = mapWidth/5;
            switch (columnNumber) {
                case 0:
                    columnWidth = mapWidth/5;
                    break;
                case 1:
                    columnWidth = mapWidth/2;
                    break;
                case 2:
                    columnWidth = 4*mapWidth/5;
                    break;
            }
            return width == Math.round(columnWidth) &&
                columnsMapPlacementArray[rowNumber][columnNumber].elementType == 'column'  &&
                height > rowNumber * (mapHeight/3) &&
                height < (rowNumber + 1) * mapHeight/3
        };

        function getPlatformTileNumber(width, rowNumber, columnNumber) {
            var longMinLimit = columnNumber * (mapWidth/3);
            var longMaxLimit = (columnNumber + 1) * mapWidth/3;
            var mediumMinLimit = columnNumber * (mapWidth/3) + mapWidth/18;
            var mediumMaxLimit = columnNumber * (mapWidth/3) + 5 * mapWidth/18;
            var shortMinLimit = columnNumber * (mapWidth/3) + mapWidth/9;
            var shortMaxLimit = columnNumber * (mapWidth/3) + 2 * mapWidth/9;
            if (platformsMapPlacementArray[rowNumber][columnNumber].elementLength == 'long' && width > longMinLimit && width < longMaxLimit) {
                return 2;
            }
            else if (platformsMapPlacementArray[rowNumber][columnNumber].elementLength == 'medium' && width > mediumMinLimit && width < mediumMaxLimit) {
                return 2;
            }
            else if (platformsMapPlacementArray[rowNumber][columnNumber].elementLength == 'short' && width > shortMinLimit && width < shortMaxLimit) {
                return 2;
            }
            else {
                return 1;
            }
        };

        function getColumnTileNumber(height, rowNumber, columnNumber) {
            var longMinLimit = rowNumber * (mapHeight/3);
            var longMaxLimit = (rowNumber + 1) * mapHeight/3;
            var mediumMinLimit = rowNumber * (mapHeight/3) + mapHeight/18;
            var mediumMaxLimit = rowNumber * (mapHeight/3) + 5 * mapHeight/18;
            var shortMinLimit = rowNumber * (mapHeight/3) + mapHeight/9;
            var shortMaxLimit = rowNumber * (mapHeight/3) + 2 * mapHeight/9;
            if (columnsMapPlacementArray[rowNumber][columnNumber].elementLength == 'long' && height > longMinLimit && height < longMaxLimit) {
                return 2;
            }
            else if (columnsMapPlacementArray[rowNumber][columnNumber].elementLength == 'medium' && height > mediumMinLimit && height < mediumMaxLimit) {
                return 2;
            }
            else if (columnsMapPlacementArray[rowNumber][columnNumber].elementLength == 'short' && height > shortMinLimit && height < shortMaxLimit) {
                return 2;
            }
            else {
                return 1;
            }
        }
    }
}