// Toggle classes
function toggleClass (el, className) {
  if (el.classList.contains(className)) {
    el.classList.remove(className);
  } else {
    el.classList.add(className);
  }
}

function accordian (e) {
  const el = this;
  const next = el.nextElementSibling;
  toggleClass(next, 'closed');
}

document.addEventListener('DOMContentLoaded', function () {
  var i;
  var titles = document.querySelectorAll('.autostyles-block-title');

  for (i = 0; i < titles.length; i++) {
    titles[i].addEventListener('click', accordian, false);
  }
});
