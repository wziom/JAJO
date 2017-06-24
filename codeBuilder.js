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

            console.log(elementsMapPlacementArray);
            for (var height = 0; height < mapHeight; height++) {
                var row = [];
                for (var width = 0; width < mapWidth; width++) {
                    // make the frame
                    if (height == 0 || width == 0 || height == mapHeight -1 || width == mapWidth -1) {
                        row.push(2);
                    }
                    // build first window platforms
                    else if (height == Math.round(mapHeight/6) &&
                        elementsMapPlacementArray[0][0].elementType == 'platform'  &&
                        width > 0 &&
                        width < mapWidth/3
                    ) {
                        if (elementsMapPlacementArray[0][0].elementLength == 'long' && width > 0 && width < mapWidth/3) {
                            row.push(2);
                        }
                        else if (elementsMapPlacementArray[0][0].elementLength == 'medium' && width > mapWidth/18 && width < 5 * mapWidth/18) {
                            row.push(2);
                        }
                        else if (elementsMapPlacementArray[0][0].elementLength == 'short' && width > mapWidth/9 && width < 2 * mapWidth/9) {
                            row.push(2);
                        }
                        else {
                            row.push(1);
                        }
                    }
                    // build second window platforms
                    else if (height == Math.round(mapHeight/6) &&
                        elementsMapPlacementArray[0][1].elementType == 'platform' &&
                        width > mapWidth/3 &&
                        width < 2*mapWidth/3
                    ) {
                        if (elementsMapPlacementArray[0][1].elementLength == 'long' && width > mapWidth/3 && width < 2 * mapWidth/3) {
                            row.push(2);
                        }
                        else if (elementsMapPlacementArray[0][1].elementLength == 'medium' && width > 7 * mapWidth/18 && width < 11 * mapWidth/18) {
                            row.push(2);
                        }
                        else if (elementsMapPlacementArray[0][1].elementLength == 'short' && width > 4 * mapWidth/9 && width < 5 * mapWidth/9) {
                            row.push(2);
                        }
                        else {
                            row.push(1);
                        }
                    }
                    // build third window platforms
                    else if (height == Math.round(mapHeight/6) &&
                        elementsMapPlacementArray[0][2].elementType == 'platform' &&
                        width > 2 * mapWidth/3 &&
                        width < mapWidth
                    ) {
                        if (elementsMapPlacementArray[0][2].elementLength == 'long' && width > 2 * mapWidth/3 && width < mapWidth) {
                            row.push(2);
                        }
                        else if (elementsMapPlacementArray[0][2].elementLength == 'medium' && width > 13 * mapWidth/18 && width < 17 * mapWidth/18) {
                            row.push(2);
                        }
                        else if (elementsMapPlacementArray[0][2].elementLength == 'short' && width > 7 * mapWidth/9 && width < 8 * mapWidth/9) {
                            row.push(2);
                        }
                        else {
                            row.push(1);
                        }
                    }
                    // build fourth window platforms
                    else if (height == Math.round(mapHeight/2) &&
                        elementsMapPlacementArray[1][0].elementType == 'platform'  &&
                        width > 0 &&
                        width < mapWidth/3
                    ) {
                        if (elementsMapPlacementArray[1][0].elementLength == 'long' && width > 0 && width < mapWidth/3) {
                            row.push(2);
                        }
                        else if (elementsMapPlacementArray[1][0].elementLength == 'medium' && width > mapWidth/18 && width < 5 * mapWidth/18) {
                            row.push(2);
                        }
                        else if (elementsMapPlacementArray[1][0].elementLength == 'short' && width > mapWidth/9 && width < 2 * mapWidth/9) {
                            row.push(2);
                        }
                        else {
                            row.push(1);
                        }
                    }
                    // build fifth window platforms
                    else if (height == Math.round(mapHeight/2) &&
                        elementsMapPlacementArray[1][1].elementType == 'platform' &&
                        width > mapWidth/3 &&
                        width < 2*mapWidth/3
                    ) {
                        if (elementsMapPlacementArray[1][1].elementLength == 'long' && width > mapWidth/3 && width < 2 * mapWidth/3) {
                            row.push(2);
                        }
                        else if (elementsMapPlacementArray[1][1].elementLength == 'medium' && width > 7 * mapWidth/18 && width < 11 * mapWidth/18) {
                            row.push(2);
                        }
                        else if (elementsMapPlacementArray[1][1].elementLength == 'short' && width > 4 * mapWidth/9 && width < 5 * mapWidth/9) {
                            row.push(2);
                        }
                        else {
                            row.push(1);
                        }
                    }
                    // build sixth window platforms
                    else if (height == Math.round(mapHeight/2) &&
                        elementsMapPlacementArray[1][2].elementType == 'platform' &&
                        width > 2 * mapWidth/3 &&
                        width < mapWidth
                    ) {
                        if (elementsMapPlacementArray[1][2].elementLength == 'long' && width > 2 * mapWidth/3 && width < mapWidth) {
                            row.push(2);
                        }
                        else if (elementsMapPlacementArray[1][2].elementLength == 'medium' && width > 13 * mapWidth/18 && width < 17 * mapWidth/18) {
                            row.push(2);
                        }
                        else if (elementsMapPlacementArray[1][2].elementLength == 'short' && width > 7 * mapWidth/9 && width < 8 * mapWidth/9) {
                            row.push(2);
                        }
                        else {
                            row.push(1);
                        }
                    }
                    // build seventh window platforms
                    else if (height == Math.round(5*mapHeight/6) &&
                        elementsMapPlacementArray[2][0].elementType == 'platform'  &&
                        width > 0 &&
                        width < mapWidth/3
                    ) {
                        if (elementsMapPlacementArray[2][0].elementLength == 'long' && width > 0 && width < mapWidth/3) {
                            row.push(2);
                        }
                        else if (elementsMapPlacementArray[2][0].elementLength == 'medium' && width > mapWidth/18 && width < 5 * mapWidth/18) {
                            row.push(2);
                        }
                        else if (elementsMapPlacementArray[2][0].elementLength == 'short' && width > mapWidth/9 && width < 2 * mapWidth/9) {
                            row.push(2);
                        }
                        else {
                            row.push(1);
                        }
                    }
                    // build fifth window platforms
                    else if (height == Math.round(5*mapHeight/6) &&
                        elementsMapPlacementArray[2][1].elementType == 'platform' &&
                        width > mapWidth/3 &&
                        width < 2*mapWidth/3
                    ) {
                        if (elementsMapPlacementArray[2][1].elementLength == 'long' && width > mapWidth/3 && width < 2 * mapWidth/3) {
                            row.push(2);
                        }
                        else if (elementsMapPlacementArray[2][1].elementLength == 'medium' && width > 7 * mapWidth/18 && width < 11 * mapWidth/18) {
                            row.push(2);
                        }
                        else if (elementsMapPlacementArray[2][1].elementLength == 'short' && width > 4 * mapWidth/9 && width < 5 * mapWidth/9) {
                            row.push(2);
                        }
                        else {
                            row.push(1);
                        }
                    }
                    // build sixth window platforms
                    else if (height == Math.round(5*mapHeight/6) &&
                        elementsMapPlacementArray[2][2].elementType == 'platform' &&
                        width > 2 * mapWidth/3 &&
                        width < mapWidth
                    ) {
                        if (elementsMapPlacementArray[2][2].elementLength == 'long' && width > 2 * mapWidth/3 && width < mapWidth) {
                            row.push(2);
                        }
                        else if (elementsMapPlacementArray[2][2].elementLength == 'medium' && width > 13 * mapWidth/18 && width < 17 * mapWidth/18) {
                            row.push(2);
                        }
                        else if (elementsMapPlacementArray[2][2].elementLength == 'short' && width > 7 * mapWidth/9 && width < 8 * mapWidth/9) {
                            row.push(2);
                        }
                        else {
                            row.push(1);
                        }
                    }
                    else {
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
                    console.log(element.mapsElementNumber, element.entityMeaning, element.entityValue);
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

    }
}