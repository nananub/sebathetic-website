
  document.addEventListener('DOMContentLoaded', () => {
    const clickSound = document.getElementById('click-sound');
    // play on every click
    document.addEventListener('click', () => {
      clickSound.currentTime = 0;
      clickSound.play();
    });
  });

/* audio eye button */
document.addEventListener('DOMContentLoaded', () => {
  const btn   = document.getElementById('music-toggle');
  const audio = document.getElementById('bg-music');
  let playing = false;
  btn.addEventListener('click', () => {
    if (playing) {
      audio.pause();
      btn.src = 'images/eye2.png';
    } else {
      audio.play();
      btn.src = 'images/eye1.png';
    }
    playing = !playing;
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.frog-container');
  const frog1     = container.querySelector('.frog-img');
  const frog2     = container.querySelector('.frog-overlay');
  const interval  = 200;   
  const maxFlips  = 10;    

  container.addEventListener('click', () => {
    let count = 0;
    container.classList.add('distort');

    frog1.style.opacity = '0';
    frog2.style.opacity = '1';

    const iv = setInterval(() => {
      if (count % 2 === 1) {
        frog1.style.opacity = '1';
        frog2.style.opacity = '0';
      } else {
        frog1.style.opacity = '0';
        frog2.style.opacity = '1';
      }
      count++;

      if (count >= maxFlips) {
        clearInterval(iv);
        frog1.style.opacity = '';
        frog2.style.opacity = '';
        container.classList.remove('distort');
      }
    }, interval);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.guitar-container');
  container.addEventListener('click', () => {
    container.classList.toggle('shake');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.seby-container');
  container.addEventListener('click', () => {
    container.classList.toggle('distort');
  });
});

// click animation for texts
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[class^="text-content"]').forEach(block => {
    block.querySelectorAll('p > span').forEach(lineSpan => {
      const text = lineSpan.textContent;
      const letters = Array.from(text);
      lineSpan.innerHTML = letters.map(ch =>
        ch === ' ' ? ' ' : `<span class="letter">${ch}</span>`
      ).join('');
    });
  });

  document.querySelectorAll('[class^="text-content"]').forEach(block => {
    block.addEventListener('click', () => {
      block.classList.add('clicked');
      setTimeout(() => block.classList.remove('clicked'), 3000);
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.hand-container');
  const h1 = container.querySelector('.hand');            // hand1
  const h2 = container.querySelector('.hand-overlay1');   // hand2
  const h3 = container.querySelector('.hand-overlay2');   // hand3
  const h4 = container.querySelector('.hand-overlay3');   // hand4
  const h5 = container.querySelector('.hand-overlay4');   // hand5


  function show(frame) {
    [h1, h2, h3, h4, h5].forEach(img => {
      img.style.opacity = img === frame ? '1' : '0';
    });
  }

  // (re)start the infinite 1<->2 cycle
  function restartCycle() {
    // clear any inline styles
    [h1, h2, h3, h4, h5].forEach(img => {
      img.style.opacity   = '';
      img.style.animation = '';
      img.style.filter    = '';
    });
    // kick off the CSS keyframe cycle on hand1/hand2
    h1.style.animation = 'cycle1to2-base 1.2s steps(1) infinite';
    h2.style.animation = 'cycle1to2-overlay 1.2s steps(1) infinite';
  }

  // initialize on load
  restartCycle();

  // hover logic is handled in CSS; here's click + sequence
  container.addEventListener('click', () => {
    // stop the 1<->2 animations & go straight to hand3
    h1.style.animation = '';
    h2.style.animation = '';
    show(h3);

    // after 0.5s → hand4
    setTimeout(() => {
      show(h4);
      // after another 0.5s → hand5
      setTimeout(() => {
        show(h5);
        // after another 0.5s → back to hand3
        setTimeout(() => {
          show(h3);
          // you may want to leave it on hand3 until mouseleave
        }, 500);
      }, 500);
    }, 500);
  });

  // when the pointer leaves, reset everything
  container.addEventListener('mouseleave', () => {
    restartCycle();
  });
});
