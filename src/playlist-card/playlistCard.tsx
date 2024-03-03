import React from "react";
import * as Styles from "./playlistCard.module.scss";

export default function PlaylistCard({
  playList,
  selectedPlaylist,
  toggleBorderStyle,
  toggleHoverStyle
}: any) {
  return (
    <div
      className={`flex align-items-center ${Styles.card_wrapper}`}
      draggable={true}
      onDragStart={() => {
        selectedPlaylist(playList);
      }}
      onDragOver={() => {
        toggleHoverStyle(true);
      }}
      onDragLeave={() => {
        toggleHoverStyle(false);
        toggleBorderStyle(false);
      }}
    >
      <div style={{ borderRadius: "4px", padding: "0 5px" }}>
        <img
          src={playList.image}
          alt="playlist_image"
          className={Styles.playlist_image}
        />
      </div>
      <div>
        <p className={Styles.playlist_name}>{playList.name}</p>
        <p className={Styles.playlist_description}>{playList.description}</p>
        <p className={Styles.playlist_description}>
          Tracks: {playList.tracks.total}
        </p>
      </div>
    </div>
  );
}
