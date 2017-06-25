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

        // elementsMapPlacementArray
        generateElementsMapPlacementArray();

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
                    } else if (isWallDefined(width, height, 0, 0)) {
                        row.push(getWallTileNumber(height, 0, 0));
                    } else if (isWallDefined(width, height, 0, 1)) {
                        row.push(getWallTileNumber(height, 0, 1));
                    } else if (isWallDefined(width, height, 0, 2)) {
                        row.push(getWallTileNumber(height, 0, 2));
                    } else if (isWallDefined(width, height, 1, 0)) {
                        row.push(getWallTileNumber(height, 1, 0));
                    } else if (isWallDefined(width, height, 1, 1)) {
                        row.push(getWallTileNumber(height, 1, 1));
                    } else if (isWallDefined(width, height, 1, 2)) {
                        row.push(getWallTileNumber(height, 1, 2));
                    } else if (isWallDefined(width, height, 2, 0)) {
                        row.push(getWallTileNumber(height, 2, 0));
                    } else if (isWallDefined(width, height, 2, 1)) {
                        row.push(getWallTileNumber(height, 2, 1));
                    } else if (isWallDefined(width, height, 2, 2)) {
                        row.push(getWallTileNumber(height, 2, 2));
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

        function generateElementsMapPlacementArray() {
            elementsMapPlacementArray = [];
            elementsMapPlacementArray[0] = [];
            elementsMapPlacementArray[1] = [];
            elementsMapPlacementArray[2] = [];
            elementsMapPlacementArray[0][0] = {elementType: 'no element', elementLength: 'no element'};
            elementsMapPlacementArray[0][1] = {elementType: 'no element', elementLength: 'no element'};
            elementsMapPlacementArray[0][2] = {elementType: 'no element', elementLength: 'no element'};
            elementsMapPlacementArray[1][0] = {elementType: 'no element', elementLength: 'no element'};
            elementsMapPlacementArray[1][1] = {elementType: 'no element', elementLength: 'no element'};
            elementsMapPlacementArray[1][2] = {elementType: 'no element', elementLength: 'no element'};
            elementsMapPlacementArray[2][0] = {elementType: 'no element', elementLength: 'no element'};
            elementsMapPlacementArray[2][1] = {elementType: 'no element', elementLength: 'no element'};
            elementsMapPlacementArray[2][2] = {elementType: 'no element', elementLength: 'no element'};

            elementsArray = [];
            matchedEntitiesInfo.forEach(function (element) {
                if (element.entityMeaning.indexOf("element") >= 0) {
                    if (typeof elementsArray[element.mapsElementNumber] == 'undefined') {
                        elementsArray[element.mapsElementNumber] = [];
                    }
                    elementsArray[element.mapsElementNumber][element.entityMeaning] = element.entityValue;
                }
            });
            elementsArray.forEach(function (data, key) {
                elementsMapPlacementArray[SIZES_COMPARISION_DICTIONARY[data.elementVerticalPlacement]][SIZES_COMPARISION_DICTIONARY[data.elementHorizontalPlacement]]
                    = {elementType: data.elementType, elementLength: data.elementSize}
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
                elementsMapPlacementArray[rowNumber][columnNumber].elementType == 'platform'  &&
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
        function isWallDefined(width, height, rowNumber, columnNumber) {
            var wallWidth = mapWidth/5;
            switch (columnNumber) {
                case 0:
                    wallWidth = mapWidth/5;
                    break;
                case 1:
                    wallWidth = mapWidth/2;
                    break;
                case 2:
                    wallWidth = 4*mapWidth/5;
                    break;
            }
            return width == Math.round(wallWidth) &&
                elementsMapPlacementArray[rowNumber][columnNumber].elementType == 'wall'  &&
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
            if (elementsMapPlacementArray[rowNumber][columnNumber].elementLength == 'long' && width > longMinLimit && width < longMaxLimit) {
                return 2;
            }
            else if (elementsMapPlacementArray[rowNumber][columnNumber].elementLength == 'medium' && width > mediumMinLimit && width < mediumMaxLimit) {
                return 2;
            }
            else if (elementsMapPlacementArray[rowNumber][columnNumber].elementLength == 'short' && width > shortMinLimit && width < shortMaxLimit) {
                return 2;
            }
            else {
                return 1;
            }
        };

        function getWallTileNumber(height, rowNumber, columnNumber) {
            var longMinLimit = rowNumber * (mapHeight/3);
            var longMaxLimit = (rowNumber + 1) * mapHeight/3;
            var mediumMinLimit = rowNumber * (mapHeight/3) + mapHeight/18;
            var mediumMaxLimit = rowNumber * (mapHeight/3) + 5 * mapHeight/18;
            var shortMinLimit = rowNumber * (mapHeight/3) + mapHeight/9;
            var shortMaxLimit = rowNumber * (mapHeight/3) + 2 * mapHeight/9;
            if (elementsMapPlacementArray[rowNumber][columnNumber].elementLength == 'long' && height > longMinLimit && height < longMaxLimit) {
                return 2;
            }
            else if (elementsMapPlacementArray[rowNumber][columnNumber].elementLength == 'medium' && height > mediumMinLimit && height < mediumMaxLimit) {
                return 2;
            }
            else if (elementsMapPlacementArray[rowNumber][columnNumber].elementLength == 'short' && height > shortMinLimit && height < shortMaxLimit) {
                return 2;
            }
            else {
                return 1;
            }
        }
    }
}