import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import PlaylistCard from "./playlist-card/playlistCard";
import UserPlaylistCard from "./user-playlist-card/userPlaylistCard";
import Toast from "./shared/toast/toast";
import * as Styles from "./app.module.scss";

export default function App() {
  const savedPlaylist = localStorage.getItem("saved_playlist");
  const [playlists, setPlaylists] = useState<any>([]);
  const [selectedPlayList, setSelectedPlayList] = useState(null);
  const [userPlayList, setUserPlayList] = useState<any>([]);
  const [error, setError] = useState("");
  const [toggleDropzoneStyle, setToggleDropzoneStyle] = useState(false);
  const [toggleAddBorder, setToggleAddBorder] = useState(false);
  const [toast, setToast] = React.useState({
    toggle: false,
    message: "",
  });
  const [loading, setLoading] = useState(true);

  const client_id = "b4200289a5434278a3da50e021627b18";
  const client_secret = "3654467ed01b44878d4b01f94835ed35";

  useEffect(() => {
    async function getAccessToken() {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        body: new URLSearchParams({
          grant_type: "client_credentials",
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(client_id + ":" + client_secret).toString("base64"),
        },
      });

      return await response.json();
    }
    async function getAllPlaylists(token: string) {
      try {
        const response: any = await axios.get(
          "https://api.spotify.com/v1/browse/featured-playlists?locale=sv_SE&limit=50",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const featured_playlist = response.data.playlists.items.map(
          (res: any) => ({
            id: res.id,
            name: res.name,
            description: res.description,
            image: res.images[0].url,
            tracks: res.tracks,
          })
        );
        setPlaylists(featured_playlist);
        if (savedPlaylist) {
          const data = JSON.parse(savedPlaylist ?? "");
          setUserPlayList(data);
          // extracting all the ids of the existing saved playlists
          const listOfIds = data.map((playlist: any) => playlist.id);
          // filtering the ids from the all playlist array
          setPlaylists(
            featured_playlist.filter(
              (playlist: any) => !listOfIds.includes(playlist.id)
            )
          );
        }
      } catch (err: any) {
        setError(err.response.data.error.message);
      } finally {
        setLoading(false);
      }
    }
    getAccessToken().then((data: any) => {
      getAllPlaylists(data.access_token);
    });
  }, []);
  function savePlaylist() {
    localStorage.setItem("saved_playlist", JSON.stringify(userPlayList));
    setToast((toast) => ({
      ...toast,
      toggle: true,
      message: "Your playlist has been saved",
    }));
  }
  return (
    <div style={{ padding: "20px" }}>
      {toast.toggle && (
        <Toast
          message={toast.message}
          removeToast={() =>
            setToast((toast) => ({
              ...toast,
              toggle: false,
              message: "",
            }))
          }
        />
      )}
      {error ? (
        <div
          style={{ height: "200px", justifyContent: "center" }}
          className="flex align-items-center"
        >
          {error}
        </div>
      ) : loading ? (
        <div
          style={{ height: "200px", justifyContent: "center" }}
          className="flex align-items-center"
        >
          Fetching playlists from spotify...
        </div>
      ) : (
        <>
          <h1 className="p-3 heading1">Welcome to Spotify</h1>
          <p className="p-3 sub-heading">
            This application will allow you to save your favorite playlists. On
            the left you will see featured playlist and on the right you will
            see your saved playlist. You can drag and drop to move your playlist
            from left to right. Once you save your playlist even if you refresh
            you can see the saved playlist
          </p>
          <hr />
          <div className="flex align-items-center">
            <div
              style={{
                flex: 1,
                height: "70vh",
                overflow: "auto",
                margin: "10px",
              }}
              onDragOver={(event) => {
                event.preventDefault();
                setToggleDropzoneStyle(true);
              }}
              onDragEnd={(event) => {
                event.preventDefault();
                setToggleDropzoneStyle(false);
                setToggleAddBorder(false);
              }}
            >
              {playlists.length === 0 ? (
                <div
                  style={{ height: "100%" }}
                  className="flex align-items-center justify-content-center"
                >
                  <h5>All playlist have been moved.</h5>
                </div>
              ) : (
                <div className="p-3">
                  <h2 className="heading2 mb-3">Featured Playlist</h2>
                  {playlists.map((playList: any) => {
                    return (
                      <div key={playList.id}>
                        <PlaylistCard
                          playList={playList}
                          selectedPlaylist={(value: any) =>
                            setSelectedPlayList(value)
                          }
                          toggleHoverStyle={(value: boolean) =>
                            setToggleDropzoneStyle(value)
                          }
                          toggleBorderStyle={(value: boolean) =>
                            setToggleAddBorder(value)
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div
              className={`p-2 ${
                toggleDropzoneStyle
                  ? Styles.dropContainerHover
                  : Styles.dropContainer
              } ${toggleAddBorder ? Styles.add_border : ""}`}
              onDragOver={(event) => {
                event.preventDefault();
                // set Some drop styles
                setToggleDropzoneStyle(true);
                setToggleAddBorder(true);
              }}
              onDrop={async (event) => {
                event.preventDefault();
                setUserPlayList([...userPlayList, selectedPlayList]);
                setPlaylists(
                  playlists.filter(
                    (playList: any) => playList !== selectedPlayList
                  )
                );
                setSelectedPlayList(null);
                setToggleDropzoneStyle(false);
                setToggleAddBorder(false);
              }}
            >
              <div style={{ margin: "5px" }}>
                <div className="p-2 flex align-items-center mb-3">
                  <h2 className="heading2 flex-grow-1">Saved Playlist</h2>
                  <button className="button" onClick={savePlaylist}>
                    Save Playlist
                  </button>
                </div>
                {userPlayList.length === 0 ? (
                  <div
                    style={{ height: "50vh" }}
                    className="flex align-items-center justify-content-center"
                  >
                    <h5>Drag and drop playlist here.</h5>
                  </div>
                ) : (
                  userPlayList.map((playList: any) => {
                    return (
                      <div key={playList.id}>
                        <UserPlaylistCard
                          playList={playList}
                          removePlaylist={(value: any) => {
                            setPlaylists([...playlists, value]);
                            setUserPlayList(
                              userPlayList.filter(
                                (playlist: any) => playlist !== value
                              )
                            );
                          }}
                        />
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
