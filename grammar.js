/**
 * Created by Ziomek on 19.06.2017.
 */
/*
 G => S
 S => A
 S => ABC
 // A - beginning of sentence
 A => KMRC
 K => k
 K => kZ
 Z => z
 M => m
 R => NrN
 N => n
 C => BD
 C => EF
 B => b
 D => d
 E => e
 F => f
 // B - sentence follows
 B =>
 */
var Grammar = function () {
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
        []);
    this.E = new GrammarEntity(
        'E',
        [
            "na której"
        ], [
            this.F
        ],
        [],
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
        []);
    this.B = new GrammarEntity(
        'B',
        [
            "która"
        ],
        [
            this.D
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
        []);
    this.N = new GrammarEntity(
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
        []);
    this.M = new GrammarEntity(
        'M',
        [
            "planszę o wymiarach",
            "mapę o wymiarach",
            "planszę",
            "mapę"
        ],
        [
            this.N,
            this.R,
            this.N
        ],
        [],
        [
            this.B,
            this.E
        ]);
    this.Z = new GrammarEntity(
        'Z',
        [
            "mi",
            "dla mnie"
        ],
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
        [
            this.M
        ],
        [
            this.Z
        ],
        []);

    Grammar.prototype.validateText = function (text) {
        text = text.trim().replace(',' , '');
        var counter = 0;
        var validateText = this.K.validateText(text, counter).trim();
        if (validateText == text) {
            alert("Poprawnie zwalidowano text");
        } else {
            console.log(1, validateText);
            console.log(2, text);
            alert("Niepoprawne polecenie!")
        }
    };
};
