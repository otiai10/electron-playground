const { ipcRenderer } = require('electron');

const __onload__ = () => {
  const btn = document.querySelector('button#start-auth');
  btn.addEventListener('click', () => {
    btn.setAttribute('disabled', true);
    ipcRenderer.send('auth-start');
  });
  ipcRenderer.on('auth-success', (ev, tokens) => {
    console.log(ev, tokens);
    document.querySelector('div.logged-out').style.display = 'none';
    document.querySelector('div.logged-in').style.display = 'flex';
  });
  const input = document.querySelector('input[type=text]');
  input.addEventListener('keyup', (ev) => {
    console.log(ev.key);
    if (ev.key !== 'Enter') return;
    console.log(ev.target.value);
  });
};

window.onload = __onload__;
