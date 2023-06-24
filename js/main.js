let y = 0; // scrollY
let prevY = 0; // Yより前のsectionの高さの合計
let currentScene = 0; //現在のsection
let newScene = false; //　新しいsceneに入ったらture

const sceneInfo = [
  {
    //0
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
      canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
      messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
      messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
      messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
      messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
      messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
      messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
      messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
      messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
      messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
      messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
      messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
      messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
      messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
      messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
      messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
      messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
    },
  },
  {
    //1
    type: 'normal',
    // heightNum: 5,
    scrollHeight: 0,
    obj: {
      container: document.querySelector('#scroll--section__1'),
      content: document.querySelector('#scroll--section__1 .description'),
    },
  },
  {
    //2
    type: 'sticky',
    heightNum: 5,
    scrollHeight: 0,
    obj: {
      container: document.querySelector('#scroll--section__2'),
      messageA: document.querySelector('#scroll--section__2 .a'),
      messageB: document.querySelector('#scroll--section__2 .b'),
      messageC: document.querySelector('#scroll--section__2 .c'),
      pinB: document.querySelector('#scroll--section__2 .b .pin'),
      pinC: document.querySelector('#scroll--section__2 .c .pin'),
    },
    values: {
      messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
      messageB_translateY_in: [30, 0, { start: 0.5, end: 0.55 }],
      messageC_translateY_in: [30, 0, { start: 0.72, end: 0.77 }],
      messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
      messageB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
      messageC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
      messageA_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
      messageB_translateY_out: [0, -20, { start: 0.58, end: 0.63 }],
      messageC_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
      messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
      messageB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
      messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
      pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
      pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
      pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
      pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
      pinB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
      pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
    },
  },
  {
    //3
    type: 'sticky',
    heightNum: 5,
    scrollHeight: 0,
    obj: {
      container: document.querySelector('#scroll--section__3'),
      canvasCaption: document.querySelector('.canvas-caption'),
    },
    values: {},
  },
];

function setLayout() {
  for (let i = 0; i < sceneInfo.length; i++) {
    if (sceneInfo[i].type === 'sticky') {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * innerHeight;
    } else if (sceneInfo[i].type === 'normal') {
      sceneInfo[i].scrollHeight = sceneInfo[i].obj.container.offsetHeight;
    }
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
    if (currentY >= aniStart && currentY <= aniEnd) {
      rv =
        ((currentY - aniStart) / aniHeight) * (values[1] - values[0]) +
        values[0];
    } else if (currentY < aniStart) {
      rv = values[0];
    } else if (currentY > aniEnd) {
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
      if (scrollRatio <= 0.22) {
        obj.messageA.style.opacity = calcValues(
          values.messageA_opacity_in,
          currentY
        );
        obj.messageA.style.transform = `translateY(${calcValues(
          values.messageA_translateY_in,
          currentY
        )}%)`;
      } else {
        obj.messageA.style.opacity = calcValues(
          values.messageA_opacity_out,
          currentY
        );
        obj.messageA.style.transform = `translateY(${calcValues(
          values.messageA_translateY_out,
          currentY
        )}%)`;
      }

      if (scrollRatio <= 0.42) {
        obj.messageB.style.opacity = calcValues(
          values.messageB_opacity_in,
          currentY
        );
        obj.messageB.style.transform = `translateY(${calcValues(
          values.messageB_translateY_in,
          currentY
        )}%, 0)`;
      } else {
        obj.messageB.style.opacity = calcValues(
          values.messageB_opacity_out,
          currentY
        );
        obj.messageB.style.transform = `translate3d(0, ${calcValues(
          values.messageB_translateY_out,
          currentY
        )}%, 0)`;
      }

      if (scrollRatio <= 0.62) {
        obj.messageC.style.opacity = calcValues(
          values.messageC_opacity_in,
          currentY
        );
        obj.messageC.style.transform = `translate3d(0, ${calcValues(
          values.messageC_translateY_in,
          currentY
        )}%, 0)`;
      } else {
        obj.messageC.style.opacity = calcValues(
          values.messageC_opacity_out,
          currentY
        );
        obj.messageC.style.transform = `translate3d(0, ${calcValues(
          values.messageC_translateY_out,
          currentY
        )}%, 0)`;
      }

      if (scrollRatio <= 0.82) {
        obj.messageD.style.opacity = calcValues(
          values.messageD_opacity_in,
          currentY
        );
        obj.messageD.style.transform = `translate3d(0, ${calcValues(
          values.messageD_translateY_in,
          currentY
        )}%, 0)`;
      } else {
        obj.messageD.style.opacity = calcValues(
          values.messageD_opacity_out,
          currentY
        );
        obj.messageD.style.transform = `translate3d(0, ${calcValues(
          values.messageD_translateY_out,
          currentY
        )}%, 0)`;
      }
      break;
    // case 1:
    //   break;
    case 2:
      if (scrollRatio <= 0.25) {
        obj.messageA.style.opacity = calcValues(
          values.messageA_opacity_in,
          currentY
        );
        obj.messageA.style.transform = `translate3d(0, ${calcValues(
          values.messageA_translateY_in,
          currentY
        )}%, 0)`;
      } else {
        obj.messageA.style.opacity = calcValues(
          values.messageA_opacity_out,
          currentY
        );
        obj.messageA.style.transform = `translate3d(0, ${calcValues(
          values.messageA_translateY_out,
          currentY
        )}%, 0)`;
      }

      if (scrollRatio <= 0.57) {
        obj.messageB.style.transform = `translate3d(0, ${calcValues(
          values.messageB_translateY_in,
          currentY
        )}%, 0)`;
        obj.messageB.style.opacity = calcValues(
          values.messageB_opacity_in,
          currentY
        );
        obj.pinB.style.transform = `scaleY(${calcValues(
          values.pinB_scaleY,
          currentY
        )})`;
      } else {
        obj.messageB.style.transform = `translate3d(0, ${calcValues(
          values.messageB_translateY_out,
          currentY
        )}%, 0)`;
        obj.messageB.style.opacity = calcValues(
          values.messageB_opacity_out,
          currentY
        );
        obj.pinB.style.transform = `scaleY(${calcValues(
          values.pinB_scaleY,
          currentY
        )})`;
      }

      if (scrollRatio <= 0.83) {
        obj.messageC.style.transform = `translate3d(0, ${calcValues(
          values.messageC_translateY_in,
          currentY
        )}%, 0)`;
        obj.messageC.style.opacity = calcValues(
          values.messageC_opacity_in,
          currentY
        );
        obj.pinC.style.transform = `scaleY(${calcValues(
          values.pinC_scaleY,
          currentY
        )})`;
      } else {
        obj.messageC.style.transform = `translate3d(0, ${calcValues(
          values.messageC_translateY_out,
          currentY
        )}%, 0)`;
        obj.messageC.style.opacity = calcValues(
          values.messageC_opacity_out,
          currentY
        );
        obj.pinC.style.transform = `scaleY(${calcValues(
          values.pinC_scaleY,
          currentY
        )})`;
      }

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
