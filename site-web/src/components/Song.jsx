import React, { useState, useContext } from "react";
import { ACTIONS } from "../reducers/reducer";

import PlaylistContext from "../contexts/PlaylistContext";

export default function Song({ song, index }) {
  const { dispatch } = useContext(PlaylistContext);
  const [liked, setLiked] = useState(song.liked);
  // TODO DONE dans toggleLike : envoyer une demande de modification au serveur et mettre l'interface à jour.

  const toggleLike = () => {
    if (index === undefined){
      setLiked(!liked);
    }
  };
  

  // TODO DONE: envoyer une action PLAY avec le bon index au reducer.
  const playSong = () => {
    dispatch({ type: ACTIONS.PLAY, payload: { index : (index -1) } });
  };
  return (
    <section
      className="song-item flex-row"
      onClick={() => {
        {/*TODO DONE : joueur une chanson seulement si index existe */}
        if(index !== undefined){
          playSong();
        }
      }}
    >
      {index ? <span>{index}</span> : <></>}
      {/*TODO DONE: ajouter les bonnes informations de la chanson */}
      <p>{song.name}</p>
      <p>{song.genre}</p>
      <p>{song.artist}</p>

      {/*TODO DONE(fait dans la fonction toggleLike): modifier le statut aimé seulement si index n'existe pas*/}
      <button
        className={`${liked ? "fa" : "fa-regular"} fa-2x fa-heart`}
        onClick={toggleLike}
      ></button>
    </section>
  );
}
