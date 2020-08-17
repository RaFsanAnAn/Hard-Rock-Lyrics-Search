document.getElementById("searchBtn").addEventListener("click", () => {

    let songName = document.getElementById("songValue").value;
    document.getElementById('songResults').innerHTML = '';
    document.getElementById('lyrics').innerHTML = '';
    fetch(`https://api.lyrics.ovh/suggest/${songName}`)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < 10; i++) {
                const title = data.data[i].title;
                const artistName = data.data[i].artist.name;
                const albumCover = data.data[i].album.cover_small;
                const duration = data.data[i].duration;
                document.getElementById('songResults').innerHTML +=
                    `<div class="single-result row align-items-center my-3 p-3">
                 <div class="col-md-6">
                 <h3 class="lyrics-name">${title}</h3>
                 <p class="author lead">Album by <span>${artistName}</span></p>
                 <p class="text-white"> Duration: ${(duration / 60).toFixed(1)} minutes</p>
                 </div>
                 <div class="col-md-3 text-md-right text-center">
                 <img src= "${albumCover}" class="img-fluid">
                  </div>
                 <div class="col-md-3 text-md-right text-center">
                 <a href="#lyrics"><button onclick = "getLyrics('${artistName}','${title}')" class="btn btn-success">Get Lyrics</button></a>
                  </div>
                  </div>`

            }
        })
})


function getLyrics(artistName, title) {
        fetch(`https://api.lyrics.ovh/v1/${artistName}/${title}`)
            .then(res => res.json())
            .then(data => {
                let lyricsFull = data.lyrics;
                if (lyricsFull == undefined) {
                    lyricsFull = `Lyrics Not Found. :(`;
                }
                document.getElementById('lyrics').innerHTML =
                    `<div class="single-lyrics text-center">
                         <button class="btn go-back">&lsaquo;</button>
                         <h2 class="text-success mb-4">${title}</h2>
                         <h5 class="text-secondary mb-4">${artistName} </h3>
                         <pre class ="text-white"> ${lyricsFull} </pre>
                          </div>`

                document.getElementById('songResults').innerHTML = ""
            })
}
