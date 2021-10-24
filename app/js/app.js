class Box3D {
    constructor(obj) {
        this.varDebounce = 0; // ТаймАут срабатывания всей анимации
        this.сountdownAnim = 0; // ТаймАут срабатывания всей анимации
        this.card = document.querySelector(obj.card); // Анимируемый блок
        this.shift_wrap = document.querySelector(obj.shift_wrap); // Блок сдвига
        this.depth_shadow_first_level = obj.depth_shadow_first_level || 17; // Глубина тень первый уровень
        this.depth_shadow_second_level = obj.depth_shadow_second_level || 22; // Глубина тень второй уровень
        this.window__shadow = document.querySelector(obj.window__shadow); // Внутренняя тень
        this.card__container = document.querySelector(obj.card__container); // Блок контейнер
        this.tiltAngle = obj.tiltAngle || 10; // угол отклонения в градусах
        this.card__container.addEventListener('mousemove', this.mainAnimate.bind(this));
    }

    clearTagStyle(el) {
        el.forEach(item => item.removeAttribute('style'));
    }

    mainAnimate(e) {
        clearTimeout(this.varDebounce);
        clearTimeout(this.сountdownAnim);
        this.varDebounce = setTimeout(() => {
            let rect = e.target.getBoundingClientRect();
            let offset_x = e.offsetX || e.layerX
            let offset_y = e.offsetY || e.layerY
            let x = 100 * offset_x / rect.width;
            let y = 100 * offset_y / rect.height;

            if (x < 50 && y < 50) { // Левый верхний угол
                this.elementDirectionalShift(this.tiltAngle, -this.tiltAngle)
                this.shift_wrap.style.left = '-7px';
                this.shift_wrap.style.top = '-7px';
            } else if (x > 50 && y < 50) { // Правый верхний угол
                this.elementDirectionalShift(this.tiltAngle, this.tiltAngle, '-', '')
                this.shift_wrap.style.left = '-30px';
                this.shift_wrap.style.top = '0';
            } else if (x < 50 && y > 50) { // Левый нижний угол
                this.elementDirectionalShift(-this.tiltAngle, -this.tiltAngle, '', '-')
                this.shift_wrap.style.left = '0';
                this.shift_wrap.style.top = '-30px';
            } else if (x > 50 && y > 50) { // Правый нижний угол
                this.elementDirectionalShift(-this.tiltAngle, this.tiltAngle, '-', '-')
                this.shift_wrap.style.left = '-30px';
                this.shift_wrap.style.top = '-30px';
            }

        }, 1);

        this.сountdownAnim = setTimeout(() => {
            this.clearTagStyle([this.card])
            this.clearTagStyle([this.shift_wrap])
            this.clearTagStyle([this.window__shadow])
        }, 2000)
    }

    elementDirectionalShift(x, y, signX = '', signY = '') {
        this.card.style.transform = `perspective(1200px) rotateX(${x}deg) rotateY(${y}deg) translateZ(0)`;
        this.window__shadow.style.boxShadow = `inset ${signX}${this.depth_shadow_first_level}px ${signY}${this.depth_shadow_first_level}px 40px rgba(0,0,0, 0.7), inset ${signX}${this.depth_shadow_second_level}px ${signY}${this.depth_shadow_second_level}px 50px rgba(0,0,0, 0.7)`;
    }
}

