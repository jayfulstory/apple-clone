let y = 0; // scrollY
let prevY = 0; // Yより前のsectionの高さの合計
let currentScene = 0; //現在のsection
let newScene = false; //　新しいsceneに入ったらture

const sceneInfo = [
  {
    type: 'sticky',
    heightNum: 5,
    scrollHeight: 0,
    obj: {
      container: document.querySelector('#scroll--section__0'),
      messageA: document.querySelector('#scroll--section__0 .main--message.a'),
      messageB: document.querySelector('#scroll--section__0 .main--message.b'),
      messageC: document.querySelector('#scroll--section__0 .main--message.c'),
      messageD: document.querySelector('#scroll--section__0 .main--message.d'),
    },
    values: {
      messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
      messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],

      messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],

      messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
      messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
    },
  },
  {
    type: 'nomal',
    heightNum: 5,
    scrollHeight: 0,
    obj: {
      container: document.querySelector('#scroll--section__1'),
    },
  },
  {
    type: 'sticky',
    heightNum: 5,
    scrollHeight: 0,
    obj: {
      container: document.querySelector('#scroll--section__2'),
    },
  },
  {
    type: 'sticky',
    heightNum: 5,
    scrollHeight: 0,
    obj: {
      container: document.querySelector('#scroll--section__3'),
    },
  },
];

function setLayout() {
  for (let i = 0; i < sceneInfo.length; i++) {
    sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * innerHeight;
    sceneInfo[i].obj.container.style.height = `${sceneInfo[i].scrollHeight}px`;
  }

  let totalScrollY = 0;
  for (let i = 0; i < sceneInfo.length; i++) {
    totalScrollY += sceneInfo[i].scrollHeight;
    if (totalScrollY >= y) {
      currentScene = i;
      break;
    }
  }
  document.body.setAttribute('id', `show--scene__${currentScene}`);
}

function calcValues(values, currentY) {
  let rv;
  const scrollHeight = sceneInfo[currentScene].scrollHeight;
  const scrollRatio = currentY / scrollHeight;
  if (values.length === 3) {
    // start　~ endの間のアニメーションを実装
    const aniStart = values[2].start * scrollHeight;
    const aniEnd = values[2].end * scrollHeight;
    const aniHeight = aniEnd - aniStart;
    if (y >= aniStart && y <= aniEnd) {
      rv = ((y - aniStart) / aniHeight) * (values[1] - values[0]) + values[0];
    } else if (y < aniStart) {
      rv = values[0];
    } else if (y > aniEnd) {
      rv = values[1];
    }
  } else {
    rv = scrollRatio * (values[1] - values[0]) + values[0];
  }
  return rv;
}

function playAnimation() {
  const obj = sceneInfo[currentScene].obj;
  const values = sceneInfo[currentScene].values;
  const currentY = y - prevY;
  const scrollHeight = sceneInfo[currentScene].scrollHeight;
  const scrollRatio = currentY / scrollHeight;

  switch (currentScene) {
    case 0:
      const messageA_opacity_in = calcValues(
        values.messageA_opacity_in,
        currentY
      );
      const messageA_opacity_out = calcValues(
        values.messageA_opacity_out,
        currentY
      );
      const messageA_translateY_in = calcValues(
        values.messageA_translateY_in,
        currentY
      );
      const messageA_translateY_out = calcValues(
        values.messageA_translateY_out,
        currentY
      );
      if (scrollRatio <= 0.22) {
        obj.messageA.style.opacity = messageA_opacity_in;
        obj.messageA.style.transform = `translateY(${messageA_translateY_in}%)`;
      } else {
        obj.messageA.style.opacity = messageA_opacity_out;
        obj.messageA.style.transform = `translateY(${messageA_translateY_out}%)`;
      }
      // console.log(currentScene, messageA_opacity_in);
      break;
    case 1:
      break;
    case 2:
      break;
    case 3:
      break;
  }
}

function scrollLoof() {
  newScene = false;
  prevY = 0;
  for (let i = 0; i < currentScene; i++) {
    prevY += sceneInfo[i].scrollHeight;
  }
  if (y > prevY + sceneInfo[currentScene].scrollHeight) {
    newScene = true;
    currentScene++;
    document.body.setAttribute('id', `show--scene__${currentScene}`);
  }
  if (y < prevY) {
    newScene = true;
    if (currentScene === 0) return;
    currentScene--;
    document.body.setAttribute('id', `show--scene__${currentScene}`);
  }
  if (newScene) return;
  playAnimation();
}

window.addEventListener('scroll', () => {
  y = scrollY;
  scrollLoof();
});

// window.addEventListener('DOMContentLoaded', setLayout);
window.addEventListener('load', setLayout);
window.addEventListener('resize', setLayout);
