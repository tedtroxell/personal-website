(function () {
  'use strict';

  var root = document.querySelector('[data-blog-index]');
  if (!root) return;

  var tools = root.querySelector('[data-blog-tools]');
  var search = root.querySelector('[data-blog-search]');
  var items = Array.prototype.slice.call(root.querySelectorAll('[data-blog-item]'));
  var filters = Array.prototype.slice.call(root.querySelectorAll('[data-category]'));
  var results = root.querySelector('[data-blog-results]');
  var empty = root.querySelector('[data-blog-empty]');
  var clear = root.querySelector('[data-blog-clear]');
  var activeCategory = 'all';

  if (!tools || !search || !items.length || !results || !empty) return;
  tools.hidden = false;
  search.value = new URLSearchParams(location.search).get('s') || '';

  function update() {
    var query = search.value.trim().toLocaleLowerCase();
    var shown = 0;

    items.forEach(function (item) {
      var categories = (item.getAttribute('data-categories') || '').split(/\s+/);
      var text = (item.getAttribute('data-search') || '').toLocaleLowerCase();
      var matches = (!query || text.indexOf(query) !== -1) &&
        (activeCategory === 'all' || categories.indexOf(activeCategory) !== -1);
      item.hidden = !matches;
      if (matches) shown += 1;
    });

    root.classList.toggle('js-filtering', Boolean(query) || activeCategory !== 'all');
    empty.hidden = shown !== 0;
    results.textContent = (query || activeCategory !== 'all')
      ? shown + (shown === 1 ? ' note matches' : ' notes match') + ' on this page'
      : items.length + (items.length === 1 ? ' note on this page' : ' notes on this page');
  }

  filters.forEach(function (button) {
    button.addEventListener('click', function () {
      activeCategory = button.getAttribute('data-category') || 'all';
      filters.forEach(function (other) {
        var active = other === button;
        other.classList.toggle('is-active', active);
        other.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      update();
    });
  });

  search.addEventListener('input', update);
  if (clear) clear.addEventListener('click', function () {
    search.value = '';
    activeCategory = 'all';
    filters.forEach(function (button) {
      var active = button.getAttribute('data-category') === 'all';
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    search.focus();
    update();
  });

  document.addEventListener('keydown', function (event) {
    var target = event.target;
    var isTyping = target && (/INPUT|TEXTAREA|SELECT/.test(target.tagName) || target.isContentEditable);
    if (event.key === '/' && !isTyping && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      search.focus();
    }
    if (event.key === 'Escape' && target === search) {
      search.value = '';
      update();
      search.blur();
    }
  });

  update();
}());
