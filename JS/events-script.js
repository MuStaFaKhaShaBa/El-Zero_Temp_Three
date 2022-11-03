
// S T A R T - E V E N T S - S E C T I O N  
let [timerDays, timerHours, timerMinutes, timerSeconds] = document.querySelectorAll('#events-timers .timer');
let currentIntervalID;
let Events = JSON.parse(window.localStorage.getItem('events')) || [];
Events = Events.length ? Events : [{
    title: 'My Birth Day',
    desc: `Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Rem modi repellat, deserunt libero quo commodi sequi alias eligendi molestias rerum dignissimos natus.
      Iusto necessitatibus voluptatem iure repellendus cumque totam obcaecati ducimus,
      maiores exercitationem quaerat deserunt doloribus sapiente cupiditate.
      Obcaecati temporibus quia quos dolorem id laboriosam eos ad! Porro, repellat aliquid?`,
    date: new Date(2023, 11, 1, 23, 50).getTime(),
}];
let FinishedEvents = JSON.parse(window.localStorage.getItem('finishedEvents')) || [];
let currentDateElementRunning = null,
    markOpTag = `<mark class="bg-primary text-white p-0">`, // mark opinig tag 
    markCloTag = `</mark>`; // mark closing tag


(function () {

    let TRsFragment = document.createDocumentFragment();

    // Add Running Events To DOM
    Events.forEach((eve, index) => {
        TRsFragment.appendChild(createEventOnTR(eve, index, Events));
    })
    _eventsTable.append(TRsFragment);

    TRsFragment = document.createDocumentFragment();
    // Add Finished Events To DOM
    FinishedEvents.forEach((eve, index) => {
        let tr = createEventOnTR(eve, index, FinishedEvents);

        // add attr finish on it
        tr.setAttribute('data-finish', 'true');

        TRsFragment.appendChild(tr);
    })
    _eventsFinishedTable.append(TRsFragment);

    displayTimer(_eventsTable.children[0], 0, Events); // Show First Event
})();