window.addEventListener('load', () => {
    let obg_card = {
        card: '.moon-sun__window', // Анимируемый блок
        card__container: '.moon-sun__container', // Блок контейнер
        shift_wrap: '.shift_wrap', // Блок для сдвига
        window__shadow: '.window__shadow', // Блок тени
        tiltAngle: 8, // угол отклонения в градусах
        depth_shadow_first_level: 15, // угол отклонения в градусах
        depth_shadow_second_level: 20, // угол отклонения в градусах
    };
    new Box3D(obg_card);

    let ellipse_moon = document.querySelectorAll('.ellipse_moon');
    let ellipse_sun = document.querySelectorAll('.ellipse_sun');
    let moon_stars = document.querySelector('.moon_stars');
    let sun1 = document.querySelector('.sun1');
    let clouds = document.querySelector('.clouds');
    let birds = document.querySelector('.birds');
    let sea = document.querySelector('.sea');
    let mountain_far = document.querySelector('.mountain_far');
    let mountain = document.querySelector('.mountain');
    let forest = document.querySelector('.forest');
    let bg = document.querySelector('#bg');

    startSun();

    function startSun() {

        bg.animate([
            {background: 'url(./img/dest/main_bg1.webp)', backgroundSize: 'cover', opacity: '1'},
            {background: 'url(./img/dest/main_bg2.webp)', backgroundSize: 'cover', opacity: '0'},
            {background: 'url(./img/dest/main_bg2.webp)', backgroundSize: 'cover', opacity: '1'},
        ], {
            delay: 500,
            duration: 500,
            fill: 'forwards',
            easing: 'ease-in-out',
        });

        ellipse_sun.forEach((item, index) => {
            setTimeout(() => {
                let res;
                res = item.animate([{left: 0}], {
                    delay: 500,
                    duration: 500,
                    fill: 'forwards',
                    easing: 'ease-in-out',
                });
                res.addEventListener('finish', () => {
                    setTimeout(() => {
                        item.animate([{transform: 'translateZ(0)'}], {
                            duration: 500,
                            fill: 'forwards',
                        });
                    }, 600);
                });
            }, index * 250);
        });

        setTimeout(() => {
            sun1.animate([{opacity: 1, top: 0}], {
                delay: 500,
                duration: 500,
                fill: 'forwards',
            });
        }, 1500);

        setTimeout(() => {
            clouds.animate([{top: 0}], {
                duration: 1500,
                fill: 'forwards',
                easing: 'ease-in-out',
            });
        }, 2200);

        setTimeout(() => {
            birds.animate([{left: 0}], {
                duration: 1500,
                fill: 'forwards',
            });
        }, 2600);

        setTimeout(() => {
            mountain_far.animate([{bottom: 0}], {
                duration: 1000,
                fill: 'forwards',
                easing: 'ease-in-out',
            });
        }, 3000);

        setTimeout(() => {
            sea.animate([{bottom: 0}], {
                duration: 1000,
                fill: 'forwards',
                easing: 'ease-in-out',
            });
        }, 3400);

        setTimeout(() => {
            mountain.animate([{right: 0}], {
                duration: 1000,
                fill: 'forwards',
                easing: 'ease-in-out',
            });
        }, 3800);

        setTimeout(() => {
            forest.animate([{left: 0}], {
                duration: 1000,
                fill: 'forwards',
                easing: 'ease-in-out',
            });
            setTimeout(() => finishSun(), 7000)
        }, 4200);
    }

    function finishSun() {
        setTimeout(() => {
            forest.animate([{left: '-100%'}], {
                duration: 1000,
                fill: 'forwards',
                easing: 'ease-in-out',
            });
        }, 3700);

        ellipse_sun.forEach((item, index) => {
            setTimeout(() => {
                let res = item.animate([{transform: 'translateZ(-100px)'}], {
                    duration: 500,
                    fill: 'forwards',
                    composite: 'add',
                });

                res.addEventListener('finish', () => {
                    setTimeout(() => {
                        item.animate([{left: '-100%'}], {
                            delay: 500,
                            duration: 500,
                            fill: 'forwards',
                            easing: 'ease-in-out',
                            composite: 'add',
                        });
                    }, 600);
                });
            }, index * 250);
        });

        setTimeout(() => {
            sun1.animate([{opacity: 0, top: '-100%'}], {
                duration: 500,
                fill: 'forwards',
            });
        }, 3000);

        setTimeout(() => {
            clouds.animate([{top: '-100%'}], {
                duration: 1500,
                fill: 'forwards',
                easing: 'ease-in-out',
            });
        }, 2500);

        setTimeout(() => {
            birds.animate([{left: '-100%'}], {
                duration: 1750,
                fill: 'forwards',
            });
        }, 2200);

        setTimeout(() => {
            sea.animate([{bottom: '-100%'}], {
                duration: 1000,
                fill: 'forwards',
                easing: 'ease-in-out',
            });
        }, 1900);

        setTimeout(() => {
            mountain_far.animate([{bottom: '-100%'}], {
                duration: 1000,
                fill: 'forwards',
                easing: 'ease-in-out',
            });
        }, 1600);

        setTimeout(() => {
            mountain.animate([{right: '-100%'}], {
                duration: 1000,
                fill: 'forwards',
                easing: 'ease-in-out',
            });
        }, 1300);
        setTimeout(() => {
            let resAnim = forest.animate([{left: '-100%'}], {
                duration: 1000,
                fill: 'forwards',
                easing: 'ease-in-out',
            });
            setTimeout(() => startMoon(), 3000)
        }, 1000);
    }

    function startMoon() {
        bg.animate([
            {background: 'url(./img/dest/main_bg2.webp)', backgroundSize: 'cover', opacity: '1'},
            {background: 'url(./img/dest/main_bg1.webp)', backgroundSize: 'cover', opacity: '0'},
            {background: 'url(./img/dest/main_bg1.webp)', backgroundSize: 'cover', opacity: '1'},
        ], {
            delay: 500,
            duration: 500,
            fill: 'forwards',
            easing: 'ease-in-out',
        });

        ellipse_moon.forEach((item, index) => {
            setTimeout(() => {
                let res;
                res = item.animate([{right: 0}], {
                    delay: 500,
                    duration: 500,
                    fill: 'forwards',
                    easing: 'ease-in-out',
                });
                res.addEventListener('finish', () => {
                    setTimeout(() => {
                        item.animate([{transform: 'translateZ(0)'}], {
                            duration: 500,
                            fill: 'forwards',
                        });
                    }, 600);
                });
            }, index * 250);
        });

        setTimeout(() => {
            moon_stars.animate([{opacity: 1, top: 0}], {
                delay: 500,
                duration: 500,
                fill: 'forwards',
            });
        }, 2300);

        setTimeout(() => {
            mountain_far.animate([{bottom: 0, filter: 'brightness(.5)'}], {
                duration: 1000,
                fill: 'forwards',
                easing: 'ease-in-out',
            });
        }, 2700);

        setTimeout(() => {
            sea.animate([{bottom: 0, filter: 'brightness(.5)'}], {
                duration: 1000,
                fill: 'forwards',
                easing: 'ease-in-out',
            });
        }, 3000);

        setTimeout(() => {
            mountain.animate([{right: 0, filter: 'brightness(.5)'}], {
                duration: 1000,
                fill: 'forwards',
                easing: 'ease-in-out',
            });
        }, 3300);

        setTimeout(() => {
            forest.animate([{left: 0}], {
                duration: 1000,
                fill: 'forwards',
                easing: 'ease-in-out',
            });
            setTimeout(() => finishMoon(), 7000);
        }, 3700);
    }

    function finishMoon() {
        ellipse_moon.forEach((item, index) => {
            setTimeout(() => {
                let res = item.animate([{transform: 'translateZ(-100px)'}], {
                    duration: 500,
                    fill: 'forwards',
                    composite: 'add',
                });

                res.addEventListener('finish', () => {
                    setTimeout(() => {
                        item.animate([{right: '-100%'}], {
                            delay: 500,
                            duration: 500,
                            fill: 'forwards',
                            easing: 'ease-in-out',
                            composite: 'add',
                        });
                    }, 600);
                });
            }, index * 350);
        });

        setTimeout(() => {
            moon_stars.animate([{opacity: 0, top: '-100%'}], {
                delay: 500,
                duration: 500,
                fill: 'forwards',
            });
        }, 1700);


        setTimeout(() => {
            sea.animate([{bottom: '-100%', filter: 'brightness(1)'}], {
                duration: 1000,
                fill: 'forwards',
                easing: 'ease-in-out',
            });
        }, 1900);

        setTimeout(() => {
            mountain_far.animate([{bottom: '-100%', filter: 'brightness(1)'}], {
                duration: 1000,
                fill: 'forwards',
                easing: 'ease-in-out',
            });
        }, 1600);

        setTimeout(() => {
            mountain.animate([{right: '-100%', filter: 'brightness(1)'}], {
                duration: 1000,
                fill: 'forwards',
                easing: 'ease-in-out',
            });
        }, 1300);

        setTimeout(() => {
            forest.animate([{left: '-100%'}], {
                duration: 1000,
                fill: 'forwards',
                easing: 'ease-in-out',
            });
            setTimeout(() => startSun(), 3000)
        }, 1000);
    }
});