var {colors, verifyAudioFile, fitToContainer, createGradient, setCtxStyle, colorPicker, drawVisuals, toggleDiscoMode, selectVisual} = require('../src/index');

describe("verifyAudioFile function", () => {
    test("it can correctly identify mp3 files", () => {
        expect(verifyAudioFile("audio.mp3")).toEqual(true);
    });
    test("it can correctly identify non mp3 files", () => {
        expect(verifyAudioFile("audio.mp4")).toEqual(false);
    });
});

describe("fitToContainer function", () =>
{
    document.body.innerHTML =
      '<div class="visualizer">' +
      '<canvas id="visualizer"/>' +
      '</div>';
    test("sets canvas width to 100%", () => {
        canvas = fitToContainer(document.getElementById('visualizer'))
        expect(canvas.style.width = '100%')
        expect(canvas.style.height = '100%')
    });
});

describe("createGradient function", () =>
{
    document.body.innerHTML =
      '<div class="visualizer">' +
      '<canvas id="visualizer"/>' +
      '</div>';

    test("sets canvas width and height to 100%", () => {
        let canvas = document.getElementById('visualizer')
        let ctx = canvas.getContext("2d");
        let gradient = createGradient(ctx, "white", "black", 0, 100)
        expect(gradient.height === 100)
        expect(gradient.width === 0)
    });
});

describe("setCtxStyle function", () =>
{
    document.body.innerHTML =
      '<div class="visualizer">' +
      '<canvas id="visualizer"/>' +
      '</div>';

    test("sets fille and stroke styles correctly", () => {
        let canvas = document.getElementById('visualizer')
        let ctx = canvas.getContext("2d");
        let gradient = createGradient(ctx, "white", "black", 0, 100)
        let color = "white"
        setCtxStyle(ctx, gradient, color)
        expect(ctx.fillStyle === gradient)
        expect(ctx.strokeStyle === color)
    });

});

describe("colorPicker function", () => {
    test("returns the correct number of colors", () => {
        var randomNum = Math.floor(Math.random() * 10)
        expect(colorPicker(randomNum).length === randomNum);
    });
});

describe("drawVisuals function", () => {
    document.body.innerHTML =
      '<div class="visualizer">' +
      '<canvas id="visualizer"/>' +
      '</div>';

    test("returns the correct rectangle dimensions when in default mode", () => {
        let canvas = document.getElementById('visualizer')
        let ctx = canvas.getContext("2d");
        let mode = "default", x = 10, y = 20, shapeSize = 5;
        expect(drawVisuals(ctx, mode, canvas, x, y, shapeSize)).toEqual([x*shapeSize, canvas.height-2.5*y-5, shapeSize, canvas.height]);
    });

    test("returns the correct line dimensions when in line mode", () => {
        let canvas = document.getElementById('visualizer')
        let ctx = canvas.getContext("2d");
        let mode = "line", x = 10, y = 20, lineWidth = 2, offset = 2;
        expect(drawVisuals(ctx, mode, canvas, x, y, lineWidth, offset)).toEqual([x*(lineWidth*2) + offset, canvas.height / 2 - ((y+2.5)/2)**1.2, x*(lineWidth*2) + offset, canvas.height / 2 + ((y+2.5)/2)**1.2]);
    });

    test("returns null when invalid mode is passed", () => {
        let canvas = document.getElementById('visualizer')
        let ctx = canvas.getContext("2d");
        let mode = "circle";
        expect(drawVisuals(ctx, mode)).toEqual(null);
    })
});

describe("toggleDiscoMode function", () => {
    test("switches the value of discoMode when called", () => {
        expect(toggleDiscoMode()).toEqual(true);
        expect(toggleDiscoMode()).toEqual(false);
    });
});

describe("selectVisual function", () => {
    test("changes the value of drawingMode when called", () => {
        expect(selectVisual("line")).toEqual("line");
        expect(selectVisual("default")).toEqual("default");
    });
});

