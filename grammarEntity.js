/**
 * Created by Ziomek on 19.06.2017.
 */
ERROR_TEXT = '<br /><em class="text-danger">W TEKSCIE BRAKUJE KLUCZOWEGO ZWROTU!!</em>';

var GrammarEntity = function (
    entityName,
    wordsArray,
    nextOptionalPriorEntities,
    nextRequiredEntities,
    nextRequiredUniqueEntities,
    nextOptionalPosteriorEntities,
    nextOptionalPosteriorUniqueEntities
) {
    this.entityName = entityName;
    this.words = wordsArray;
    this.nextOptionalPriorEntities = nextOptionalPriorEntities;
    this.nextRequiredEntities = nextRequiredEntities;
    this.nextRequiredUniqueEntities = nextRequiredUniqueEntities;
    this.nextOptionalPosteriorEntities = nextOptionalPosteriorEntities;
    this.nextOptionalPosteriorUniqueEntities = nextOptionalPosteriorUniqueEntities;

    GrammarEntity.prototype.getWords = function() {
        return this.words;
    };

    GrammarEntity.prototype.getNextOptionalPriorEntities = function () {
        return this.nextOptionalPriorEntities;
    };

    GrammarEntity.prototype.getNextRequiredEntities = function () {
        return this.nextRequiredEntities;
    };

    GrammarEntity.prototype.getNextRequiredUniqueEntities = function () {
        return this.nextRequiredUniqueEntities;
    };

    GrammarEntity.prototype.getNextOptionalPosteriorEntities = function () {
        return this.nextOptionalPosteriorEntities;
    };

    GrammarEntity.prototype.addNextOptionalPosteriorEntity = function (nextOptionalPosteriorEntity) {
        this.nextOptionalPosteriorEntities.push(nextOptionalPosteriorEntity);
    };

    GrammarEntity.prototype.getNextOptionalPosteriorUniqueEntities = function () {
        return this.nextOptionalPosteriorUniqueEntities;
    };

    GrammarEntity.prototype.validateText = function(entityMeaning) {
        var success = false;
        var validText = '';
        if (sessionStorage.textForValidation.length > 0) {
            success = validWordsOfThisEntity.call(this);
        }
        if ( success ) {

            if (entityMeaning == 'elementDescription') {
                sessionStorage.mapsElementsCounter++;
            }
            // if proper world in this entity was found, perform optionalPriorEntities
            validWordsOfNextOptionalPriorEntities.call(this);

            // if proper world in this entity was found, perform requiredEntities
            validWordsOfNextRequiredEntities.call(this);

            // if proper world in this entity was found, perform requiredEntities
            validWordsOfNextRequiredUniqueEntities.call(this);

            // if proper world in this entity was found, perform optionalPosteriorEntities
            validWordsOfNextOptionalPosteriorUniqueEntities.call(this);

            // if proper world in this entity was found, perform optionalPosteriorEntities
            validWordsOfNextOptionalPosteriorEntities.call(this);
        }
        return {validText: validText, matchedEntitiesInfo: JSON.parse(sessionStorage.matchedEntitiesInfo)};


        function validWordsOfThisEntity() {
            if (this.getWords().length > 0) {
                var innerSuccess = false;
                // for each "word" in entity check if textForValidation starts with "word".
                this.getWords().forEach(function (word) {
                    if (sessionStorage.textForValidation.match("^" + word.wordText) && !innerSuccess) {
                        innerSuccess = true;
                        sessionStorage.validateText += word.wordText + " ";
                        validText += word.wordText + " ";
                        sessionStorage.textForValidation = sessionStorage.textForValidation.substring(word.wordText.length, sessionStorage.textForValidation.length).trim();
                        var matchedEntitiesInfo = JSON.parse(sessionStorage.matchedEntitiesInfo);
                        if (sessionStorage.mapsElementsCounter > 0) {
                            matchedEntitiesInfo.push({entityMeaning: entityMeaning, entityValue: word.wordMeaning, mapsElementNumber: sessionStorage.mapsElementsCounter});
                        } else {
                            matchedEntitiesInfo.push({entityMeaning: entityMeaning, entityValue: word.wordText});
                        }
                        sessionStorage.matchedEntitiesInfo = JSON.stringify(matchedEntitiesInfo);
                        success = true;
                        return success;
                    }
                    return success;
                });
            } else {
                success = true;
                return success;
            }
            return success;
        }

        function validWordsOfNextOptionalPriorEntities() {
            if (success && this.getNextOptionalPriorEntities().length > 0) {
                this.getNextOptionalPriorEntities().forEach(function (NextEntityInfo) {
                    var validationResultData = NextEntityInfo.entity.validateText(NextEntityInfo.entityMeaning);
                    if (validationResultData.validText.length > 0) {
                        validText += validationResultData.validText + " ";
                    }
                })
            }
        }

        function validWordsOfNextRequiredEntities() {
            if (success && this.getNextRequiredEntities().length > 0) {
                this.getNextRequiredEntities().forEach(function (NextEntityInfo) {
                    var validationResultData = NextEntityInfo.entity.validateText(NextEntityInfo.entityMeaning);
                    if (validationResultData.validText.length > 0) {
                        validText += validationResultData.validText;
                    } else {
                        sessionStorage.validateText += ERROR_TEXT;
                    }
                });
            }
        }

        function validWordsOfNextRequiredUniqueEntities() {
            if (success && this.getNextRequiredUniqueEntities().length > 0) {
                var uniqueSuccess = false;
                this.getNextRequiredUniqueEntities().forEach(function (NextEntityInfo) {
                    var validationResultData = NextEntityInfo.entity.validateText(NextEntityInfo.entityMeaning);
                    if (validationResultData.validText.length > 0 && !uniqueSuccess) {
                        validText += validationResultData.validText;
                        uniqueSuccess = true;
                    }
                });
                if (!uniqueSuccess) {
                    sessionStorage.validateText += ERROR_TEXT;
                }
            }
        }

        function validWordsOfNextOptionalPosteriorEntities() {
            if (success && this.getNextOptionalPosteriorEntities().length > 0) {
                this.getNextOptionalPosteriorEntities().forEach(function (NextEntityInfo) {
                    var validationResultData = NextEntityInfo.entity.validateText(NextEntityInfo.entityMeaning);
                    if (validationResultData.validText.length > 0) {
                        validText += validationResultData.validText;
                    }
                })
            }
        }

        function validWordsOfNextOptionalPosteriorUniqueEntities() {
            if (success && this.getNextOptionalPosteriorUniqueEntities().length > 0) {
                 var uniqueSuccess = false;
                this.getNextOptionalPosteriorUniqueEntities().forEach(function (NextEntityInfo) {
                    var validationResultData = NextEntityInfo.entity.validateText(NextEntityInfo.entityMeaning);
                    if (validationResultData.validText.length > 0 && !uniqueSuccess) {
                        validText += validationResultData.validText;
                        uniqueSuccess = true;
                    }
                })
            }
        }
    };
};
