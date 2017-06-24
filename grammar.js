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
 B => DE
 B => FG
 E => e
 D => d
 F => f
 G => G
 // C - map description
 // C => Krotką platformę na środku u góry
 C => HI
 C => HIC
 C => HIJL
 C => HIJLC
 // H - element size
 H => h
 // I - element type
 I => i
 // J - element horizontal placement
 J => j
 // L - element vertical placement
 L => l
 */
CORRECT_VALIDATION_TEXT = "Poprawnie zwalidowano text";
INCORRECT_VALIDATION_TEXT = "Niepoprawne polecenie!";

var Grammar = function () {


    // C-group grammarEntities
    this.L = new GrammarEntity(
        'L',
        [
            {wordText: 'u góry', wordMeaning: 'up'},
            {wordText: 'na środku', wordMeaning: 'middle'},
            {wordText: 'na dole', wordMeaning: 'down'}
        ], [], [], [], [], []
    );
    this.J = new GrammarEntity(
        'J',
        [
            {wordText: 'po lewej', wordMeaning: 'left'},
            {wordText: 'na środku', wordMeaning: 'middle'},
            {wordText: 'po prawej', wordMeaning: 'right'}
        ], [],
        [
            {entity: this.L, entityMeaning: 'elementVerticalPlacement'}
        ], [], [], []
    );
    this.I = new GrammarEntity(
        'I',
        [
            {wordText: 'platformę', wordMeaning: 'platform'},
            {wordText: 'kładkę', wordMeaning: 'platform'},
            {wordText: 'ścianę', wordMeaning: 'wall'}
        ], [], [], [],
        [
            {entity: this.J, entityMeaning: 'elementHorizontalPlacement'}
        ], []
    );
    this.H = new GrammarEntity(
        'H',
        [
            {wordText: 'krótką', wordMeaning: 'short'},
            {wordText: 'długą', wordMeaning: 'long'},
            {wordText: 'średnią', wordMeaning: 'medium'},
            {wordText: 'małą', wordMeaning: 'short'},
            {wordText: 'dużą', wordMeaning: 'long'}
        ], [],
        [
            {entity: this.I, entityMeaning: 'elementType'}
        ], [], [], []
    );
    this.C = new GrammarEntity(
        'C', [], [],
        [
            {entity: this.H, entityMeaning: 'elementSize'}
        ], [], [], []);
    this.L.addNextOptionalPosteriorEntity({entity: this.C, entityMeaning: 'elementDescription'});
    // B-group grammarEntities
    this.G = new GrammarEntity(
        'G',
        [
            {wordText: "pojawiają się"},
            {wordText: "znajduje się"},
            {wordText: "pojawi się"},
            {wordText: "występują"},
            {wordText: "wystąpią"},
            {wordText: "wystąpi"},
            {wordText: "będzie"},
            {wordText: "będą"},
            {wordText: "jest"},
            {wordText: "są"}
        ], [],
        [
            {entity: this.C, entityMeaning: 'elementDescription'}
        ], [], [], []);
    this.F = new GrammarEntity(
        'F',
        [
            {wordText: "na której"}
        ], [],
        [
            {entity: this.G, entityMeaning: ''}
        ], [], [], []);
    this.E = new GrammarEntity(
        'E',
        [
            {wordText: "będzie posiadała"},
            {wordText: "będzie miała"},
            {wordText: "posiada"},
            {wordText: "ma"}
        ], [],
        [
            {entity: this.C, entityMeaning: 'elementDescription'}
        ], [], [], []);
    this.D = new GrammarEntity(
        'D',
        [
            {wordText: "która"}
        ], [],
        [
            {entity: this.E, entityMeaning: ''}
        ],
        [], [], []);
    this.B = new GrammarEntity(
        'B', [], [], [],
        [
            {entity: this.F, entityMeaning: 'compose'},
            {entity: this.D, entityMeaning: 'compose'}
        ], [], []
    );
    // A-group grammarEntities
    this.R = new GrammarEntity(
        'R',
        [
            {wordText: "na"}
        ], [], [], [], [], []);
    this.N = new GrammarEntity( // sets width and height
        'N',
        [
            {wordText: '10'},
            {wordText: '20'},
            {wordText: '30'},
            {wordText: '40'},
            {wordText: '50'},
            {wordText: '60'},
            {wordText: '70'},
            {wordText: '80'},
            {wordText: '90'},
            {wordText: '100'}
        ], [], [], [], [], []);
    this.M = new GrammarEntity( // create default map
        'M',
        [
            {wordText: "planszę o wymiarach"},
            {wordText: "mapę o wymiarach"},
            {wordText: "planszę"},
            {wordText: "mapę"}
        ], [],
        [
            {entity: this.N, entityMeaning: 'width'},
            {entity: this.R, entityMeaning: 'sizeConnector'},
            {entity: this.N, entityMeaning: 'height'}
        ], [],
        [
        ], []);
    this.Z = new GrammarEntity(
        'Z',
        [
            {wordText: "mi"},
            {wordText: "dla mnie"}
        ], [], [], [], [], []);
    this.K = new GrammarEntity(
        'K',
        [
            {wordText: "Stwórz"},
            {wordText: "Utwórz"},
            {wordText: "Kreuj"},
            {wordText: "Wykreuj"},
            {wordText: "Twórz"}
        ],
        [
            {entity: this.Z, entityMeaning: ''}
        ],
        [
            {entity: this.M, entityMeaning: 'create'}
        ], [],
        [
            {entity: this.B, entityMeaning: 'connector'}
        ], []);
    this.A = new GrammarEntity(
        'A', [], [],
        [
            {entity: this.K, entityMeaning: ''}
        ], [], [], []
    );

    Grammar.prototype.validateText = function (text) {
        sessionStorage.textForValidation = text = text.trim().replace(/,/g , '').replace(/\n/g, " ");
        sessionStorage.mapsElementsCounter = 0;
        sessionStorage.matchedEntitiesInfo = JSON.stringify([]);
        sessionStorage.validateText = '';
        this.A.validateText('').validText.trim();
        sessionStorage.validateText = sessionStorage.validateText.trim();
        if (sessionStorage.validateText == text) {
            return {error: 0, message: CORRECT_VALIDATION_TEXT, matchedEntitiesInfo: JSON.parse(sessionStorage.matchedEntitiesInfo)};
        } else {
            console.log('validated sentence:', sessionStorage.validateText);
            console.log('user sentence:', text);
            return {error: 1, message: INCORRECT_VALIDATION_TEXT};
        }
    };

    // todo: find in assoc array: $.grep(data, function(e){ return e.target == target; })
};
