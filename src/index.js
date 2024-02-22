import { fromEvent } from 'rxjs';

var button = document.getElementById('myButton');


var buttonClicks = fromEvent(button, 'click');

var count = 0;

var subscription = buttonClicks.subscribe(
    function onNext(e) {
        console.log('clicks ' + ++count);
        
        if (count >= 3) {
            subscription.unsubscribe();
        }
            
    },
    function onError(error) {
        console.log(error);
    },
    function onComplete() {
        console.log('done');
    });





