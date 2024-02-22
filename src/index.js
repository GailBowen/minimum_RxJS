import { fromEvent } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';

var button = document.getElementById('myButton');

var clicksMade = fromEvent(button, 'click');

var points = clicksMade.pipe(
    map(function(e) {
        return {x: e.clientX, y: e.clientY};
    })
);

console.log('points', points);

var count = 0;

var subscription = points.subscribe(
    function onNext(point) {
        console.log('clicks ' + ++count);
        console.log('point', point);
        
        // if (count >= 3) {
        //     subscription.unsubscribe();
        // }
            
    },
    function onError(error) {
        console.log(error);
    },
    function onComplete() {
        console.log('done');
    });





