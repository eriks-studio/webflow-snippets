// this is loading gsap and custom ease from gsap - 'start now' on home page
src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js"
src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/CustomEase.min.js"

//in webflow all the following would be between <script> </script> 
let counter = {
	value: 0
};


let loaderDuration = 7;
// via GSAP ease visualizer -- https://greensock.com/ease-visualizer/ -- setting to variable to use multiple times. Be careful not to custom drag a node so that it goes above the end point, I was accidentally sending the value to 101 and then back to 100
let customEase = "M0,0 C0.068,0.208 0.083,0.351 0.166,0.498 0.234,0.619 0.456,0.678 0.528,0.746 0.591,0.805 0.644,0.853 0.693,0.89 0.793,0.967 0.877,1 1,1";

function updateLoaderText() {
    let progress = Math.round(counter.value);
	$('.loader_counter-text').text(progress);
};

let tl = gsap.timeline({onComplete: endLoaderAnimation});
tl.to(counter, {
    onUpdate: updateLoaderText,
	value: 100,
	duration: loaderDuration,
    ease: CustomEase.create("custom", customEase)
});
tl.to(".loader_progress-bar", {
    width: "100%",
    duration: loaderDuration,
    ease: CustomEase.create("custom", customEase)
}, 0);
// 0 passed in at the end so that the two actions happen at the same time

// this checks if they've ever visited this site before in this tab
if (sessionStorage.getItem("visited") !== null) {
    loaderDuration = 2;
    counter = {
        value: 75
    };
} 
sessionStorage.setItem("visited", "true");

// this is a clever way to start a webflow animation -- in webflow the animation is set up to start on click, and we do the click via javascript, and it happens after the GSAP animation finishes, line 18
function endLoaderAnimation() {
    $(".trigger").click();
};
