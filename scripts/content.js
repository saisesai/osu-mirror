function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getCurrentURL() {
  return window.location.href;
}

// https://osu.ppy.sh/beatmapsets/xxxxxx#xxx/xxxxxx
function getCurrentSongID() {
  let songID = getCurrentURL().match("/[0-9]+#")[0];
  songID = songID.replace("/", "").replace("#", "");
  return songID;
}

//https://txy1.sayobot.cn/beatmaps/download/novideo/xxxxxx?server=auto
function getSayoLink() {
  return (
    "https://txy1.sayobot.cn/beatmaps/download/novideo/" +
    getCurrentSongID() +
    "?server=auto"
  );
}

async function main() {
  // get download area
  let downloadArea = undefined;
  while (!downloadArea) {
    console.log("failed to get download area, retry in 100ms");
    downloadArea = document.getElementsByClassName(
      "beatmapset-header__buttons"
    )[0];
    await sleep(100);
  }
  // get download template
  const downloadTemplate = downloadArea.getElementsByClassName(
    "btn-osu-big--beatmapset-header"
  )[0];
  // create sayo downlad
  const downloadSayo = downloadTemplate.cloneNode(true);
  downloadSayo.getElementsByClassName("btn-osu-big__text-top")[0].innerHTML =
    "Sayo镜像";
  if (downloadSayo.getElementsByClassName("btn-osu-big__text-bottom")[0]) {
    downloadSayo.getElementsByClassName(
      "btn-osu-big__text-bottom"
    )[0].innerHTML = "不包含视频";
  }
  downloadSayo.href = getSayoLink();
  // append to download area
  downloadArea.appendChild(downloadSayo);
}

main();
