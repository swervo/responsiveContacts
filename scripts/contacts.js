/* global BrowserDetect */
/* global ContactsDataModel */
/* global Contact */
/* global contactData */
/* global ko */

"use strict";

var contactsApp;

function Contacts() {
    console.log("Creating contacts app.");
    this.dataModel = new ContactsDataModel();
}

Contacts.prototype.init = function() {
    this.loadContacts();
    ko.applyBindings(this.dataModel);
    this.layout();
};


// Contacts.prototype.loadContacts = function() {
//     $.ajax({
//         url: "../data/data.json",
//         dataType: "json",
//         async: false,
//         context: this,
//         success: function (data) {
//             var contact;
//             data.forEach(function (item) {
//                 contact = new Contact();
//                 contact.adopt(item);
//                 contactsApp.dataModel.add(contact);
//             });
//         },
//         error: function () {
//             console.log("loadContacts: Failed" );
//         }
//     });
// };

Contacts.prototype.loadContacts = function() {
    var contact;
    contactData.forEach(function (item) {
        contact = new Contact();
        contact.adopt(item);
        contactsApp.dataModel.add(contact);
    });
};


Contacts.prototype.layout = function() {
    $("#contactListWrapper").isotope({
        itemSelector : ".contact",
        layoutMode : "fitRows",
        getSortData : {
            firstName: function ( $elem ) {
                return $elem.find(".contactFirstName").text();
            },
            surname: function ( $elem ) {
                return $elem.find(".contactSurname").text();
            }
        }
    });
    this.bindFilters();

    document.addEventListener(BrowserDetect.touchmove, function (e) {
        e.preventDefault();
    }, false);

    var theWrapper = document.getElementById("contactListWrapper");
    theWrapper.ontouchmove = function(e){
        e.stopPropagation();
        // e.preventDefault();
    };
};

Contacts.prototype.bindFilters = function() {
    var that = this;
    this.allFilters = $("nav span").on(BrowserDetect.tap, function (e) {
        that.updateIsotope(e.target.id);
        return false;
    });
};

Contacts.prototype.reloadIsotope = function() {
    $("#contactListWrapper").isotope("reLayout");
};

Contacts.prototype.updateIsotope = function(aFilter) {
    var $element = $("#" + aFilter);
    var sort, filt;
    switch(aFilter) {
    case "all":
        sort = "surname";
        filt = "*";
        break;
    case "recents":
        sort = "firstName";
        filt = "*";
        break;
    case "favourites":
        sort = "surname";
        filt = ".fav";
        break;
    default:
        console.error("switch default");
        break;
    }
    $("#contactListWrapper").isotope({ sortBy : sort, filter: filt });
    $element.parents("nav").find(".selected").removeClass("selected");
    $element.addClass("selected");
};

$(document).ready(function() {
    contactsApp = new Contacts();
    contactsApp.init();
});