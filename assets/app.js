(function () {
  "use strict";

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- copy protection ---------- */
  var allowCopy = false;
  var toast = null;
  var toastTimer = null;

  function warn(text) {
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "guard-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 1600);
  }

  function isField(el) {
    return !!el && (el.tagName === "TEXTAREA" || el.tagName === "INPUT");
  }

  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    warn("Копирование запрещено");
  });

  document.addEventListener("selectstart", function (e) {
    if (isField(e.target)) return;
    e.preventDefault();
  });

  document.addEventListener("dragstart", function (e) {
    if (e.target && e.target.tagName === "IMG") e.preventDefault();
  });

  document.addEventListener("copy", function (e) {
    if (allowCopy || isField(e.target)) return;
    e.preventDefault();
    warn("Копирование запрещено");
  });

  document.addEventListener("cut", function (e) {
    if (allowCopy || isField(e.target)) return;
    e.preventDefault();
    warn("Копирование запрещено");
  });

  document.addEventListener("keydown", function (e) {
    var key = (e.key || "").toLowerCase();
    var mod = e.ctrlKey || e.metaKey;
    var blocked = false;

    if (key === "f12") blocked = true;
    if (mod && !e.shiftKey && ["c", "x", "a", "u", "s"].indexOf(key) !== -1) blocked = true;
    if (mod && e.shiftKey && ["i", "j", "c", "k"].indexOf(key) !== -1) blocked = true;

    if (blocked) {
      e.preventDefault();
      warn("Копирование запрещено");
    }
  });

  /* ---------- SHA-256 copy button ---------- */
  var copy = document.getElementById("copySha");
  if (!copy) return;

  var label = copy.querySelector("span");
  var timer = null;

  function done() {
    label.textContent = "Скопировано";
    copy.classList.add("copied");
    clearTimeout(timer);
    timer = setTimeout(function () {
      label.textContent = "SHA-256";
      copy.classList.remove("copied");
    }, 1800);
  }

  function fallback(sha) {
    var ta = document.createElement("textarea");
    ta.value = sha;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    allowCopy = true;
    try { document.execCommand("copy"); done(); } catch (e) { /* ignore */ }
    allowCopy = false;
    document.body.removeChild(ta);
  }

  copy.addEventListener("click", function () {
    var sha = copy.getAttribute("data-sha") || "";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(sha).then(done).catch(function () { fallback(sha); });
    } else {
      fallback(sha);
    }
  });
})();
