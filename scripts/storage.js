'use strict';
function saveToStorage(key, value) {
  return localStorage.setItem(key, value);
}

function getFromStorage(key) {
  return localStorage.getItem(key);
}