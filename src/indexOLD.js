import { from, interval, fromEvent } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';

// let count = 0;
// document.addEventListener('click', () => console.log(`Borrowed has been clicked ${++count} times`));

let count = 0;
fromEvent(document, 'click').subscribe(() => console.log(`Borrowed has been clicked ${++count} times`));


function doStuff() {
    alert('Testing borrowed');

    var source = interval(500).pipe(take(10));

    source
      .pipe(
        filter(item => item % 2 === 1),
        map(item => item + '!'),
      )
      .subscribe(result => {
        console.log(result); 
    });

}

// Attaching event listener programmatically
document.getElementById('myButton').addEventListener('click', doStuff);
