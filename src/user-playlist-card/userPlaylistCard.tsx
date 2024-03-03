import React from "react";
import Close from "../shared/close";
import * as Styles from "./userPlaylistCard.module.scss";
import * as Classes from "../playlist-card/playlistCard.module.scss";

export default function UserPlaylistCard({ playList, removePlaylist }: any) {
  return (
    <div
      className={`flex align-items-center ${Styles.card_wrapper}`}
      draggable={false}
    >
      <div style={{ borderRadius: "4px", padding: "0 5px" }}>
        <img
          src={playList.image}
          alt="playlist_image"
          className={Classes.playlist_image}
          draggable={false}
        />
      </div>
      <div className="flex-grow-1">
        <p className={Classes.playlist_name}>{playList.name}</p>
        <p className={Classes.playlist_description}>{playList.description}</p>
        <p className={Classes.playlist_description}>
          Tracks: {playList.tracks.total}
        </p>
      </div>
      <div className="p-2">
        <Close
          classes={Styles.close_svg}
          onClick={() => removePlaylist(playList)}
          width="10"
          height="10"
        />
      </div>
    </div>
  );
}
