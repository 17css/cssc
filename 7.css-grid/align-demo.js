(function(){
    let gridAlignDemo = [
        { justifyItems: 'start', alignItems: 'center' },
        { justifyItems: 'start', alignItems: 'start' },
        { justifyItems: 'center', alignItems: 'start' },
        { justifyItems: 'end', alignItems: 'start' },
        { justifyItems: 'end', alignItems: 'center' },
        { justifyItems: 'end', alignItems: 'end' },
        { justifyItems: 'center', alignItems: 'end' },
        { justifyItems: 'start', alignItems: 'end' },
        { justifyItems: 'stretch', alignItems: 'center' },
        { justifyItems: 'center', alignItems: 'stretch' },
        { justifyItems: 'stretch', alignItems: 'stretch' }
    ];
    let myGrid = document.getElementById('my-grid');
    let alignPos = 0;

    let gridItemMove = function(){
        if(alignPos<gridAlignDemo.length) {
            myGrid.style.justifyItems = gridAlignDemo[alignPos].justifyItems;
            myGrid.style.alignItems = gridAlignDemo[alignPos].alignItems;
            alignPos++;
        } else {
            alignPos = 0;
        }
    }

    document.addEventListener('keypress', (event) => {
        const keyName = event.key;

        switch (keyName) {
            case 'z':
                gridItemMove();
                break;
        }
    });
})();