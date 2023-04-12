"use strict";
const BASE_URL = "http://api.giphy.com/v1/gifs/search" 
const API_KEY = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
const container = $("#gifContainer");

class GiphyAPI {
    constructor(api_key){
        this.api_key = api_key;
        this.handleClick = this.handleClick.bind(this)
        $("#submit").on("click", this.handleClick)
    }
    

    async search(term){
        const response = await axios.get(BASE_URL, {params: { q: term, api_key: this.api_key}})
        console.log(response)
        return response;
    }

    async getGif(term){
        const response = await this.search(term);
        const randomNum = Math.floor(Math.random() * 50);
        const gif = response.data.data[randomNum].images.downsized.url;
        return gif;
    }

    removeGif(){
        container.empty();
    }

    attachGifToDOM(gif){
        const newGif = $("<img>").attr("src", gif);
        container.append(newGif)
    }

    async handleClick(evt){
        evt.preventDefault();

        const searchTerm = $("#searchTerm");
        const gif = await this.getGif(searchTerm.val());

        this.attachGifToDOM(gif);
        searchTerm.val("")
    }
}

new GiphyAPI(API_KEY)

// $("#remove").on("click", removeGif);

//traditional way with OOP
// /** takes in user input and gets a gif URL based on the input
//  * and appends the gif to the DOM */
// async function handleClick(evt){
//     evt.preventDefault();

//     const searchTerm = $("#searchTerm");
//     const gif = await getGif(searchTerm.val())

//     attachGifToDOM(gif);
//     searchTerm.val('');
// }

// /**getGif: takes in a search term and returns a random gif URL */
// async function getGif(searchTerm){
//     const randomNum = Math.floor(Math.random() * 50);
//     const response = await axios.get(`${BASE_URL}/gifs/search?q=${searchTerm}&api_key=${API_KEY}`)
//     const gif = response.data.data[randomNum].images.downsized.url;
//     return gif;
// }

// /** empties the gif container when "remove gif" button is clicked*/
// function removeGif() {
//     container.empty();
// }

// /**attachGifToDOM: take in gif URL and creates new img element and 
//  * append to it to the gif container*/
// function attachGifToDOM(gif){
//     const newGif = $("<img>").attr("src", gif);
//     container.append(newGif)
// }

// $("#submit").on("click", handleClick)