// Start Event
function startNewTimer(TargetDate) {
    // Remove Done Class From Parent Of Timer Fields
    window['events-timers'].classList.remove('done');

    const DiffDate = new Date(TargetDate) - new Date().getTime();

    if (DiffDate < 0) {
        finishEvent();
        return;
    }
    //Calc Number Of Days 
    timerDays.textContent = Math.floor((DiffDate / (1000 * 60 * 60 * 24))); // set Days To DOM

    // Calc Number Of Hours 
    // Get Remainder Number From Days Thats Will Be Number Of hours In MSeconds
    timerHours.textContent = Math.floor((DiffDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // set Hours To DOM

    //Calc Number Of Minutes
    //Get Remainder Number From Hours Thats Will Be Number Of Minutes In MSeconds              
    timerMinutes.textContent = Math.floor((DiffDate % (1000 * 60 * 60)) / (1000 * 60)); // set Minutes To DOM

    // Calc Number Of Seconds
    // Get Remainder Number From Minutes Thats Will Be Number Of Seconds In MSeconds 
    timerSeconds.textContent = Math.floor((DiffDate % (1000 * 60)) / (1000)); // set Seconds To DOM

    // Create inteval To Start Timer Count
    currentIntervalID = setInterval(setSeconds, 1000);
}
// Handle Seconds Func
function setSeconds() {
    if (timerSeconds.textContent <= 0) {
        timerSeconds.textContent = 59;
        if (setMinutes() == 'finish') { // if get null That's mean finish timer  
            finishEvent(); // Finich Event
            return;
        }
    }
    else {
        --timerSeconds.textContent;
    }
}
// Handle Minutes Func
function setMinutes() {
    if (timerMinutes.textContent <= 0) {
        timerMinutes.textContent = 59;
        if (setHourse() == 'finish') { // if get Null
            return 'finish';// return null to finish Hours
        }
    }
    --timerMinutes.textContent;
}
// Handle Hours Func
function setHourse() {
    if (timerHours.textContent <= 0) {
        timerHours.textContent = 23;
        if (setDays() == 'finish') { // if get null
            return 'finish'; // return null to finish hours
        }
    }
    --timerHours.textContent;
}
// Handle Days Func
function setDays() {
    if (timerDays.textContent <= 0) {
        return 'finish'; // return null to finish days;
    }
    --timerDays.textContent;
}
// Handle Event Finish
function finishEvent() {
    clearInterval(currentIntervalID);

    window['events-timers'].classList.add('done');
    // Type Done Word
    timerDays.textContent = 'D';
    timerHours.textContent = 'O';
    timerMinutes.textContent = 'N';
    timerSeconds.textContent = 'E';

    // if Already Finished Terminate Function
    if (currentDateElementRunning.tr.getAttribute('data-finish') == 'true')
        return;

    finishEventFromTo();

}

createBtn.addEventListener('click', async e => {
    let continueFlag = true;

    const { value: formValues } = await Swal.fire({
        title: 'Event Information',
        html: `
      <div class="px-3" >
        <input id="event-title" class="form-control my-3" placeholder="Enter Event Title" >
        <input id="event-desc" class="form-control my-3" placeholder="Ender Event Description" >
      </div>
      <div class="alert alert-danger d-flex align-items-center gap-2 text-capitalize mx-3 py-2 d-none" id="eventDataAlert" role="alert">
      <p class="mb-0">some data missing</p>  
      <i class="fa fa-xmark fa-shake"></i>
      </div>
    `,
        focusConfirm: false,
        allowOutsideClick: false,
        showCancelButton: true,
        preConfirm: () => {
            let title = document.getElementById('event-title').value,
                desc = document.getElementById('event-desc').value;

            if (!title) {
                eventDataAlert.firstElementChild.textContent = "Event Title Missing!";
                eventDataAlert.classList.remove('d-none'); // Show Alert 
                return false; // Stop Sending data
            }
            if (!desc) {
                eventDataAlert.firstElementChild.textContent = "Event Description Missing!";
                eventDataAlert.classList.remove('d-none'); // Show Alert 
                return false; // Stop Sending data
            }

            return [title, desc]
        }
    }).then(e => {
        e.isConfirmed || (continueFlag = false);
        return e;

    })

    if (!continueFlag) {
        return;
    }

    const { value: eventDateYMDHM } = await Swal.fire({
        title: 'Enter Event Date',
        html: `
      <input type="datetime-local" name="eventDate" id="dateTimeEvent">
      <div class="alert alert-danger d-flex align-items-center gap-2 text-capitalize mx-3 mt-4 py-2 d-none" id="eventDataAlert" role="alert">
        <p class="mb-0">Event Date Cannot be in Past!</p>  
        <i class="fa fa-xmark fa-shake"></i>
      </div>
    `,
        focusConfirm: false,
        allowOutsideClick: false,
        showCancelButton: true,
        preConfirm: () => {
            let date = new Date(dateTimeEvent.value);

            if (date < new Date() || date == 'Invalid Date') {
                eventDataAlert.classList.remove('d-none');
                return false;
            }
            return date.getTime();
        }
    }).then(e => {
        e.isConfirmed || (continueFlag = false);
        return e;
    })

    if (!continueFlag) {
        return;
    }

    addNewEvent({ title: formValues[0], desc: formValues[1], date: eventDateYMDHM });
})

// add new Event
function addNewEvent(eventInfo) {
    // get position
    let pos = detectedPosition(eventInfo.date, Events);

    const newEvent = createEventOnTR(eventInfo, pos, Events);

    Events.splice(pos, 0, eventInfo);

    _eventsTable.insertBefore(newEvent, _eventsTable.children[pos])

    changeOrderAttr(pos, _eventsTable, "addNew");
    displayTimer(newEvent, pos, Events);

    toLocal('events'); // Push New Events Array To Local Storage

}

// Detected Current Position Of New Event
function detectedPosition(date, eventsArr) {
    let pos = 0;


    for (let i = 0; i < eventsArr.length; i++, pos++) {
        if (date < +eventsArr[i].date)
            break;
    }
    return pos;
}

// Add Event To Local
function toLocal(key) {
    window.localStorage.setItem(key, JSON.stringify((key == 'events' ? Events : FinishedEvents)));
}

// create Event In Events Table
function createEventOnTR({ title, date }, index, eventsArr) {
    ` <tr>
        <td title="">

        </td>
        <td title="2022:10:24 21:35">2022:10:24 21:35</td>
        <td>
            <button type="button" class="btn btn-outline-primary p-2">
            <i class="fa-regular fa-calendar-plus fa-fw"></i>
            </button>
        </td>
        <td>
            <button type="button" class="btn btn-outline-success p-2">
            <i class="fa-solid fa-hourglass-start fa-fw"></i>
            </button>
        </td>
    </tr>
`
    let tr = document.createElement('tr'),
        tdTitle = document.createElement('td'),
        tdDate = document.createElement('td'),
        tdDispaly = document.createElement('td'),
        tdRemove = document.createElement('td');

    let btnIconDisp = document.createElement('button'),
        btnIconRemove = document.createElement('button');

    tdTitle.textContent = title;
    tdTitle.setAttribute('title', title);

    tdDate.textContent = new Date(date);
    tdDate.setAttribute('title', new Date(date));

    btnIconDisp.innerHTML = '<i class="fa-solid fa-hourglass-start fa-fw"></i>';
    btnIconDisp.className = "btn btn-outline-primary";
    btnIconDisp.addEventListener('click', _ => displayTimer(tr, index, eventsArr));
    tdDispaly.appendChild(btnIconDisp);

    btnIconRemove.innerHTML = '<i class="fa-regular fa-calendar-minus fa-fw"></i>';
    btnIconRemove.className = "btn btn-outline-danger";
    btnIconRemove.addEventListener('click', _ => removeEvent(tr, eventsArr));
    tdRemove.appendChild(btnIconRemove);

    tr.append(tdTitle, tdDate, tdDispaly, tdRemove);
    tr.setAttribute('data-order', index);

    return tr;
}

// Remove Event Function
function removeEvent(tr, eventsArr) {
    let currentIndex = +tr.getAttribute('data-order');

    eventsArr.splice(currentIndex, 1); // remove Event from Events Container
    toLocal(eventsArr == Events ? 'events' : 'finishedEvents'); // update on local

    changeOrderAttr(currentIndex, tr.parentElement);
    tr.parentElement.removeChild(tr);//remove from DOM

}

// Change Order Attribute On Next Siblings
function changeOrderAttr(index, table, type) {

    // Udate Attribute['data-order'] on next Siblings
    let currentSibling = table.children[index + 1];

    // If We Add New Event,
    //   must Increase index by 1 
    (type == 'addNew') && index++;
    while (currentSibling) {
        currentSibling.setAttribute('data-order', index++); // set order -1

        // update index depand on remore or add 
        currentSibling = currentSibling.nextElementSibling// catch next sibling
    }

}

// Display Timer for Specific Event
function displayTimer(targetEl, pos, arr) {
    //catch current element running
    currentDateElementRunning = { tr: targetEl, trPos: pos };

    let { date, title, desc } = arr[+targetEl.getAttribute('data-order')];

    clearInterval(currentIntervalID); // clear current inteval Running

    // make a new timer
    startNewTimer(date);

    _eventTitle.textContent = title;
    _eventDesc.textContent = desc;

}

// add from Running to finished
function finishEventFromTo() {
    let { tr, trPos } = currentDateElementRunning;

    let posInFincishedEvents = detectedPosition(Events[trPos].date, FinishedEvents);

    // change order of it's siblings in Events Running table
    changeOrderAttr(trPos, _eventsTable, 'remove');

    // update order of element
    //    then move it to Finished Table
    // remove from Running Events
    _eventsTable.removeChild(tr);

    let newFinishedEvent = createEventOnTR(Events[trPos], trPos, FinishedEvents);
    // add data-finish on element
    newFinishedEvent.setAttribute('data-finish', 'true');

    newFinishedEvent.setAttribute('data-order', posInFincishedEvents);

    _eventsFinishedTable.insertBefore(newFinishedEvent
        , _eventsFinishedTable.children[posInFincishedEvents]);

    // change order of next sibling  
    changeOrderAttr(posInFincishedEvents, _eventsFinishedTable, 'addNew');


    // remove from Events Array and Add To FinishedEvents
    FinishedEvents.splice(posInFincishedEvents, 0, Events.splice(trPos, 1)[0]);
    // update on local
    toLocal('events');
    toLocal('finishedEvents');
}

// Search Function

searchInput.addEventListener('input', e => {
    let textSerach = e.target.value;

    // show All Events Running Events
    showAllEvents(_eventsTable, Events);
    // show All Events Finished Events
    showAllEvents(_eventsFinishedTable, FinishedEvents);

    // Search in Events Running Arr
    searchInTable(Events, textSerach.toLowerCase(), _eventsTable.children);

    // Search in Events Finished Arr
    searchInTable(FinishedEvents, textSerach.toLowerCase(), _eventsFinishedTable.children);


})

// function to show Events TR 
function showAllEvents(table_, arr) {
    Array.from(table_.children).forEach((ev, index) => {
        ev.firstElementChild.textContent = arr[index].title;
        ev.classList.remove('d-none');
    })
}

// Search On Table
function searchInTable(arr, searchKey, table_) {
    arr.forEach(({ title }, index) => {
        if (title.toLowerCase().includes(searchKey)) {
            table_[index].firstElementChild.innerHTML = addMark(title, searchKey);
        } else {
            table_[index].classList.add('d-none');
        }
    })
}
// Add Html Mark Tag To String Matches Search
function addMark(tilte, searchText) {
    const reg = new RegExp(searchText, "ig"); // To Match All 

    // Replace All Matches And Assign It As InnerHTML to recognize HTML tags
    return tilte.replace(reg, m => `${markOpTag}${m}${markCloTag}`);
};

// E N D - E V E N T S - S E C T I O N  