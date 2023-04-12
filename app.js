"use strict";
const BASE_URL = "http://api.giphy.com/v1" 
const API_KEY = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
const container = $("#gifContainer");

class GiphyAPI {
    constructor(api_key){
        this.api_key = api_key;
    }

    async search(term){
        return await axios.get(BASE_URL, {params: {api_key: this.api_key, q: term}})
    }

    async getGif(){
        
    }
}

/** takes in user input and gets a gif URL based on the input
 * and appends the gif to the DOM */
async function handleClick(evt){
    evt.preventDefault();

    const searchTerm = $("#searchTerm");
    const gif = await getGif(searchTerm.val())

    attachGifToDOM(gif);
    searchTerm.val('');
}

/**getGif: takes in a search term and returns a random gif URL */
async function getGif(searchTerm){
    const randomNum = Math.floor(Math.random() * 50);
    const response = await axios.get(`${BASE_URL}/gifs/search?q=${searchTerm}&api_key=${API_KEY}`)
    const gif = response.data.data[randomNum].images.downsized.url;
    return gif;
}

/** empties the gif container when "remove gif" button is clicked*/
function removeGif() {
    container.empty();
}

/**attachGifToDOM: take in gif URL and creates new img element and 
 * append to it to the gif container*/
function attachGifToDOM(gif){
    const newGif = $("<img>").attr("src", gif);
    container.append(newGif)
}

$("#remove").on("click", removeGif);
$("#submit").on("click", handleClick)