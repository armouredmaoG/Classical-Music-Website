/*Theme pictures*/
var sculpturePictures = ["sculpture1", "sculpture2", "sculpture3"];
var paintingPictures = ["painting1", "painting2", "painting3"];
var museumPictures = ["Museum1", "Museum2", "Museum3"];

/*Mood music*/
var lover = [["The Swan ( Le Cygne ) - Carnival of the Animals","Camille Saint-Saëns"],
                ["Liszt - Consolation No. 3", "Vladimir Horowitz"],
                ["Nocturne Op. 9, No. 2","Frédéric Chopin"],
                ["Les Contes d'Hoffmann Barcarolle", "Jacques Offenbach"],
                ["Étude Op. 25, No. 1","Frédéric Chopin"]];

var villian = [["Swan Lake, Op. 20, Act II","Pyotr Tchaikovsky"],
                ["Danse Macabre, Op. 40", "Camille Saint-Saëns"],
                ["Carnival of the Animals, Aquarium","Camille Saint-Saëns"],
                ["Devil's Trill Sonata", "Giuseppe Tartini"],
                ["The Four Seasons, Winter III. Allegro", "Antonio Vivaldi"]];

var loner = [["Sur le fil","Yann Tiersen"],
                ["Suite for Solo Cello No. 5", "Johann Sebastian Bach and Mischa Maisky"],
                ["Elegie Op. 3 No. 1","Sergei Rachmaninoffs"],
                ["Nocturne No. 13 Op. 48, No. 1", "Frédéric Chopin"],
                ["Piano Trio in A minor, Op. 50 - Var. IV - L'istesso tempo", "Pyotr Tchaikovsky"]];

var thinker = [["Piano Sonata No. 15 'Pastorale' Op. 28", "Ludwig Van Beethoven"],
                ["Notturno in G minor","Fanny Mendelssohn"],
                ["The Four Seasons, Winter I. Allegro non molto", "Antonio Vivaldi"],
                ["Le grand cahier - X. L'incendie", "Alexander Litvinovsky"],
                ["The Four Seasons, Summer III. Presto","Antonio Vivaldi"]];

//Initialize deafult mood to villian
let currMood = "villian";

//Track music in the array
let songIndex = 1;

//Track the current array chosen according to the mood chosen by the user
let currArrayChosen = villian;

const musicContainer = $('.music-player');
const playBtn = $('#ctrlIcon');
const nextBtn = $('#next');
const prevBtn = $('#prev');
const audio = $('#song')[0];
const audioSrc = $("#songsrc")[0];
const progress = $('#progress')[0];
const musicTitle = $('.music-name');
const artistName = $('.artist-name');


//Highlight active button
function setActiveButton(ID){
            
    // Remove the active class from all buttons
    $('#home').removeClass("btnActive");
    $('#categories').removeClass("btnActive");
    $('#about').removeClass("btnActive");

    // Add the active class to the clicked button
    $('#'+ID).addClass("btnActive");

    // Store the active button ID in sessionStorage
    localStorage.setItem("activeButton", ID);
}
const activeButtonID = localStorage.getItem("activeButton") || "home";

if(activeButtonID){
    setActiveButton(activeButtonID);
}

//Display music player when home is clicked
$("#home").click(function(){
    setActiveButton("home");
    $(".music-player").css("z-index", "25");
    $(".about").css("z-index", "20");
    $(".about").addClass("hide");
    $("#ImageCarousel").removeClass("hide");
    $(".music-player").removeClass("hide");
    $(".music-player").css("display", "flex");
});

//Display categories modal popup
$("#categories").click(function(){
    setActiveButton("categories");
    $(".categories-list").removeClass("hide");
    $(".categories-list").css("display", "flex");
});

//To exit the category modal popup, click anywhere except the category-container
$(document).click(function(event){
    if (!$(event.target).closest(".category-content-container").length && !$(event.target).is("#categories")) {
        $(".categories-list").addClass("hide");
    }
});

//Display AbouUs when AboutUs is clicked
$("#about").click(function(){
    setActiveButton("about");
    $(".music-player").css("z-index", "20");
    $("#ImageCarousel").addClass("hide");
    $(".music-player").addClass("hide");
    $(".about").css("z-index", "25");
    $(".about").removeClass("hide");
    $(".about").css("display", "flex");

    $(".group-t").css("display", "none");
    $(".group-t").addClass("hide");
    $(".group-a").css("display", "grid");
});

// Display Team when "Get in touch is clicked"
$(".credits").click(function(){
    $(".group-a").css("display", "none");
    $(".group-t").removeClass("hide");
    $(".group-t").css("display", "grid");
});

