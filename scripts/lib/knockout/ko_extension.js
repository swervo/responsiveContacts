//ko.dirtyFlag = function (root) {
//    var _isDirty = ko.observable(false);

//    var result = ko.dependentObservable(function () {
//        ko.toJS(root); //just for subscriptions
//        return _isDirty();
//    });

//    return result;
//}

ko.dirtyFlag = function(root, isInitiallyDirty) {
    var result = function() {};
    var _initialState = ko.observable(ko.toJSON(root));
    var _isInitiallyDirty = ko.observable(isInitiallyDirty);

    result.isDirty = ko.dependentObservable(function() {
        return _isInitiallyDirty() || _initialState() !== ko.toJSON(root);
    });

    result.reset = function() {
        _initialState(ko.toJSON(root));
        _isInitiallyDirty(false);
    };

    result.subscribe = function (cb) {
        return result.isDirty.subscribe(cb);
    };

    return result;
};

/* Custom binding for a react action for knockout */
//ko.bindingHandlers['react'] = {
//    init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
//      function handleReaction(e) {
//        console.log("reaction", e);
//        var el = $(element); // jQuery object from used element
//        e.preventDefault();
//        el.addClass('pressed');
//        var time = allBindingsAccessor().time;
//        setTimeout( function() { el.removeClass('pressed'); }, time || 300);

//        var value = allBindingsAccessor().value;

//        var accessor = valueAccessor();
//        if ( typeof accessor === 'function' ) {
//          accessor.apply(viewModel, [value]);
//        }
//      }

//      ko.utils.registerEventHandler(element, 'click', handleReaction);
//      ko.utils.registerEventHandler(element, 'touchstart', handleReaction);
////      jQuery(element).bind("touchstart", handleReaction, false);
////      jQuery(element).bind("click",      handleReaction, false);
//    },

////    update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
////    }
//};
