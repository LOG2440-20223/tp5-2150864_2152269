const { FileSystemManager } = require("./file_system_manager");
const { dbService } = require("./database.service");
const DB_CONSTS = require("../utils/env");

const path = require("path");

class SongService {
  constructor () {
    this.JSON_PATH = path.join(__dirname + "../../data/songs.json");
    this.fileSystemManager = new FileSystemManager();
    this.dbService = dbService;
  }

  get collection () {
    return this.dbService.db.collection(DB_CONSTS.DB_COLLECTION_SONGS);
  }

  /**
   *  Implémenter la récupération de toutes les chansons
   *
   * Retourne la liste de toutes les chansons
   * @returns {Promise<Array>}
   */
  async getAllSongs () {
    const songs = this.collection.find({}).toArray();
    return songs;
  }

  /**
   *  Implémenter la récupération d'une chanson en fonction de son id
   *
   * Retourne une chanson en fonction de son id
   * @param {number} id identifiant de la chanson
   * @returns chanson correspondant à l'id
   */
  async getSongById (id) {
    const song = await this.collection.findOne({ id });
    return song;
  }

  /**
   *  Implémenter l'inversement de l'état aimé d'une chanson
   *
   * Modifie l'état aimé d'une chanson par l'état inverse
   * @param {number} id identifiant de la chanson
   * @returns {boolean} le nouveau état aimé de la chanson
   */
  async updateSongLike (id) {
    const song = await this.getSongById(parseInt(id));
    await this.collection.updateOne({ id: parseInt(id) }, { $set: { liked: !song.liked } });
    return !song.liked;
  }

  /**
   *  Implémenter la recherche pour les 3 champs des chansons. Astuce : utilisez l'opérateur '$or' de MongoDB
   *
   * Cherche et retourne les chansons qui ont un mot clé spécifique dans leur description (name, artist, genre)
   * Si le paramètre 'exact' est TRUE, la recherche est sensible à la case
   * en utilisant l'option "i" dans la recherche par expression régulière
   * @param {string} substring mot clé à chercher
   * @param {boolean} exact si la recherche est sensible à la case
   * @returns toutes les chansons qui ont le mot clé cherché dans leur contenu (name, artist, genre)
   */
  async search (substring, exact) {
    let songs;
    const filter = {
      $or: [{ name: { $regex: `${substring}`, $options: "i" } },
        { artist: { $regex: `${substring}`, $options: "i" } },
        { genre: { $regex: `${substring}`, $options: "i" } }]
    };
    if (exact) {
      filter.$or = [{ name: { $regex: `${substring}` } },
        { artist: { $regex: `${substring}` } },
        { genre: { $regex: `${substring}` } }];

      songs = await this.collection.find(filter).toArray();
    } else {
      songs = await this.collection.find(filter).toArray();
    }
    return songs;
  }

  async populateDb () {
    const songs = JSON.parse(await this.fileSystemManager.readFile(this.JSON_PATH)).songs;
    await this.dbService.populateDb(DB_CONSTS.DB_COLLECTION_SONGS, songs);
  }
}

module.exports = { SongService };
