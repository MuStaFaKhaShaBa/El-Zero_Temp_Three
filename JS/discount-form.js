//hold all Invaild Feedback Element
const invalidElement = Array.from(document.querySelectorAll('#discount-form .invalid-feedback'));
let selectedDiallingCode; // default Dialling Code



// ---|| Valid Input Fields ||----

// Validation Object To Check All Input Fields
//   to Reduce Validations Number

let Validation = {
    name: 0,
    email: 0,
    phone: 0,
    msg: 0,
    all: 1,
};
btnSendMsg.addEventListener('click', e => {
    e.preventDefault();

    Validation.all = 1; // Reset To True;

    // Check Vaildation Of Input Field ,
    //   if Found SomeThing Wrong add Event To Check Vaildation on input,
    //   and Set Validation To Falsy value;

    if (!Validation.name && !nameValidation()) {
        userName.addEventListener('input', _ => {
            if (nameValidation()) {
                vaildFeedBack(userName);
                Validation.name = 1; // set Name Flag Validation to true
            }
        });

        Validation.all = 0;
    }

    if (!Validation.email && !emailValidation()) {
        userEmail.addEventListener('input', _ => {
            if (emailValidation()) {
                vaildFeedBack(userEmail);

                Validation.email = 1; // set Name Flag Validation to true
            }
        });

        Validation.all = 0;
    }

    if (!Validation.phone && !phoneValidation()) {
        userPhone.addEventListener('input', _ => {
            if (phoneValidation()) {
                vaildFeedBack(userPhone);

                Validation.phone = 1; // set Name Flag Validation to true
            }
        });

        Validation.all = 0;
    }

    if (!Validation.msg && !msgValidation()) {
        userMsg.addEventListener('input', _ => {
            if (msgValidation()) {
                vaildFeedBack(userMsg);

                Validation.msg = 1; // set Name Flag Validation to true
            }
        });

        Validation.all = 0;
    }

    // If All Input Fields are Valid 
    //   show successfull Pop Up 
    Validation.all && Swal.fire(
        '',
        'Your Message Sent Successfully',
        'success'
    );
})

// Check Name Vaildation
function nameValidation() {
    const Name = userName.value.trim(),
        parts = Name.split(' ');

    if (Name.length <= 6) {

        // Check Length of Name |=> Must be at least 3 Char
        invalidFeedBack(userName, 0, "Name Must Be At Least 6 Letters");
        return 0;

    } else if (/([^\w\s]|[0-9])/.test(Name)) {

        // Name Mustn't Be Contain Any Special Letters or Numeric value
        invalidFeedBack(userName, 0, "Name Must Not Contain Special Letters or Numeric value");
        return 0;
    }
    else if (!((parts.length >= 2)
        && (parts[0].length >= 1) && (parts[1].length >= 1))) {

        // Divide Name |=> Must be at least 2 Parts, Each Part It's Length GT 1 Char
        invalidFeedBack(userName, 0, "Name Must Be At Least 2 Part");
        return 0;

    }

    return 1;
}

// Check Email Validation
function emailValidation() {
    const Email = userEmail.value.trim();

    if (/[^\w\.@]/g.test(Email)) {

        // Email Must Not Be Contain Capital or Special Letters
        invalidFeedBack(userEmail, 1, "Email Contain Special Or Capital Letters");
        return 0;

    } else if (!(/^([a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,})$/.test(Email))) {

        // Email Fields 
        invalidFeedBack(userEmail, 1, "Please Enter a Valid Email, EX: abc@abc,abc");
        return 0;
    }

    return 1;
}

// ---> Number Validation <---
function phoneValidation() {
    const Phone = userPhone.value;

    if (!/^\d{11}$/.test(Phone)) {

        // check if number is valid 
        invalidFeedBack(userPhone, 2, "Enter Valid Phone Number: 11 Numbers. Ex: 01xxxxxxxxx");
        return 0;

    } else if (!Phone.startsWith('01')) {

        // check if first number is 1 or not
        invalidFeedBack(userPhone, 2, "Phone Number Must Start With 01");
        return 0;
    }

    return 1;
}

// ---> User Message Validation <---
function msgValidation() {
    const MsgLength = userMsg.value.trim().length;
    ;

    if (!(MsgLength > 0)) {

        // check if number is valid 
        invalidFeedBack(userMsg, 3, "You Must Enter A Message");
        return 0;

    } else if ((MsgLength < 100)) {

        // check if first number is 1 or not
        invalidFeedBack(userMsg, 3, `You Have ${100 - MsgLength} Letters Remaining`);
        return 0;
    }

    return 1;
}


// Add Invalid Class And Invalid Feedback
function invalidFeedBack(inputEl, invalidN, msg) {
    inputEl.classList.remove('is-valid'); // Remove valid Class
    inputEl.classList.add('is-invalid'); // add invalid class

    // set Message To Invalid FeedBack Element
    invalidElement[invalidN].textContent = msg;
}

// add Valid Class 
function vaildFeedBack(inputEl) {
    inputEl.classList.add('is-valid'); // Remove valid Class
    inputEl.classList.remove('is-invalid'); // add invalid class
}

// ---|| Valid Input Fields ||----

// ---|| Get Countries Flag And Dialling Code ||----
const myHeaders = new Headers();
myHeaders.append("apikey", "qw709Dw02DW4CMKomNSyQqkHxgmwTgH0");

const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};

function getCountriesFlags() {
    fetch("https://api.apilayer.com/number_verification/countries", requestOptions)
        .then(response => response.json())
        .then(result => {
            const CountriesData = Object.entries(result),
                fragment = document.createDocumentFragment();

            selectedDiallingCode = CountriesData[58];

            // console.log(CountriesData); // {country_name: 'Afghanistan', dialling_code: '+93'}
            CountriesData.forEach((country,) => {
                if (country[0] == 'IL') { // don't include Israel
                    return;
                }
                fragment.appendChild(createCountryD(country))
            })
            dialling_Codes_Countries.appendChild(fragment);

        })
        .catch(error => console.log('error', error));
}
getCountriesFlags();

// create country dialling
function createCountryD([imgURL, { country_name, dialling_code }]) {
    const li = document.createElement('li'),
        div = document.createElement('div'),
        divImg = document.createElement('div'),
        img = document.createElement('img'),
        diallingCode = document.createElement('p');

    li.classList.add('dropdown-item');
    li.setAttribute('title', country_name);

    div.className = 'd-flex align-items-center justify-content-center gap-2';

    divImg.classList.add('country-img');
    img.classList.add('w-100');
    img.setAttribute('src', `https://countryflagsapi.com/png/${imgURL}`);
    img.setAttribute('title', country_name);

    divImg.appendChild(img);

    diallingCode.classList.add('mb-0');
    diallingCode.append(dialling_code);

    div.append(divImg, diallingCode);
    li.appendChild(div);

    li.addEventListener('click', _ => {
        btnSelectCountry.innerHTML = '';
        btnSelectCountry.appendChild(li.firstElementChild);

        // update dialling code
        selectedDiallingCode = dialling_code;
        console.log('selected country', selectedDiallingCode);
    });
    return li;
}
// ---|| Get Countries Flag And Dialling Code ||----

