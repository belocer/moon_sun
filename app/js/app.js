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
        this.window__shadow.style.boxShadow = `inset ${signX}${this.depth_shadow_first_level}px ${signY}${this.depth_shadow_first_level}px 40px rgba(0,0,0, 0.8), inset ${signX}${this.depth_shadow_second_level}px ${signY}${this.depth_shadow_second_level}px 50px rgba(0,0,0, 0.8)`;
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
})