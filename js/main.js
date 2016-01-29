$(function(){

    var model = {

        currentCat: null,

        init: function() {
            // each of these cats has to be hard-coded - would the ideal be to create an object for each image path,
            // which would be given to this function by some back end thingy?
            this.catArray = [
                {name: 'cat1', imagePath: 'images/kitten.jpg', clickCount: 0},
                {name: 'cat2', imagePath: 'images/kitten2.jpg', clickCount: 0},
                {name: 'cat3', imagePath: 'images/kitten3.jpg', clickCount: 0},
                {name: 'cat4', imagePath: 'images/kitten4.jpg', clickCount: 0},
                {name: 'cat5', imagePath: 'images/kitten5.jpg', clickCount: 0},
                {name: 'cat6', imagePath: 'images/kitten6.jpg', clickCount: 0}
            ];
        },

        incrementClickCount: function(catObj) {
            catObj.clickCount += 1;
        },

        getAllCats: function() {
            return this.catArray;
        }
    };



    var octopus = {

        init: function() {
            model.init();
            viewList.init();
            viewCat.init();
        },

        getAllCats: function() {
            return model.getAllCats();
        },

        handleCatListClick: function(catObj) {
            octopus.setCurrentCat(catObj);
            viewCat.renderCat();
            viewCat.renderCounter();
        },

        getCurrentCat: function() {
            return model.currentCat;
        },

        setCurrentCat: function(catObj) {
            model.currentCat = catObj;
        },

        incrementClickCount: function() {
            var currCat = octopus.getCurrentCat();
            model.incrementClickCount(currCat);
            viewCat.renderCounter();
        }
    };

    var viewList = {

        init: function() {
            this.catList = $('.cat-list');
            this.render(this.catList);
        },

        render: function(catList) {  // why can't I just access this.catList within this function??
            octopus.getAllCats().forEach(function(catObj) {
                var $elem = $('<li class="cat-list-item"></li>');
                $elem.attr('id', catObj.name);
                $elem.html(catObj.name);
                viewList.addClickHandler($elem, catObj); // why doesn't "this.addClickHandler" work here?
                $(catList).append($elem);
            });
        },

        addClickHandler: function($element, catObj) {
            $element.click((function(catObjCopy) {
                return function() {
                    octopus.handleCatListClick(catObjCopy);
                }
            })(catObj));
        }

    };

    var viewCat = {

        init: function() {
            this.catViewArea = $('#cat-viewing-area')[0];
            this.counter = $('#counter')[0];
            this.wrapper = $('#cat-image-wrapper')[0];
            this.imgDiv = $('#cat-image')[0]; // Why is jQuery selector returning array?

            this.imgDiv.addEventListener('click', function(e) {
                octopus.incrementClickCount();
            });
        },

        renderCat: function() {
            var currentCat = octopus.getCurrentCat();
            this.catViewArea.innerHTML = '';
            var img_src = currentCat.imagePath;
            this.imgDiv.setAttribute('src', img_src);
            this.wrapper.appendChild(this.imgDiv);
            this.catViewArea.appendChild(this.wrapper);
        },

        renderCounter: function() {
            var count = octopus.getCurrentCat().clickCount;
            this.counter.innerHTML = '';
            this.counter.innerHTML = count;
        }
    };

    octopus.init();

});