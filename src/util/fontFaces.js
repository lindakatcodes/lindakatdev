const birthstoneFontFace = new FontFace(
  "Birthstone",
  "url(https://fonts.gstatic.com/s/birthstone/v14/8AtsGs2xO4yLRhy87sv_LL7zjA.woff2)"
);

document.fonts.add(birthstoneFontFace);

birthstoneFontFace.load().then(() => {
  document.body.classList.add("script-font-loaded");
});
