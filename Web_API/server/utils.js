import { serverConfig } from "./serverConfig";

function movieByUrl(key) {
    let url;
    switch (key) {
        case "discover":
            url = serverConfig.apiTheMoviedb.url + 'discover/movie?api_key=' + serverConfig.apiTheMoviedb.apiKey + "&language=" + serverConfig.apiTheMoviedb.language;
            break;
    }
    console.log(url);
    return url;
}

function updateLikeMovie(idMovie) {


    //On prend le row du film
    let dbRessource = film.findOne({ id: idMovie });


    //Si il existe
    if (dbRessource) {
        //On prend l'id du row et on increase son like de 1
        film.update(
            { _id: dbRessource._id },
            { $inc: { like: 1 } }
        );
    } else {
        //Si le row n'existe pas on l'ajoute
        film.insert({ id: idMovie, like: 1 });
    }


    //On retourne un truck
    return film.findOne({ id: idMovie });
    // return {id: film.findOne({ id: idMovie }).id, like: film.findOne({ id: idMovie }).like}
}