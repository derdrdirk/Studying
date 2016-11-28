angular.
    module('phoneList').
    component('phoneList', {
        templateUrl: 'phone-list/phone-list.template.html',
        controller: ['Phone',
            function PhoneListController(Phone) {
                this.phones = Phone.query();
                this.orderProp = 'age';
            }
        ]
    });