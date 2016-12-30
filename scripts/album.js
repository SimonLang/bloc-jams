var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { title: 'Blue', duration: '4:26' },
        { title: 'Green', duration: '3:14' },
        { title: 'Red', duration: '5:01' },
        { title: 'Pink', duration: '3:21'},
        { title: 'Magenta', duration: '2:15'}
    ]
};

// Another Example Album
var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { title: 'Hello, Operator?', duration: '1:01' },
        { title: 'Ring, ring, ring', duration: '5:01' },
        { title: 'Fits in your pocket', duration: '3:21'},
        { title: 'Can you hear me now?', duration: '3:14' },
        { title: 'Wrong phone number', duration: '2:15'}
    ]
};

//my third album
var albumTheHeavy= {
    title: 'The House that Dirt Built',
    artist: 'The Heavy',
    label: 'Counter Records',
    year: '2009',
    albumArtUrl: 'assets/images/album_covers/22.png',
    songs: [
        { title: 'The House That Dirt Built', duration: '0:19' },
        { title: 'Oh No! Not You Again!', duration: '1:58' },
        { title: 'How You Like Me Now', duration: '3:37'},
        { title: 'Sixteen', duration: '3:02' },
        { title: 'Short Change Hero', duration: '5:22'}
    ]
};

var createSongRow = function(songNumber, songName, songLength) {
    var template =
       '<tr class="album-view-song-item">'
     +  '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
     + '  <td class="song-item-title">' + songName + '</td>'
     + '  <td class="song-item-duration">' + songLength + '</td>'
     + '</tr>'
     ;

    var $row = $(template);

    var clickHandler = function() {
        var songNumber = $(this).attr('data-song-number');

        if (currentlyPlayingSong !== null) {
            // Revert to song number for currently playing song because user started playing new song.
            var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
            currentlyPlayingCell.html(currentlyPlayingSong);
        }
        if (currentlyPlayingSong !== songNumber) {
            // Switch from Play -> Pause button to indicate new song is playing.
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSong = songNumber;
        } else if (currentlyPlayingSong === songNumber) {
            // Switch from Pause -> Play button to pause currently playing song.
            $(this).html(playButtonTemplate);
            currentlyPlayingSong = null;
        }
    };

    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(playButtonTemplate);
        }
    };

    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(songNumber);
        }
    };

    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};


var setCurrentAlbum = function(album) {
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');

    // Assign values to each part of the album (text, images)

     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);

    // Clear contents of album song list container
    $albumSongList.empty();

    // Build list of songs from album song list JavaScript object
    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
};

//findParentByClassName code here
// Re-write the function so that it:
//Checks to see if a parent exists. If it doesn't, then show an alert that says "No parent found".
//Shows a different alert when it fails to find a parent with the given class name: "No parent found with that class name".
// var findParentByClassName = function(element, targetClass) {
//     if (element) {
//         var currentParent = element.parentElement;
//         if (currentParent === null) {
//             alert("No parent found");
//             return;
//         }
//         while (currentParent.className != targetClass){
//             currentParent = currentParent.parentElement;
//         }

//         if (currentParent === null) {
//             alert("No parent found with that class name");
//             return;
//         }
//         return currentParent;

//     }
// };

// //getSongItem() method code goes here
// var getSongItem = function (element) {
//     // console.log(element.className);
//         switch (element.className) {
//             case 'album-song-button':
//             case 'ion-play':
//             case 'ion-pause':
//                 return findParentByClassName(element, 'song-item-number');
//             case 'album-view-song-item':
//                 return element.querySelector('.song-item-number');
//             case 'song-item-title':
//             case 'song-item-duration':
//                 return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
//             case 'song-item-number':
//                 return element;
//             default:
//                 return;
//         }
// };

// var clickHandler = function(targetElement) {
//     var songItem = getSongItem(targetElement);

//     if (currentlyPlayingSong === null) {
//              songItem.innerHTML = pauseButtonTemplate;
//              currentlyPlayingSong = songItem.getAttribute('data-song-number');
//          } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
//           songItem.innerHTML = playButtonTemplate;
//           currentlyPlayingSong = null;
//           } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
//             var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
//             currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
//             songItem.innerHTML = pauseButtonTemplate;
//             currentlyPlayingSong = songItem.getAttribute('data-song-number');
//         }

// };

// var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
// var songRows = document.getElementsByClassName('album-view-song-item');

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs
var currentlyPlayingSong = null;


$(document).ready(function() {
    setCurrentAlbum(albumPicasso);

    // for (var i = 0; i < songRows.length; i++) {
             
    //     songRows[i].addEventListener('click', function(event) {
    //         clickHandler(event.target);
    //     });
    // }
});

    var albums = [albumPicasso, albumMarconi, albumTheHeavy];
    var index = 1;
    albumImage.addEventListener("click", function(event) {
        setCurrentAlbum(albums[index]);
        index++;
        if (index == albums.length){
            index = 0;
        }
    });






// album.covers.addEventListener('click', function(event) {
//     if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
//             animatePoints(pointsArray);
//         }
//  });
