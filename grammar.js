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
        [
            "pojawiają się",
            "występują",
            "mogą być",
            "będą",
            "są"
        ],
        []);
    this.E = new GrammarEntity(
        [
            "na której"
        ], [
            this.F
        ]);
    this.D = new GrammarEntity(
        [
            "będzie posiadała",
            "będzie miała",
            "posiada",
            "ma"
        ],
        []);
    this.B = new GrammarEntity(
        [
            "która"
        ],
        [
            this.D
        ]);
    this.R = new GrammarEntity(
        [
            "na"
        ],
        [
            this.B,
            this.E
        ]);
    // this.N = new GrammarEntity(
    //     [
    //         100,
    //         200,
    //         300,
    //         400,
    //         500,
    //         600,
    //         700,
    //         800,
    //         900,
    //         1000,
    //         1100,
    //         1200
    //     ],
    //     []);
    this.M = new GrammarEntity(
        [
            "planszę o wymiarach",
            "mapę o wymiarach",
            "planszę",
            "mapę"
        ],
        [
            this.R
        ]);
    this.Z = new GrammarEntity(
        [
            "mi",
            "dla mnie"
        ],
        [
            this.M
        ]);
    this.K = new GrammarEntity(
        [
            "Stwórz",
            "Utwórz",
            "Kreuj",
            "Twórz"
        ],
        [
            this.Z,
            this.M
        ]);

    Grammar.prototype.validateText = function (text) {
        console.log(this.K.validateText(text))
    };


    // console.log(this);
};
