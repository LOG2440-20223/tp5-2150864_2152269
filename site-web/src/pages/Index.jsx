import React, { useState, useEffect, useContext } from "react";
import Playlist from "../components/Playlist";
import Song from "../components/Song";
import SearchBar from "../components/SearchBar";
import PlaylistContext from "../contexts/PlaylistContext";

export default function Index() {
  const api = useContext(PlaylistContext).api;
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    api
      .fetchAllPlaylists()
      .then((playlists) => setPlaylists(playlists))
      .catch(() => setPlaylists([]));
    // TODO DONE: récupérer les chansons du serveur
    api
    .fetchAllSongs()
    .then((songs) => setSongs(songs))
    .catch(() => setSongs([]))

  }, []);

  /**
   * TODO : implémenter la recherche et la mise à jour de l'interface
   * Effectue une recherche par mot clé sur le serveur.
   * Si exactMatch = true, la recherche est sensible à la case
   * @param {Event} event evenement de soumission à bloquer pour ne pas rafraichir la page
   * @param {string} query mot clé pour la recherche
   * @param {boolean} exactMatch si true, la recherche est sensible à la case
   */
  const handleSearch = async (event, query, exactMatch) => {
    event.preventDefault();
    // TODO : implémenter la recherche et la mise à jour de l'interface
  };

  return (
    <>
      <main id="main-area" className="flex-column">
        {/*TODO DONE: ajouter la barre de recherche*/}
        <div id="search-bar">
          <form id="search-form" class="flex-row">
            <input id="search-input" type="text" />
              <button id="search-btn" class="fa fa-2x fa-search" type="submit"></button>
              <section id="exact-parent" class="flex-row">
                <input id="exact-search" type="checkbox" />
                <label for="exact-search">Exact</label>
              </section>
          </form>
        </div>
        <div id="playlist-list">
          <h1>Mes Playlists</h1>
          <section id="playlist-container" className="playlist-container">
            {playlists.map((playlist) => (
              <Playlist key={playlist.id} playlist={playlist} />
            ))}
          </section>
        </div>
        <div id="songs-list">
          <h1>Mes Chansons</h1>
          {/*TODO : afficher les chansons dans la page*/
            /* songs.map((song) => (
              <Song key ={song.id} song = {song} />
              ))} */}
        </div>
      </main>
    </>
  );
}
