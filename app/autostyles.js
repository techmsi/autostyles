document.addEventListener('DOMContentLoaded', function () {
  var titles = document.querySelectorAll('.autostyles-block-title');
  for (var i = 0; i < titles.length; i++) {
    titles[i].addEventListener('click', accordian, false);
  }
});

function accordian(e) {
  var el = this,
  next = el.nextElementSibling;
  toggleClass(next, 'closed');
}

// Toggle classes
function toggleClass(el, className) {
  if (el.classList.contains(className)) {
    el.classList.remove(className);
  } else {
    el.classList.add(className);
  }
}
