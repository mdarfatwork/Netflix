import React, { useState, useEffect } from "react";
import "./Video.css";

const Video = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  const [selectedSpeed, setSelectedSpeed] = useState(1);
  const [isPiPActive, setIsPiPActive] = useState(false);
  const [showQualityOptions, setShowQualityOptions] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState("480p");

  const togglePlay = () => {
    const videoElement = document.getElementById("video");

    if (isPlaying) {
      videoElement.pause();
    } else {
      videoElement.play();
      setSelectedSpeed(1);
    }

    setIsPlaying(!isPlaying);
  };

  const changeVolume = (e) => {
    const newVolume = parseFloat(e.target.value);
    const videoElement = document.getElementById("video");

    videoElement.volume = newVolume;
    setVolume(newVolume);
  };

  const toggleMute = () => {
    const videoElement = document.getElementById("video");

    if (isMuted) {
      videoElement.muted = false;
      setVolume((prevVolume) => (prevVolume === 0 ? 0.1 : prevVolume));
    } else {
      videoElement.muted = true;
      setVolume(0);
    }

    setIsMuted(!isMuted);
  };

  const skipBackward = () => {
    const videoElement = document.getElementById("video");
    videoElement.currentTime -= 10;
  };

  const skipForward = () => {
    const videoElement = document.getElementById("video");
    videoElement.currentTime += 10;
  };

  useEffect(() => {
    const videoElement = document.getElementById("video");

    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime);
      updateProgress();
    };

    const handleLoadedMetadata = () => {
      setDuration(videoElement.duration);
    };

    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const toggleSpeedOptions = () => {
    setShowSpeedOptions(!showSpeedOptions);
  };

  const handleSpeedOptionClick = (speed) => {
    const videoElement = document.getElementById("video");
    videoElement.playbackRate = speed;
    setSelectedSpeed(speed);
  };

  useEffect(() => {
    const speedOptionItems = document.querySelectorAll(".speed-options li");
    speedOptionItems.forEach((option) => {
      if (option.dataset.speed === selectedSpeed.toString()) {
        option.classList.add("active");
      } else {
        option.classList.remove("active");
      }
    });
  }, [selectedSpeed, showSpeedOptions]);

  const togglePiP = () => {
    const videoElement = document.getElementById("video");

    if (!isPiPActive) {
      if (videoElement !== document.pictureInPictureElement) {
        videoElement.requestPictureInPicture();
        setIsPiPActive(true);
      }
    } else {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
        setIsPiPActive(false);
      }
    }
  };

  useEffect(() => {
    const handlePiPChange = () => {
      setIsPiPActive(document.pictureInPictureElement !== null);
    };

    document.addEventListener("fullscreenchange", handlePiPChange);

    return () => {
      document.removeEventListener("fullscreenchange", handlePiPChange);
    };
  }, []);

  const toggleQualityOptions = () => {
    setShowQualityOptions(!showQualityOptions);
  };

  const handleQualityOptionClick = (quality) => {
    const videoElement = document.getElementById("video");
    const currentTime = videoElement.currentTime;

    setSelectedQuality(quality);

    videoElement.src =
      quality === "480p"
        ? "https://cdn-user.veed.io/render/502d719a-0678-4848-8a6b-696f1e1ddd57.mp4"
        : "https://cdn-user.veed.io/render/680229ae-81e4-43e6-98b4-120274e63f3b.mp4";

    videoElement.load();

    videoElement.onloadedmetadata = () => {
      videoElement.currentTime = currentTime;
      videoElement.play();
    };
  };

  const updateProgress = () => {
    const videoElement = document.getElementById("video");
    const progress = (videoElement.currentTime / videoElement.duration) * 100;
    const progressBar = document.querySelector(".progress-bar");

    progressBar.style.width = `${progress}%`;
  };

  useEffect(() => {
    const videoElement = document.getElementById("video");

    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime);
      updateProgress();
    };

    const handleLoadedMetadata = () => {
      setDuration(videoElement.duration);
    };

    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  const handleProgressBarClick = (event) => {
    const progressBar = event.currentTarget;
    const videoElement = document.getElementById("video");

    const rect = progressBar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const progressBarWidth = rect.width;
    const progress = offsetX / progressBarWidth;

    const newTime = videoElement.duration * progress;
    videoElement.currentTime = newTime;

    if (!isPlaying) {
      togglePlay();
    }
  };

  const toggleFullscreen = () => {
    const videoContainer = document.querySelector(".container");

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      } else if (videoContainer.mozRequestFullScreen) {
        videoContainer.mozRequestFullScreen();
      } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
      } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen();
      }
    }
  };

  return (
    <>
      <div className="container show-controls">
        <div className="wrapper">
          <div className="video-timeline">
            <div className="progress-area" onClick={handleProgressBarClick}>
              <div className="progress-bar"></div>
            </div>
          </div>
          <ul className="video-controls">
            <li className="options left">
              <button className="volume" onClick={toggleMute}>
                <i
                  className={`fa-solid ${
                    isMuted ? "fa-volume-mute" : "fa-volume-high"
                  }`}
                ></i>
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="any"
                value={volume}
                onChange={changeVolume}
              />
              <div className="video-timer">
                <p className="current-time">{formatTime(currentTime)}</p>
                <p className="seperator"> / </p>
                <p className="video-duration">{formatTime(duration)}</p>
              </div>
            </li>
            <li className="options center">
              <button className="skip-backward" onClick={skipBackward}>
                <i className="fas fa-backward"></i>
              </button>
              <button className="play-pause" onClick={togglePlay}>
                <i className={`fas ${isPlaying ? "fa-pause" : "fa-play"}`}></i>
              </button>
              <button className="skip-forward" onClick={skipForward}>
                <i className="fas fa-forward"></i>
              </button>
            </li>
            <li className="options right">
              <div className="playback-content">
                <button className="playback-speed" onClick={toggleSpeedOptions}>
                  <span className="material-symbols-rounded">
                    slow_motion_video
                  </span>
                </button>
                {showSpeedOptions && (
                  <ul className="speed-options">
                    <li
                      data-speed="2"
                      onClick={() => handleSpeedOptionClick(2)}
                    >
                      2x
                    </li>
                    <li
                      data-speed="1.5"
                      onClick={() => handleSpeedOptionClick(1.5)}
                    >
                      1.5x
                    </li>
                    <li
                      data-speed="1"
                      className={selectedSpeed === 1 ? "active" : ""}
                      onClick={() => handleSpeedOptionClick(1)}
                    >
                      Normal
                    </li>
                    <li
                      data-speed="0.75"
                      onClick={() => handleSpeedOptionClick(0.75)}
                    >
                      0.75x
                    </li>
                    <li
                      data-speed="0.5"
                      onClick={() => handleSpeedOptionClick(0.5)}
                    >
                      0.5x
                    </li>
                  </ul>
                )}
              </div>
              <button className="pic-in-pic" onClick={togglePiP}>
                <span className="material-icons">picture_in_picture_alt</span>
              </button>
              <div className="playback-content">
                <button className="quality" onClick={toggleQualityOptions}>
                  <span className="material-icons">settings</span>
                </button>
                {showQualityOptions && (
                  <ul id="quality-options" className="speed-options">
                    <li
                      className={selectedQuality === "480p" ? "active" : ""}
                      onClick={() => handleQualityOptionClick("480p")}
                    >
                      480p
                    </li>
                    <li
                      className={selectedQuality === "720p" ? "active" : ""}
                      onClick={() => handleQualityOptionClick("720p")}
                    >
                      720p
                    </li>
                  </ul>
                )}
              </div>
              <button className="fullscreen" onClick={toggleFullscreen}>
                <i className="fa-solid fa-expand"></i>
              </button>
            </li>
          </ul>
        </div>
        <video
          poster="https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/04/fast-x-poster-with-dante-and-dom-in-black-and-white.jpeg"
          className="video"
          src={
            selectedQuality === "480p"
              ? "https://cdn-user.veed.io/render/502d719a-0678-4848-8a6b-696f1e1ddd57.mp4"
              : "https://cdn-user.veed.io/render/680229ae-81e4-43e6-98b4-120274e63f3b.mp4"
          }
          id="video"
        ></video>
      </div>
    </>
  );
};

export default Video;
