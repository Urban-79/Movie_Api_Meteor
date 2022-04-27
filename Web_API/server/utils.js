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
