var {verifyAudioFile, getSquareParams, fitToContainer, createGradient, setCtxStyle} = require('../src/index');

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

document.body.innerHTML =
  '<div class="visualizer">' +
    '<canvas id="visualizer"/>' +
  '</div>';

describe("fitToContainer function", () =>
{
    document.body.innerHTML =
      '<div class="visualizer">' +
      '<canvas id="visualizer"/>' +
      '</div>';
    test("sets canvas width to 100%", () => {
        canvas = fitToContainer(document.getElementById('visualizer'))
        expect(canvas.style.width = '100%')
    });

});

describe("createGradient function", () =>
{
    document.body.innerHTML =
      '<div class="visualizer">' +
      '<canvas id="visualizer"/>' +
      '</div>';

    test("sets canvas width to 100%", () => {
        let canvas = document.getElementById('visualizer')
        let ctx = canvas.getContext("2d");
        let gradient = createGradient(ctx, "white", "black", 0, 100)
        expect(gradient.height == 100)
    });

});

describe("setCtxStyle function", () =>
{
    document.body.innerHTML =
      '<div class="visualizer">' +
      '<canvas id="visualizer"/>' +
      '</div>';

    test("sets canvas width to 100%", () => {
        let canvas = document.getElementById('visualizer')
        let ctx = canvas.getContext("2d");
        let gradient = createGradient(ctx, "white", "black", 0, 100)
        let color = "white"
        setCtxStyle(ctx, gradient, color)
        expect(ctx.fillStyle == gradient)
        expect(ctx.strokeStyle == color)
    });

});