//Closing the mood or theme sub-categories
$(".close-button").click(function(){
    close();
});

function close(){
    $(".navbar").removeClass("hide");
    $(".overall-mood-container").addClass("hide");
    $(".overall-theme-container").addClass("hide");
}

//Display Mood Subcategories when Mood is clicked
$("#mood").click(function(){
    $(".navbar").addClass("hide"); //hides the navbar
    $(".overall-mood-container").removeClass("hide");
    $(".overall-theme-container").css("z-index", "998");
    $(".overall-mood-container").css("z-index", "999");
    $(".overall-mood-container").css("display", "block");
});

//Display Theme Subcategories when Theme is clicked
$("#theme").click(function(){
    $(".navbar").addClass("hide"); //hides the navbar
    $(".overall-theme-container").removeClass("hide");
    $(".overall-mood-container").css("z-index", "998");
    $(".overall-theme-container").css("z-index", "999");
    $(".overall-theme-container").css("display", "block");
});

//Display pictures from Sculpture folder when Sculpture sub-category is clicked
$("#sculpture").click(function(){
    $(".bg-img-1").css("background-image", `url(public/images/sculpture/${sculpturePictures[0]}.png)`);
    $(".bg-img-2").css("background-image", `url(public/images/sculpture/${sculpturePictures[1]}.png)`);
    $(".bg-img-3").css("background-image", `url(public/images/sculpture/${sculpturePictures[2]}.png)`);
    close();
});

//Display pictures from Museum folder when Museum sub-category is clicked
$("#museum").click(function(){
    $(".bg-img-1").css("background-image", `url(public/images/museum/${museumPictures[0]}.png)`);
    $(".bg-img-2").css("background-image", `url(public/images/museum/${museumPictures[1]}.png)`);
    $(".bg-img-3").css("background-image", `url(public/images/museum/${museumPictures[2]}.png)`);
    close();
});

//Display pictures from Painting folder when Painting sub-category is clicked
$("#painting").click(function(){
    $(".bg-img-1").css("background-image", `url(public/images/painting/${paintingPictures[0]}.png)`);
    $(".bg-img-2").css("background-image", `url(public/images/painting/${paintingPictures[1]}.png)`);
    $(".bg-img-3").css("background-image", `url(public/images/painting/${paintingPictures[2]}.png)`);
    close();
});


//function to load audio into DOM
function loadAudio(song, folderName){
    artistName.text(song[1]);
    musicTitle.text(song[0]);
    audio.src = `public/music/${currMood}/${song[0]}.mp3`;
}

//load audios into DOM
loadAudio(villian[songIndex], currMood);

// 

//play audio function
function playAudio(){
    musicContainer.addClass("playing");
    playBtn.attr("src", "public/icons/pause_button.svg");
    audio.play();
}

//pause audio function
function pauseAudio(){
    musicContainer.removeClass("playing");
    playBtn.attr("src", "public/icons/play_button.svg");
    audio.pause();
}

//Play or Pause Audio on click
playBtn.click(function(){
    var isPlaying = musicContainer.hasClass("playing");
    if(isPlaying){
        pauseAudio();
    }else{
        playAudio();
        
    }
})

//Previous Audio
prevBtn.click(function(){
    songIndex--;
    if(songIndex < 0){
        songIndex =  villian.length - 1;
    }
    loadAudio(currArrayChosen[songIndex], currMood);
    playAudio();
})

//Next Audio
nextBtn.click(function(){
    songIndex++;
    if(songIndex === villian.length){
        songIndex =  0;
    }
    loadAudio(currArrayChosen[songIndex], currMood);
    playAudio();
})

//Play songs from Lover folder when Lover sub-category is clicked
$("#lover").click(function(){
    currMood = "lover";
    currArrayChosen = lover;
    songIndex = 0;
    loadAudio(currArrayChosen[songIndex], currMood);
    playAudio();
    close();
});

//Play songs from Villian folder when Villian sub-category is clicked
$("#villian").click(function(){
    currMood = "villian";
    currArrayChosen = villian;
    songIndex = 0;
    loadAudio(currArrayChosen[songIndex], currMood);
    playAudio();
    close();
});

//Play songs from Loner folder when Loner sub-category is clicked
$("#loner").click(function(){
    currMood = "loner";
    songIndex = 0;
    currArrayChosen = loner;
    loadAudio(currArrayChosen[songIndex], currMood);
    playAudio();
    close();
});

//Play songs from Thinker folder when Thinker sub-category is clicked
$("#thinker").click(function(){
    currMood = "thinker";
    songIndex = 0;
    currArrayChosen = thinker;
    loadAudio(currArrayChosen[songIndex], currMood);
    playAudio();
    close();
});




