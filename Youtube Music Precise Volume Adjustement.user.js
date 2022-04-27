// ==UserScript==
// @name         Youtube Music Precise Volume Adjustement
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Allow you to precisely chose your volume on Youtube Music
// @downloadURL  https://github.com/Elgemp4/Youtube-Music-Precise-Volume-Adjustement/raw/main/Youtube%20Music%20Precise%20Volume%20Adjustement.user.js
// @author       Elgem
// @match        https://music.youtube.com/*
// @icon         https://music.youtube.com/img/favicon_144.png
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    createStyle();

    var volumeDiv;
    var volumeBar;
    var input;

    modifyVolumeDiv();

    modifyVolumeBar();

    createVolumeInput();


    function createStyle(){
        var style = document.createElement("style");

        style.innerHTML = 'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {-webkit-appearance: none; margin: 0;}input[type=number] {-moz-appearance:textfield; }';

        document.head.appendChild(style);
    }

    function modifyVolumeDiv(){
        volumeDiv = document.getElementsByClassName("volume-slider style-scope ytmusic-player-bar")[0];
        volumeDiv.setAttribute("style", "width : 150px !important;")
    }

    function modifyVolumeBar(){
        volumeBar = document.getElementsByClassName("volume-slider style-scope ytmusic-player-bar")[0];

        volumeBar.setAttribute("step", "1");

        volumeBar.addEventListener("change", (e) => {modifyVolume(e.target.value)})
    }

    function createVolumeInput(){
        input = document.createElement("INPUT");

        input.setAttribute("value", volumeBar.getAttribute("value"));

        input.innerHTML = volumeBar.getAttribute("step");
        input.setAttribute("name", "VolumeInput");
        input.setAttribute("class", "volumeinput")

        input.setAttribute("type", "number");
        input.setAttribute("min", "0");
        input.setAttribute("max", "100");

        input.setAttribute("style", "width : 25px; background: transparent; color: white; border: solid #808080; border-radius: 10px; text-align: center; padding: 5px;}");


        input.addEventListener("change", (e) => {modifyVolume(e.target.value)});

        volumeDiv.insertBefore(input, volumeDiv.children[0]);
    }

    function modifyVolume(volume){
        volume = Math.max(0, Math.min(100, volume));

        volumeBar.value = volume;
        input.value = volume;
    }
})();

