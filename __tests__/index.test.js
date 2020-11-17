var {verifyAudioFile, getSquareParams} = require('../src/index');

describe("verifyAudioFile function", () => {
    test("it can correctly identify mp3 files", () => {
        expect(verifyAudioFile("audio.mp3")).toEqual(true);
    });
    test("it can correctly identify non mp3 files", () => {
        expect(verifyAudioFile("audio.mp4")).toEqual(false);
    });
});

describe("getSquareParams function", () => {
    test("it can correctly calculate square parameters", () => {
        expect(getSquareParams(0, 0, 250)).toEqual([0,0,250,250]);
    });
    test("it returns null with incorrect origin coordinates", () => {
        expect(getSquareParams(-10, 0, 250)).toEqual(null);
    });
    test("it returns null with incorrect size input", () => {
        expect(getSquareParams(0, 0, 0)).toEqual(null);
    });
});

