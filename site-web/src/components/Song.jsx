import React, { useState, useContext } from "react";
import { ACTIONS } from "../reducers/reducer";

import PlaylistContext from "../contexts/PlaylistContext";

export default function Song({ song, index }) {
  const { dispatch, api } = useContext(PlaylistContext);
  const [liked, setLiked] = useState(song.liked);
  const toggleLike = () => {
    if (index === undefined){
      api.updateSong(song.id);
      setLiked(!liked);
    };
  }
  
  const playSong = () => {
    dispatch({ type: ACTIONS.PLAY, payload: { index : (index -1) } });
  };
  return (
    <section
      className="song-item flex-row"
      onClick={() => {
        if(index !== undefined){
          playSong();
        }
      }}
    >
      {index ? <span>{index}</span> : <></>}
      <p>{song.name}</p>
      <p>{song.genre}</p>
      <p>{song.artist}</p>
      <button
        className={`${liked ? "fa" : "fa-regular"} fa-2x fa-heart`}
        onClick={toggleLike}
      ></button>
    </section>
  );
}
