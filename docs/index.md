# Welcome to Kaleidosound's documentation!

Kaleidosound is an open source web music visualizer

## badges
[![GitHub](https://img.shields.io/github/license/imanigosserand/kaleidosound)](https://github.com/imanigosserand/Kaleidosound/blob/master/LICENSE) [![GitHub Workflow Status](https://img.shields.io/github/workflow/status/imanigosserand/Kaleidosound/Node.js%20CI)](https://github.com/imanigosserand/Kaleidosound/actions) [![Codecov](https://img.shields.io/codecov/c/github/imanigosserand/Kaleidosound)](https://codecov.io/gh/imanigosserand/Kaleidosound) 
[![Docs](https://img.shields.io/readthedocs/kaleidosound.svg)](https://kaleidosound.readthedocs.io)<br>

### Motivation
I really like music and the arts but I'm not artistically gifted:( I'd like to try using my programming skills to make something cool related to music/art.
Hopefully others will be able to take my work and add their own creative iterations.

### Concept
A web application that allows users to queue music and see music visualizations. Users can also make a group session with friends where they can listen and experience the same music and visual effects.

### Features/Goals
1. Various algorithms for audio-based visual effects.
2. User Interface that allows for
- uploading of audio files/ URLs or synching with music platforms (Spotify/Apple Music/etc)
- the ability to change visual effects
- audio playback controls
- adding multiple users to a session
 3. Creating a server that connects and synchronizes music/visuals for users in an app session.


## User Documentation

### How To Use

**Online** <br>
Click [here](https://imanigosserand.github.io/Kaleidosound/)<br>

**Locally**<br>
1. Download the respository zip or git clone
2. After unzipping or cloning, open index.html file from file manager. This should open up a new tab in your native browser.
3. Click on the 'Choose File' button at the bottom of the screen, and upload any mp3 file.
4. Press the play button to listen to your song with pretty visuals!

## Developer Documentation

### Getting Started
1. Download the respository zip or git clone
2. run `npm install`
3. after making changes, run `browserify src/index.js > bundle.js` so you can see your changes in browser!
4. lint with `npm run lint` and check test coverage with `npm test`

### Code Structure
coming soon
