import prompts from './prompts.json' assert { type: 'json' };
// prompts = ['a DSLR photo of a blue jay standing on a large basket of rainbow macarons', 'a zoomed out DSLR photo of a corgi wearing a top hat', 'a zoomed out DSLR photo of a baby bunny sitting on top of a stack of pancakes', 'a wide angle DSLR photo of a colorful rooster', 'a DSLR photo of a hippo wearing a sweater', 'a ripe strawberry', 'a highland cow', 'a hotdog in a tutu skirt', 'a lionfish', 'a squirrel dressed like Henry VIII king of England', 'a zoomed out DSLR photo of a fresh cinnamon roll covered in glaze', 'a flower made out of metal', 'a DSLR photo of a delicious croissant', 'a DSLR photo of a squirrel wearing a leather jacket', 'a DSLR photo of a pair of tan cowboy boots, studio lighting, product photography', 'a DSLR photo of a plush t-rex dinosaur toy, studio lighting, high resolution', 'a cute steampunk elephant', 'A photo of a cute mouse wearing a crown', 'A photo of an astronaut riding a horse in the forest', 'A cinematic shot of a little pig priest wearing sunglasses', 'a cinematic shot of robot with colorful feathers', 'a chimpanzee dressed as a football player', 'a vintage record player', 'a cocker spaniel wearing a crown', 'a dog made out of salad', 'a shiba inu playing golf wearing tartan golf clothes and hat', 'a robot tiger', 'a DSLR photo of a red-eyed tree frog', 'a zoomed out DSLR photo of a kangaroo sitting on a bench playing the accordion', 'a yorkie dog dressed as a maid', 'a humanoid robot lying on a couch using a laptop', 'Michelangelo style statue of an astronaut', 'a covered wagon', 'a frog wearing a sweater', 'an origami hippo in a river', 'a tiger waiter at a fancy restaurant', 'a beautiful rainbow fish', 'a yorkie dog eating a donut', 'a yorkie dog wearing extremely cool sneakers', 'a barbecue grill cooking sausages and burger patties', 'the titanic, aerial view', 'a woolly mammoth standing on ice', 'a teddy bear pushing a shopping cart full of fruits and vegetables', 'a bear dancing ballet', 'a DSLR photo of a squirrel-octopus hybrid', 'a DSLR photo of a very beautiful small organic scu…tudio lighting, High resolution, white background', 'a DSLR photo of a tarantula, highly detailed', 'a zoomed out DSLR photo of a brain in a jar', 'Wedding dress made of tentacles', 'a llama wearing a suit']

var total_num_videos = prompts.length;
var selectedReasons = []; // To store the selected reasons

var currentVideoId = 1;

function saveToFile() {
    selectedVideos = [];
    var selectedCheckbox = document.querySelector('input[name="which"]:checked');
    
    if (selectedCheckbox) {
        selectedVideos.push(selectedCheckbox.value);
    }

    selectedReasons = [];
    var checkboxes = document.querySelectorAll('input[name="reason"]:checked');
    checkboxes.forEach(function (checkbox) {
        selectedReasons.push(checkbox.value);
    });

    // Create a Blob with the selected data
    var blob = new Blob([`Selected Video: ${selectedVideos.join(", ")}\nReasons: ${selectedReasons.join(", ")}`], { type: "text/plain" });
    
    // Create a download link
    var downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "user_selection.txt";
    
    // Trigger the download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function replaceVideo(old_video_id, newVideoURL) {
    // Assuming you have a new video file URL
    var video = document.getElementById(old_video_id);

    // Remove existing source element
    while (video.firstChild) {
        video.removeChild(video.firstChild);
    }

    // Create a new source element with the new video file
    var source = document.createElement('source');
    source.src = newVideoURL;
    source.type = 'video/mp4';

    // Append the new source element to the video
    video.appendChild(source);

    video.play();
}

function parseVideoName(folder_name, videoId) {
    let text_prompt = prompts[videoId-1].replace(/ /g,"_").toLowerCase();
    return folder_name + text_prompt + '.mp4';
}

function showVideoAndPrompt(videoId) {
    replaceVideo('baseline_video', parseVideoName('assets/daydreamer-stage1-if-stage2-sd/', videoId));
    replaceVideo('our_video', parseVideoName('assets/daydreamer-stage1-if-stage2-sd/', videoId));
    changePrompt(videoId.toString() + '. ' + prompts[videoId-1]);
}

showVideoAndPrompt(1);

document.getElementById('nextVideoButton').addEventListener('click', function () {
        if (currentVideoId==total_num_videos) {
            return;
        } else {
            currentVideoId += 1;
            showVideoAndPrompt(currentVideoId);
        }
    });
document.getElementById('previousVideoButton').addEventListener('click', function () {
        if (currentVideoId==1) {
            return;
        } else {
            currentVideoId -= 1;
            showVideoAndPrompt(currentVideoId);
        }
    });
function changePrompt(prompt) {
    var textBlock = document.getElementById("prompt");
    textBlock.innerHTML = prompt
}