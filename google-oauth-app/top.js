const { ipcRenderer, shell } = require('electron');
const SerchService = require('./search-service');

const __onload__ = () => {
  var service;
  const btn = document.querySelector('button#start-auth');
  btn.addEventListener('click', () => {
    btn.setAttribute('disabled', true);
    ipcRenderer.send('auth-start');
  });
  ipcRenderer.on('auth-success', async (ev, tokens) => {
    service = new SerchService(tokens);
    document.querySelector('div.logged-out').style.display = 'none';
    document.querySelector('div.logged-in').style.display = 'flex';
  });
  const input = document.querySelector('input[type=text]');
  input.addEventListener('keyup', async (ev) => {
    if (!service) return;
    if (ev.key !== 'Enter') return;
    const response = await service.search(ev.target.value);
    if (response.status != 200) return alert(`API response status: ${response.status}`);
    const {items} = await response.json();
    const entries = items.map(({ snippet, id: { videoId } }) => {
      const entry = document.querySelector('template#item').content.cloneNode(true);
      entry.querySelector('span.title').innerText = snippet.title;
      entry.querySelector('img.thumbnail').setAttribute('src', snippet.thumbnails.default.url);
      entry.querySelector('img.thumbnail').addEventListener('click', () => shell.openExternal(`https://youtu.be/${videoId}`));
      return entry;
    });
    document.querySelector('div#result').innerHTML = '';
    document.querySelector('div#result').append(...entries);
  });
};

window.onload = __onload__;
