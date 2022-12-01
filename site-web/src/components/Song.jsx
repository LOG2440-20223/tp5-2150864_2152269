import React, { useState, useContext } from "react";
import { ACTIONS } from "../reducers/reducer";

import PlaylistContext from "../contexts/PlaylistContext";

export default function Song({ song, index }) {
  const { dispatch } = useContext(PlaylistContext);
  const [liked, setLiked] = useState(song.liked);
  // TODO Peut-etre done: envoyer une demande de modification au serveur et mettre l'interface à jour.
  // useContext(PlaylistContext).api // a verifier si cest bon
  //   .updateSong(song.id, { liked: liked })
  //   .then((song) => {
  //     dispatch({ type: ACTIONS.UPDATE_SONG, payload: song });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
    
  const toggleLike = () => {
    if (index > 0){
      setLiked(!liked);
    }
  };
  

  // TODO : envoyer une action PLAY avec le bon index au reducer.
  const playSong = () => {};
  return (
    <section
      className="song-item flex-row"
      onClick={() => {
        {/*TODO DONE : joueur une chanson seulement si index existe */}
        if(index > 0){
          playSong();
        }
      }}
    >
      {index ? <span>{index}</span> : <></>}
      {/*TODO DONE: ajouter les bonnes informations de la chanson */}
      <p>{song.name}</p>
      <p>{song.genre}</p>
      <p>{song.artist}</p>

      {/*TODO DONE(fait dans la fonction toggleLike): modifier le statut aimé seulement si index n'existe pas| SEULEMENT S'IL EXISTE ??*/}
      <button
        className={`${liked ? "fa" : "fa-regular"} fa-2x fa-heart`}
        onClick={toggleLike}
      ></button>
    </section>
  );
}
