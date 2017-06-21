/**
 * Created by Ziomek on 19.06.2017.
 */
var GrammarEntity = function (entityName, wordsArray, nextRequiredEntities, nextOptionalPriorEntities, nextOptionalPosteriorEntities) {
    this.entityName = entityName;
    this.words = wordsArray;
    this.nextRequiredEntities = nextRequiredEntities;
    this.nextOptionalPriorEntities = nextOptionalPriorEntities;
    this.nextOptionalPosteriorEntities = nextOptionalPosteriorEntities;

    GrammarEntity.prototype.getWords = function() {
        return this.words;
    };

    GrammarEntity.prototype.getNextRequiredEntities = function () {
        return this.nextRequiredEntities;
    };

    GrammarEntity.prototype.getNextOptionalPriorEntities = function () {
        return this.nextOptionalPriorEntities;
    };

    GrammarEntity.prototype.getNextOptionalPosteriorEntities = function () {
        return this.nextOptionalPosteriorEntities;
    };

    GrammarEntity.prototype.validateText = function(text, counter) {
        counter += 1;
        var validText = "";

        textForValidation = text.trim().replace(',', '');
        var success = false;

        // for each "word" in entity check if textForValidation starts with "word".
        this.getWords().forEach( function (word) {
            if(textForValidation.match("^"+word)) {
                validText += word + " ";
                textForValidation = textForValidation.replace(word, '').trim();
                success = true;
                return false;
            }
            return true;
        });

        // if proper world in this entity was found, perform optionalPriorEntities
        if (success && this.getNextOptionalPriorEntities().length > 0) {
            this.getNextOptionalPriorEntities().forEach( function (NextEntity) {
                var wordValidated = NextEntity.validateText(textForValidation, counter);
                if (wordValidated.length > 0) {
                    validText += wordValidated;
                    textForValidation = textForValidation.replace(wordValidated, '').trim();
                }
            })
        }

        // if proper world in this entity was found, perform requiredEntities
        if (success && this.getNextRequiredEntities().length > 0) {
            this.getNextRequiredEntities().forEach( function (NextEntity) {
                var wordValidated = NextEntity.validateText(textForValidation, counter);
                if (wordValidated.length > 0) {
                    validText += wordValidated;
                    textForValidation = textForValidation.replace(wordValidated, '').trim();
                } else {
                    validText += '!@#$%^&*()';
                }
            });
        }

        // if proper world in this entity was found, perform optionalPosteriorEntities
        if (success && this.getNextOptionalPosteriorEntities().length > 0) {
            this.getNextOptionalPosteriorEntities().forEach( function (NextEntity) {
                var wordValidated = NextEntity.validateText(textForValidation, counter);
                if (wordValidated.length > 0) {
                    validText += wordValidated;
                    textForValidation = textForValidation.replace(wordValidated, '').trim();
                }
            })
        }
        return validText;
    };
};
