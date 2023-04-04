
// Get the modal element
var modal = document.getElementById('modal');

// Get the link that opens the modal
var modalLink = document.getElementById('about-link');

// When the user clicks the link, open the modal
modalLink.onclick = function() {
  modal.style.display = 'block';
  return false;
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

// Get the close icon element
var closeIcon = document.querySelector("#modal .close");

// When the user clicks the close icon, hide the modal
closeIcon.addEventListener("click", function() {
  modal.style.display = "none";
});

