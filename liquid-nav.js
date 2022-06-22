/* Hosted on codesandbox, timothy ricks liquid nav video notes in Roam */

// Declare variables up top
let menuLink = $(".menu_link");
let menuShape = $(".menu_shape");
let menuShapeBG = $(".menu_shape-background");
let currentLink = $(".menu_link.w--current");
let duration = 500;

//On click
menuLink.on("click", function (e) {
  e.preventDefault();
  setTimeout(() => {
    window.location = $(this).attr("href");
  }, duration);
  if ($(this).index() > currentLink.index()) {
    menuShape.css("justify-content", "flex-end");
  }
  menuShapeBG.css("transition", `width ${duration / 2}ms`);
  if ($(this).index() !== currentLink.index()) {
    menuShapeBG.css("width", "140%");
    setTimeout(() => {
      menuShapeBG.css("width", "100%");
    }, duration / 2);
  }
  menuShape.css("transition", `all ${duration}ms`);
  moveShape($(this));
});

function moveShape(target) {
  let linkWidth = target.innerWidth();
  let linkOffset = target.offset().left;
  let menuOffset = $(".menu").offset().left;
  let leftPosition = linkOffset - menuOffset;
  menuShape.css("width", linkWidth);
  menuShape.css("left", leftPosition);
}

moveShape(currentLink);
$(".menu_link-background").css("opacity", "0");
menuShape.css("opacity", "1");

window.on("resize", function () {
  moveShape(currentLink);
});

/* Unused 

window.addEventListener("resize", function () {
  moveShape(currentLink);
});

*/
