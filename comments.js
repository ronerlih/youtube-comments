
const KEY = "AIzaSyAlG_jmXy4OB5HMtbjUcbVrKDqn6FkWtCs"
let youtubeVideoUrl = "https://www.googleapis.com/youtube/v3/search?q=new%20york&key=" + KEY + "&part=snippet"
let commentThreadUrl = "https://www.googleapis.com/youtube/v3/commentThreads?key=" + KEY + "&part=snippet,replies";
const commentsContainer = document.getElementById("comments")

fetch(youtubeVideoUrl)
    .then(d => d.json())
    .then(videos => {
        videos.items.forEach((video, i) =>{
            console.log(video);
            
            if( i=== 0){
                
            const title = document.createElement("h4");
            title.textContent = video.snippet.title;
            
            const img = document.createElement("img");
            img.src= video.snippet.thumbnails.high.url
            commentsContainer.appendChild(title);
            commentsContainer.appendChild( img);

                commentThreadUrl += "&videoId=" + video.id.videoId
                fetch(commentThreadUrl)
                    .then(d => d.json())
                    .then(comments => {
                        console.log(comments.items);
                        comments.items.forEach(commentThread =>{
                            const vowels = ["a","e","i","o","u", "y"]
                            // console.log(commentThread.snippet.topLevelComment.snippet.textDisplay);
                            let comment = commentThread.snippet.topLevelComment.snippet.textDisplay.split("");
                            comment.forEach((char, i) => {
                                // if (!vowels.includes(char) && char != " "){
                                //     // comment[i] = "<span class='gray'>"+ char + "</span>";
                                //     comment[i] = "<span class='gray'>"+ char + "</span>";
                                // } else {
                                //     comment[i] = "<span class='vowel'>"+ char + "</span>";

                                // }
                                console.log(comment);
                            })
                            comment = comment.join("");
                            const p = document.createElement("p");
                            p.className = "comment"
                            p.innerHTML = comment;
                            commentsContainer.appendChild(p);

                        })
                    })

            }
        })

    })