$(function(){

    var model = {

        currentCat: null,

        init: function() {
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
            this.render();
        },

        render: function() {
            var that = this;
            octopus.getAllCats().forEach(function(catObj) {
                var $elem = $('<li class="cat-list-item"></li>');
                $elem.attr('id', catObj.name);
                $elem.html(catObj.name);
                that.addClickHandler($elem, catObj);
                $(that.catList).append($elem);
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
            this.$counter = $('#counter');
            this.$imgDiv = $('#cat-image');

            this.$imgDiv.click(function() {
                octopus.incrementClickCount();
            });
        },

        renderCat: function() {
            var currentCat = octopus.getCurrentCat();
            var img_src = currentCat.imagePath;
            this.$imgDiv.attr('src', img_src);
        },

        renderCounter: function() {
            var count = octopus.getCurrentCat().clickCount;
            this.$counter.html(count);
        }
    };

    octopus.init();

});