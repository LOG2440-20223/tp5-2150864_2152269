const path = require("path");
const express = require("express");
const songsRouter = require("./routes/songs");
const playlistsRouter = require("./routes/playlists");
const searchBarRouter = require("./routes/search_bar");
const DB_CONSTS = require("./utils/env");
const { dbService } = require('./services/database.service');
const cors = require("cors");

const { PlaylistService } = require("./services/playlist.service");
const { SongService } = require("./services/songs.service");

const app = express();
const PORT = 5020;
const SIZE_LIMIT = "10mb";
const PUBLIC_PATH = path.join(__dirname);

app.use(cors({ origin: "*" }));

// afficher chaque nouvelle requête dans la console
app.use((request, response, next) => {
  console.log(`New HTTP request: ${request.method} ${request.url}`);
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: SIZE_LIMIT }));
app.use(express.static(PUBLIC_PATH));

app.use("/api/songs", songsRouter.router);
app.use("/api/playlists", playlistsRouter.router);
app.use("/api/search", searchBarRouter.router);

const playlistService = new PlaylistService();
const songService = new SongService();

const server = app.listen(PORT, () => {
  dbService.connectToServer(DB_CONSTS.DB_URL).then(() => {
    playlistService.populateDb();
    songService.populateDb();
    // eslint-disable-next-line no-console
    console.log(`Listening on port ${PORT}.`);
  });
});

module.exports = server;
