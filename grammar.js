/**
 * Created by Ziomek on 19.06.2017.
 */
/*
 G => S
 S => A
 S => ABC
 // A - beginning of sentence
 A => KMRC
 // K - create
 K => k
 K => kZ
 // Z - conjunction
 Z => z
 // M - subject
 M => m
 // R - size
 R => NrN (???)
 // N - size number
 N => n
 // B - sentence follows
 B => bD
 B => EF
 E => e
 F => f
 // C - map description
 C => CC
 */
var Grammar = function () {


    // A-group grammarEntities
    this.F = new GrammarEntity(
        'F',
        [
            "pojawiają się",
            "występują",
            "mogą być",
            "będą",
            "są"
        ],
        [],
        [],
        [],
        []);
    this.E = new GrammarEntity(
        'E',
        [
            "na której"
        ],
        [],
        [],
        [
            {entity: this.F, entityMeaning: ''}
        ],
        []);
    this.D = new GrammarEntity(
        'D',
        [
            "będzie posiadała",
            "będzie miała",
            "posiada",
            "ma"
        ],
        [],
        [],
        [],
        []);
    this.B = new GrammarEntity(
        'B',
        [
            "która"
        ],
        [],
        [
            {entity: this.D, entityMeaning: ''}
        ],
        [],
        []);
    this.R = new GrammarEntity(
        'R',
        [
            "na"
        ],
        [],
        [],
        [],
        []);
    this.N = new GrammarEntity( // sets width and height
        'N',
        [
            100,
            200,
            300,
            400,
            500,
            600,
            700,
            800,
            900,
            1000,
            1100,
            1200
        ],
        [],
        [],
        [],
        []);
    this.M = new GrammarEntity( // create default map
        'M',
        [
            "planszę o wymiarach",
            "mapę o wymiarach",
            "planszę",
            "mapę"
        ],
        [],
        [
            {entity: this.N, entityMeaning: 'width'},
            {entity: this.R, entityMeaning: 'sizeConnector'},
            {entity: this.N, entityMeaning: 'height'}
        ],
        [],
        []);
    this.Z = new GrammarEntity(
        'Z',
        [
            "mi",
            "dla mnie"
        ],
        [],
        [],
        [],
        []);
    this.K = new GrammarEntity(
        'K',
        [
            "Stwórz",
            "Utwórz",
            "Kreuj",
            "Wykreuj",
            "Twórz"
        ],
        [],
        [
            {entity: this.M, entityMeaning: 'create'}
        ],
        [],
        [
            {entity: this.Z, entityMeaning: ''}
        ]);
    this.A = new GrammarEntity(
        'A',
        [],
        [],
        [
            {entity: this.K, entityMeaning: ''}
        ],
        [],
        [
            {entity: this.B, entityMeaning: 'connect'},
            {entity: this.E, entityMeaning: 'compose'}
        ]
    );

    Grammar.prototype.validateText = function (text) {
        text = text.trim().replace(',' , '');
        var matchedEntitiesInfo = [];
        var validateText = this.A.validateText(text, matchedEntitiesInfo, '').validText.trim();
        if (validateText == text) {
            console.log(matchedEntitiesInfo);
            console.log($.grep(matchedEntitiesInfo, function(e){ return e.entityMeaning == 'create'; }));
            console.log($.grep(matchedEntitiesInfo, function(e){ return e.entityMeaning == 'height'; }));
            alert("Poprawnie zwalidowano text");
        } else {
            console.log(1, validateText);
            console.log(2, text);
            alert("Niepoprawne polecenie!")
        }
    };

    // todo: find in assoc array: $.grep(data, function(e){ return e.target == target; })
};
