"use strict";
// TODO: rename api variable
// TODO: add base URL 
const API = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
const container = $("#gifContainer");

/** takes in user input and gets a gif URL based on the input
 * and appends the gif to the DOM */
async function getGif(evt){
    evt.preventDefault();

    const searchTerm = $("#searchTerm");
    const response = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${searchTerm.val()}&api_key=${API}`)
    const gif = response.data.data[0].images.downsized.url;

    const newGif = $("<img>").attr("src", gif);
    container.append(newGif);

    searchTerm.val('');
}

/** empties the gif container when "remove gif" button is clicked*/
function removeGif() {
    container.empty();
}

$("#remove").on("click", removeGif);
$("#submit").on("click", getGif)