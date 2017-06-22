/**
 * Created by Ziomek on 19.06.2017.
 */
ERROR_TEXT = 'W TEKSCIE BRAKUJE KLUCZOWEGO ZWROTU!!';

var GrammarEntity = function (entityName, wordsArray, nextOptionalPriorEntities, nextRequiredEntities, nextRequiredUniqueEntities, nextOptionalPosteriorEntities) {
    this.entityName = entityName;
    this.words = wordsArray;
    this.nextOptionalPriorEntities = nextOptionalPriorEntities;
    this.nextRequiredEntities = nextRequiredEntities;
    this.nextRequiredUniqueEntities = nextRequiredUniqueEntities;
    this.nextOptionalPosteriorEntities = nextOptionalPosteriorEntities;

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

    GrammarEntity.prototype.validateText = function(text, matchedEntitiesInfo, entityMeaning) {
        var validText = "";

        textForValidation = text.trim().replace(',', '');
        var success = false;

        validWordsOfThisEntity.call(this);

        // if proper world in this entity was found, perform optionalPriorEntities
        validWordsOfNextOptionalPriorEntities.call(this);

        // if proper world in this entity was found, perform requiredEntities
        validWordsOfNextRequiredEntities.call(this);

        // if proper world in this entity was found, perform requiredEntities
        validWordsOfNextRequiredUniqueEntities.call(this);

        // if proper world in this entity was found, perform optionalPosteriorEntities
        validWordsOfNextOptionalPosteriorEntities.call(this);

        return {validText: validText, matchedEntitiesInfo: matchedEntitiesInfo};


        function validWordsOfThisEntity() {
            if (this.getWords().length > 0) {
                // for each "word" in entity check if textForValidation starts with "word".
                this.getWords().forEach(function (word) {
                    if (textForValidation.match("^" + word)) {
                        validText += word + " ";
                        textForValidation = textForValidation.replace(word, '').trim();
                        matchedEntitiesInfo.push({entityMeaning: entityMeaning, entityValue: word});

                        success = true;
                        return false;
                    }
                    return true;
                });
            } else {
                success = true;
            }
        }

        function validWordsOfNextOptionalPriorEntities() {
            if (success && this.getNextOptionalPriorEntities().length > 0) {
                console.log(this.getNextOptionalPriorEntities())
                this.getNextOptionalPriorEntities().forEach(function (NextEntityInfo) {
                    console.log(NextEntityInfo);
                    var validationResultData = NextEntityInfo.entity.validateText(textForValidation, matchedEntitiesInfo, NextEntityInfo.entityMeaning);
                    if (validationResultData.validText.length > 0) {
                        validText += validationResultData.validText;
                        textForValidation = textForValidation.replace(validationResultData.validText, '').trim();
                    }
                })
            }
        }

        function validWordsOfNextRequiredEntities() {
            if (success && this.getNextRequiredEntities().length > 0) {
                this.getNextRequiredEntities().forEach(function (NextEntityInfo) {
                    var validationResultData = NextEntityInfo.entity.validateText(textForValidation, matchedEntitiesInfo, NextEntityInfo.entityMeaning);
                    if (validationResultData.validText.length > 0) {
                        validText += validationResultData.validText;
                        textForValidation = textForValidation.replace(validationResultData.validText, '').trim();
                    } else {
                        validText += ERROR_TEXT;
                    }
                });
            }
        }

        function validWordsOfNextRequiredUniqueEntities() {
            if (success && this.getNextRequiredUniqueEntities().length > 0) {
                uniqueSuccess = false;
                this.getNextRequiredUniqueEntities().forEach(function (NextEntityInfo) {
                    var validationResultData = NextEntityInfo.entity.validateText(textForValidation, matchedEntitiesInfo, NextEntityInfo.entityMeaning);
                    if (validationResultData.validText.length > 0 && !uniqueSuccess) {
                        validText += validationResultData.validText;
                        textForValidation = textForValidation.replace(validationResultData.validText, '').trim();
                        uniqueSuccess = true;
                    }
                });
                if (!uniqueSuccess) {
                    validText += ERROR_TEXT;
                }
            }
        }

        function validWordsOfNextOptionalPosteriorEntities() {
            if (success && this.getNextOptionalPosteriorEntities().length > 0) {
                this.getNextOptionalPosteriorEntities().forEach(function (NextEntityInfo) {
                    var validationResultData = NextEntityInfo.entity.validateText(textForValidation, matchedEntitiesInfo, NextEntityInfo.entityMeaning);
                    if (validationResultData.validText.length > 0) {
                        validText += validationResultData.validText;
                        textForValidation = textForValidation.replace(validationResultData.validText, '').trim();
                    }
                })
            }
        }
    };
};
