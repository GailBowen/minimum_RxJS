import { from, interval, fromEvent } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';


var button = document.getElementById('myButton');

// var handler = function(e) {
//   alert('Thanks for clicking!');
//   button.removeEventListener('click', handler);
// };

// button.addEventListener('click', handler);

let docCount = 0;
let buttonCount = 0;

//fromEvent(document, 'click').subscribe(() => console.log(`document has been clicked ${++docCount} times`));

//fromEvent(button, 'click').subscribe(() => console.log(`button has been clicked ${++buttonCount} times`));

var buttonClicks = fromEvent(button, 'click');

//buttonClicks.forEach(()=> alert('Quality Clicking!'));

var count = 0;

var subscription = buttonClicks.subscribe(
    function onNext(e) {
        console.log('bocca ' + ++count);
        
        if (count >= 3) {
            subscription.unsubscribe();
            //throw new Error('This is an error');
        }
            
    },
    function onError(error) {
        console.log(error);
    },
    function onComplete() {
        console.log('done');
    });

// try {
//     [1,2,3,4,5,6,7,8,9,15].forEach((item) => 
//     {
//         console.log(item);
//         throw new Error('This is an error');
//     });    
//     console.log('done');
   
// } catch (error) {
//     console.log('error', error);
// }




