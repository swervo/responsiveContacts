/* global ko */

"use strict";

function Contact(firstName, surname, mobile, image, email, address, favourite) {

    this.type = "contact";
    this._id = ko.observable("");
    this._rev = ko.observable("");
    this.modified = ko.observable(new Date(Date.now()));

    this.firstName = ko.observable(firstName);
    this.surname = ko.observable(surname);
    this.mobile = ko.observable(mobile);
    this.homephone = ko.observable();
    this.imageUri = ko.observable(image || "http://lorempixel.com/360/360/people/");
    this.email = ko.observable(email);
    this.facebook = ko.observable("");
    this.twitter = ko.observable("");
    this.flickr = ko.observable("");
    this.address = ko.observable(address);
    this.favourite = ko.observable(favourite || false);

    this.id = ko.computed({
        read: function () {
            return this._id();
        },
        write: function (value) {
            if (!this._id()) {
                this._id(value);
            } else {
                throw "Id of an existing contact is not allowed to be modified.";
            }
        },
        owner: this
    }, this);

    this.rev = ko.computed({
        read: function () {
            return this._rev();
        },
        write: function (value) {
            this._rev(value);
        },
        owner: this
    }, this);
}



Contact.prototype = {
    adopt: function (contact) {
        if(contact instanceof Contact) {
            this._id(contact._id());
            this._rev(contact._rev());
            this.modified(contact.modified());
            this.firstName(contact.firstName());
            this.surname(contact.surname());
            this.mobile(contact.mobile());
            this.homephone(contact.homephone());
            this.imageUri(contact.imageUri());
            this.email(contact.email());
            this.facebook(contact.facebook());
            this.twitter(contact.twitter());
            this.flickr(contact.flickr());
            this.address(contact.address());
            this.favourite(contact.favourite());
        } else {
            // console.log("Contact.adopt, from data: ", contact);
            // Write directly these internal variables.
            this._id(contact._id);
            this._rev(contact._rev);
            this.modified(contact.modified);
            this.firstName(contact.firstName);
            this.surname(contact.surname);
            this.mobile(contact.mobile);
            this.homephone(contact.homephone);
            this.imageUri(contact.imageUri);
            this.email(contact.email);
            this.facebook(contact.facebook);
            this.twitter(contact.twitter);
            this.flickr(contact.flickr);
            this.address(contact.address);
            this.favourite(eval(String(contact.favourite)));
        }
    }
};


function ContactsDataModel() {
    var that = this;
    
    this.contactsArray = ko.observableArray();
    this.me = ko.observable(new Contact(
        "Me",
        "too",
        "00112233445566",
        "http://lorempixel.com/420/360/people/6",
        "email@nokia.com",
        "10 Great Pulteney Street, Soho, London, W1F 9NB"
    ));

    this.add = function (aContact) {
        that.contactsArray.push(aContact); // point to the new element added
    };

    // find a contact by id
    this.find = function (id) {
        var i = 0;
        var ifound = -1;
        console.log("ContactList.findContact: finding contact by id... ", id);
        for (i = 0; i < that.contactsArray().length; i++) {
            if (that.contactsArray()[i]._id() === id) {
                ifound = i;
                break;
            }
        }
        return ifound;
    };

    this.getById = function (id) {
        var e;
        var f = self.find(id);
        if (f >= 0) {
            e = that.contactsArray()[f];
        } else {
            e = that.me();
        }
        return e;
    };
}

