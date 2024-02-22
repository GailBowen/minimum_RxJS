import { fromEvent } from 'rxjs';
import { map, switchMap, takeUntil, mergeMapTo } from 'rxjs/operators';

var parent = document.getElementById('parent');
var widget = document.getElementById('widget');

var mouseDowns = fromEvent(widget, 'mousedown');
var parentMouseMoves = fromEvent(parent, 'mousemove');
var parentMouseUps = fromEvent(parent, 'mouseup');

var drags = mouseDowns.pipe(
    switchMap(function(start) {
        return parentMouseMoves.pipe(
            map(function(move) {
                move.preventDefault(); // prevent default behavior of dragging
                return {
                    left: move.clientX - start.offsetX,
                    top: move.clientY - start.offsetY
                };
            }),
            takeUntil(parentMouseUps)
        );
    })
);

var subscription = drags.subscribe(
    function onNext(position) {
        console.log('Next:', position);
        widget.style.left = position.left + 'px';
        widget.style.top = position.top + 'px';
    },
    function onError(error) {
        console.log('Error:', error);
    },
    function onComplete() {
        console.log('Complete');
    }
);
