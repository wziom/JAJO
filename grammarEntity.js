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

        // if proper world in this entity was found, perform optionalPriorEntities
        if (success && this.getNextOptionalPriorEntities().length > 0) {
            console.log(this.getNextOptionalPriorEntities())
            this.getNextOptionalPriorEntities().forEach( function (NextEntityInfo) {
                console.log(NextEntityInfo);
                var validationResult = NextEntityInfo.entity.validateText(textForValidation, matchedEntitiesInfo, NextEntityInfo.entityMeaning);
                if (validationResult.validText.length > 0) {
                    validText += validationResult.validText;
                    textForValidation = textForValidation.replace(validationResult.validText, '').trim();
                }
            })
        }

        // if proper world in this entity was found, perform requiredEntities
        if (success && this.getNextRequiredEntities().length > 0) {
            this.getNextRequiredEntities().forEach( function (NextEntityInfo) {
                var validationResult = NextEntityInfo.entity.validateText(textForValidation, matchedEntitiesInfo, NextEntityInfo.entityMeaning);
                if (validationResult.validText.length > 0) {
                    validText += validationResult.validText;
                    textForValidation = textForValidation.replace(validationResult.validText, '').trim();
                } else {
                    validText += ERROR_TEXT;
                }
            });
        }

        // if proper world in this entity was found, perform requiredEntities
        if (success && this.getNextRequiredUniqueEntities().length > 0) {
            uniqueSuccess = false;
            this.getNextRequiredUniqueEntities().forEach( function (NextEntityInfo) {
                var validationResult = NextEntityInfo.entity.validateText(textForValidation, matchedEntitiesInfo, NextEntityInfo.entityMeaning);
                if (validationResult.validText.length > 0 && !uniqueSuccess) {
                    validText += validationResult.validText;
                    textForValidation = textForValidation.replace(validationResult.validText, '').trim();
                    uniqueSuccess = true;
                }
            });
            if (!uniqueSuccess) {
                validText += ERROR_TEXT;
            }
        }

        // if proper world in this entity was found, perform optionalPosteriorEntities
        if (success && this.getNextOptionalPosteriorEntities().length > 0) {
            this.getNextOptionalPosteriorEntities().forEach( function (NextEntityInfo) {
                var validationResultData = NextEntityInfo.entity.validateText(textForValidation, matchedEntitiesInfo, NextEntityInfo.entityMeaning);
                if (validationResultData.validText.length > 0) {
                    validText += validationResult.validText;
                    textForValidation = textForValidation.replace(validationResult.validText, '').trim();
                }
            })
        }
        return {validText: validText, matchedEntitiesInfo: matchedEntitiesInfo};
    };
};
