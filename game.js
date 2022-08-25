(function () {
    const car = document.querySelector('.car'),
          gameButton = document.querySelector('.play-btn');
    const trees = document.querySelectorAll('.tree');
    const speed = 3;

    let isPause = false; // пауза
    let animationId = null; // номер анимации (для цикла)

    const first = trees[0];
    const coordsTree = getCoords(first); // получаем координаты дерева

    animationId = requestAnimationFrame(startGame);
    function startGame () {
        treesAnimation();
        animationId = requestAnimationFrame(startGame);
    }

    function treesAnimation () { // анимация дерева
        coordsTree.y += speed; // получаем координату Y дерева и добавляем какое-то число
        first.style.transform = `translate(${coordsTree.x}px, ${coordsTree.y}px)`; // перезаписываем новые координаты
    }

    function getCoords (element) { // функция для получения координат деревьев
        const matrix = window.getComputedStyle(element).transform; // получаем координаты дерева
        const array = matrix.split(','), // строчку с координатами делим на массив через запятую
          y = array[array.length - 1], 
          x = array[array.length - 2],
          coordY = parseFloat(y), // преобразование к числу
          coordX = parseFloat(x);

        return {x: coordX, y: coordY};
    }

    gameButton.addEventListener('click', () => { // переключение кнопки пауза\продолжить
        isPause = !isPause;

        if (isPause) {
            cancelAnimationFrame(animationId);
            gameButton.children[0].style.display = 'none';
            gameButton.children[1].style.display = 'initial';
        } else {
            animationId = requestAnimationFrame(startGame);
            gameButton.children[0].style.display = 'initial';
            gameButton.children[1].style.display = 'none';
        }
    })
})();