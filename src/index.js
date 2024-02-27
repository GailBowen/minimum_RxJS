import { fromEvent } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

var parent = document.getElementById('parent');
var widget = document.getElementById('widget');

var parentPosition = parent.getBoundingClientRect();
var parentWidth = parentPosition.width;
var parentHeight = parentPosition.height;

var parentX = parentPosition.x;
var parentY = parentPosition.y;

var widgetPosition = widget.getBoundingClientRect();
var widgetWidth = widgetPosition.width;
var widgetHeight = widgetPosition.height;

var maxWidgetX = parentX + parentWidth - widgetWidth;

var maxWidgetY = parentY + parentHeight - widgetHeight;

var mouseDowns = fromEvent(widget, 'mousedown');
var parentMouseMoves = fromEvent(parent, 'mousemove');
var parentMouseUps = fromEvent(parent, 'mouseup');

var drags = mouseDowns.pipe(
    switchMap(function(start) {
        return parentMouseMoves.pipe(
            map(function(move) {
                move.preventDefault(); // prevent default behavior of dragging

                var xPosition = move.clientX - start.offsetX;
                var yPosition = move.clientY - start.offsetY;

                if (xPosition  > maxWidgetX) {
                    xPosition = maxWidgetX;
                }

                if (xPosition < parentX) {
                    xPosition = parentX;
                }

                if (yPosition > maxWidgetY) {
                    yPosition = maxWidgetY;
                }

                if (yPosition < parentY) {
                    yPosition = parentY;
                }

                return {
                    left: xPosition,
                    top: yPosition
                };
            }),
            takeUntil(parentMouseUps)
        );
    })
);

var subscription = drags.subscribe(
    function onNext(position) {
        // console.log('Next:', position);
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
