// Declarations for our song values.
let song;
let playSong;

// Spotify Client Credentials
const clientId = "442308bdb7eb4e4baf528208e7f1aab6";
const clientSecret = "69a7d4bf12914a338f7a3a014cc3a8cf";

const _getToken = async () => {
    const result = await fetch(`https://accounts.spotify.com/api/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });
    // Access the data given to us by the fetch response (Promise)
    const data = await result.json();
    return data.access_token
}
// Function to get song info when image figure is clicked
/**
 * @param img_index
 * @param item_index
 * 
 * Function gets a song from spotify using the image index of our gallery. Then
 * it finds the correct item_index of the JSON response data from Spotify
 * which will produce a preview URL that will be used to play our selected song. 
 */
async function clickedEvent(img_index, item_index){
    // Get track name
    let track = document.getElementsByTagName('img')[img_index].attributes[2].value;

    // Get our token
    let token = await _getToken();

    let headers = new Headers([
        ['Content-Type', 'application/json'],
        ['Accept', 'application/json'], 
        ['Authorization', `Bearer ${token}`]
    ]);
    let request = new Request(`https://api.spotify.com/v1/search?q=${track}&type=track&limit=15`,{
        method: 'GET',
        headers: headers
    });
    let result = await fetch(request);

    let response = await result.json();

    console.log(response)
    let song = response.tracks.items[item_index].preview_url

    // Before we play a song, first check if playSong is True, and if so, stop it. 
    if (playSong){
        stopSnippet();
    }
    songSnippet(song);
}
/**
 * @param id
 * @param event
 * id = image id for gallery image
 * event = mouse event given by action from our user
 * 
 * Our function will produce songs from the clickEvent based on the index of the image
 */
function getSong(id, event){
    switch(id){
        case 'fig1': { //Active Child - Hanging On
            event.stopPropagation();
            clickedEvent(0,0)
            break;
        }
        case 'fig2': { //ChVrches -  Science/Vison
            event.stopPropagation();
            clickedEvent(1,0)
            break;
        }
        case 'fig3': { //Duran Duran - Come Undone
            event.stopPropagation();
            clickedEvent(2,0)
            break;
        }
        case 'fig4': { 
            event.stopPropagation();
            clickedEvent(3,0)
            break;
        }
        case 'fig5': { 
            event.stopPropagation();
            clickedEvent(4,0)
            break;
        }
        case 'fig6': { //Jose Gonzales Crosses
            event.stopPropagation();
            clickedEvent(5,0)
            break;
        }
    }
}
/**
 * @param url
 * 
 * url =  song preview url
 * 
 * function will return an audio clip given by the preview url
 */
function songSnippet(url){
    playSong = new Audio(url);
    return playSong.play()
}
/**
 * NO params this time
 * Function returns an event to stop the song snippet
 */
function stopSnippet(){
    return playSong.pause();
}