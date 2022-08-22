(function () {
    const car = document.querySelector('.car'),
          gameButton = document.querySelector('.play-btn');
    const trees = document.querySelectorAll('.tree');
    const speed = 3;

    let isPause = false;
    let animationId = null;

    const first = trees[0];

    animationId = requestAnimationFrame(startGame);
    function startGame () {
        treesAnimation();

        animationId = requestAnimationFrame(startGame);
    }

    function treesAnimation () { // анимация дерева
        const newCoord = getCoordY(first) + speed; // получаем координату дерева и добавляем какое-то число
        first.style.transform = `translateY(${newCoord}px)`; // перезаписываем новую координату
    }

    function getCoordY (element) { // функция для получения координаты Y элемента
        const matrix = window.getComputedStyle(element).transform; // получаем координаты дерева
        const array = matrix.split(','), // строчку с координатами делим на массив через запятую
          lastElement = array[array.length - 1], // достаём последнюю координату
          coordY = parseFloat(lastElement); // преобразование к числу

        return coordY;
    }

    gameButton.addEventListener('click', () => { // переключение кнопки пауза\продолжить
        isPause = !isPause;

        if (isPause) {
            cancelAnimationFrame(startGame);
            gameButton.children[0].style.display = 'none';
            gameButton.children[1].style.display = 'initial';
        } else {
            gameButton.children[0].style.display = 'initial';
            gameButton.children[1].style.display = 'none';
        }
    })
})();