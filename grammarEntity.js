/**
 * Created by Ziomek on 19.06.2017.
 */
var GrammarEntity = function (wordsArray, nextEntities) {
    this.words = wordsArray;
    this.nextEntities = nextEntities;

    GrammarEntity.prototype.getWords = function() {
        return this.words;
    };

    GrammarEntity.prototype.getNextEntities = function() {
        return this.nextEntities;
    };

    GrammarEntity.prototype.validateText = function(text) {
        var arrayText = text.split(" ");
        var validText = "";
        var textForValidation = text.trim();

        var success = true;
        this.K.getWords().forEach( function (word) {
            if(textForValidation.match("^"+word)) {
                validText += word + " ";
                textForValidation = textForValidation.replace(word, '').trim();
                success = true;
                return validText;
            }
            success = false;
            return validText;
        });

        if (success && this.K.getNextEntities().length > 0) {
            this.K.getNextEntities().forEach( function (NextEntity) {
                validText += NextEntity.validateText(textForValidation);
            })
        }
        return validText;
    };
};