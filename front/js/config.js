//on recupere le fichier config.json
async function loadConfig() {
  let result = await fetch("../config.json");
  return result.json();
}
