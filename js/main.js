let y = 0; // scrollY
let prevY = 0; // Yより前のsectionの高さの合計
let currentScene = 0; //現在のsection
let newScene = false; //　新しいsceneに入ったらture

const sceneInfo = [
  //0
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
      canvas: document.querySelector('#video--canvas__0'),
      context: document.querySelector('#video--canvas__0').getContext('2d'),
      videoImages: [],
    },
    values: {
      videoImageCount: 300,
      imageSequence: [0, 299],
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
  //1
  {
    type: 'normal',
    // heightNum: 5,
    scrollHeight: 0,
    obj: {
      container: document.querySelector('#scroll--section__1'),
      content: document.querySelector('#scroll--section__1 .description'),
    },
  },
  //2
  {
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
      canvas: document.querySelector('#video--canvas__1'),
      context: document.querySelector('#video--canvas__1').getContext('2d'),
      videoImages: [],
    },
    values: {
      videoImageCount: 960,
      imageSequence: [0, 959],
      canvas_opacity__in: [0, 1, { start: 0, end: 0.1 }],
      canvas_opacity__out: [1, 0, { start: 0.95, end: 1 }],
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
  //3
  {
    type: 'sticky',
    heightNum: 5,
    scrollHeight: 0,
    obj: {
      container: document.querySelector('#scroll--section__3'),
      canvasCaption: document.querySelector('.canvas-caption'),
      canvas: document.querySelector('.image--blend__canvas'),
      context: document.querySelector('.image--blend__canvas').getContext('2d'),
      imagesPath: ['./images/blend1.jpeg', './images/blend2.jpeg'],
      images: [],
    },
    values: {
      rect1X: [0, 0, { start: 0, end: 0 }],
      rect2X: [0, 0, { start: 0, end: 0 }],
      rectStartY: 0,
    },
  },
];

function setCanvasImages() {
  let imgElem;
  for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
    imgElem = document.createElement('img');
    imgElem.src = `../video/001/IMG_${6726 + i}.JPG`;
    sceneInfo[0].obj.videoImages.push(imgElem);
  }
  let imgElem2;
  for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
    imgElem2 = document.createElement('img');
    imgElem2.src = `../video/002/IMG_${7027 + i}.JPG`;
    sceneInfo[2].obj.videoImages.push(imgElem2);
  }
  let imgElem3;
  for (let i = 0; i < sceneInfo[3].obj.imagesPath.length; i++) {
    imgElem3 = document.createElement('img');
    imgElem3.src = sceneInfo[3].obj.imagesPath[i];
    sceneInfo[3].obj.images.push(imgElem3);
  }
}
setCanvasImages();

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

  const heightRatio = window.innerHeight / 1080;
  sceneInfo[0].obj.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
  sceneInfo[2].obj.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
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
      let sequence = Math.round(calcValues(values.imageSequence, currentY));
      obj.context.drawImage(obj.videoImages[sequence], 0, 0);
      obj.canvas.style.opacity = calcValues(values.canvas_opacity, currentY);

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
      let sequence2 = Math.round(calcValues(values.imageSequence, currentY));
      obj.context.drawImage(obj.videoImages[sequence2], 0, 0);

      if (scrollRatio <= 0.5) {
        obj.canvas.style.opacity = calcValues(
          values.canvas_opacity__in,
          currentY
        );
      } else {
        obj.canvas.style.opacity = calcValues(
          values.canvas_opacity__out,
          currentY
        );
      }

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
      const heightRatio = window.innerHeight / obj.canvas.height;
      const widthRatio = window.innerWidth / obj.canvas.width;
      let canvasScaleRatio;

      if (widthRatio <= heightRatio) {
        canvasScaleRatio = heightRatio;
        // console.log('높기준');
      } else {
        canvasScaleRatio = widthRatio;
        // console.log('넢기준');
      }
      obj.canvas.style.transform = `scale(${canvasScaleRatio})`;
      obj.context.fillStyle = 'white';
      obj.context.drawImage(obj.images[0], 0, 0);

      const recalculatedInnerWidth = window.innerWidth / canvasScaleRatio;
      const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;
      if (!values.rectStartY) {
        // values.rectStartY = obj.canvas.getBoundingClientRect().top;
        values.rectStartY =
          obj.canvas.offsetTop +
          (obj.canvas.height - obj.canvas.height * canvasScaleRatio) / 2;
        // console.log(values.rectStartY);
        values.rect1X[2].start = window.innerHeight / 4 / scrollHeight;
        values.rect2X[2].start = window.innerHeight / 4 / scrollHeight;
        values.rect1X[2].end = values.rectStartY / scrollHeight;
        values.rect2X[2].end = values.rectStartY / scrollHeight;
        console.log(values.rect1X[2].end, values.rect2X[2].end);
      }

      const whiteRectWidth = recalculatedInnerWidth * 0.15;
      values.rect1X[0] = (obj.canvas.width - recalculatedInnerWidth) / 2;
      values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
      values.rect2X[0] =
        values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
      values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

      obj.context.fillRect(
        parseInt(calcValues(values.rect1X, currentY)),
        0,
        parseInt(whiteRectWidth),
        obj.canvas.height
      );
      obj.context.fillRect(
        parseInt(calcValues(values.rect2X, currentY)),
        0,
        parseInt(whiteRectWidth),
        obj.canvas.height
      );
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
window.addEventListener('load', () => {
  setLayout();
  sceneInfo[0].obj.context.drawImage(sceneInfo[0].obj.videoImages[0], 0, 0);
});
window.addEventListener('resize', setLayout);
