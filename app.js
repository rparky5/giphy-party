"use strict";

const API = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
const container = $("gifContainer");


async function getGif(){
    const searchTerm = $("#searchTerm").val();
    let response = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${API}`)
    console.log(response.data)

}   

$("#submit").on("click", getGif)