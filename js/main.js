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

        incrementClickCount: function() {
            this.currentCat.clickCount += 1;
        },

        getAllCats: function() {
            return this.catArray;
        },

        updateName: function(name) {
            if (name != this.currentCat.name) {
                this.currentCat.name = name;
            }
        },

        updateImagePath: function(imagePath) {
            if (imagePath != this.currentCat.imagePath) {
                try {
                    this.currentCat.imagePath = imagePath;
                }
                catch (e) {
                    // do something to handle: invalid path, invalid file type...
                }
            }

        },

        updateClickCount: function(clickCount) {
            if (clickCount != this.currentCat.clickCount) {
                try {
                    this.currentCat.clickCount = Number(clickCount);
                }
                catch (TypeError) {
                    // do something here if clickCount can't be converted to num
                }
            }
        }
    };



    var octopus = {

        admin: false,

        init: function() {
            model.init();
            viewList.init();
            viewCat.init();
            viewAdmin.init();
        },

        getAllCats: function() {
            return model.getAllCats();
        },

        handleCatListClick: function(catObj) {
            octopus.setCurrentCat(catObj);
            viewCat.renderCat();
            viewCat.renderCounter();
            viewAdmin.clear();
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
            if (this.admin === true) {
                viewAdmin.render();
            }
        },

        updateCurrentCat: function(name, url, count) {
            if (name != '') {
                model.updateName(name);
            }
            if (url != '') {
                model.updateImagePath(url);
            }
            if (count != '') {
                model.updateClickCount(count);
            }
            viewCat.renderCat();
            viewCat.renderCounter();
        },

        setAdminOff: function() {
            this.admin = false;
        },

        setAdminOn: function() {
            this.admin = true;
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
            this.$catName = $('#cat-name');

            this.$imgDiv.click(function() {
                octopus.incrementClickCount();
            });
        },

        renderCat: function() {
            viewAdmin.clear();
            var currentCat = octopus.getCurrentCat();
            var img_src = currentCat.imagePath;
            this.$imgDiv.attr('src', img_src);
            this.$catName.html(currentCat.name);
        },

        renderCounter: function() {
            var count = octopus.getCurrentCat().clickCount;
            this.$counter.html(count);
        }
    };

    var viewAdmin = {

        init: function() {
            this.$adminButton = $('#show-admin');
            this.$nameInput = $('#name-input');
            this.$urlInput = $('#url-input');
            this.$countInput = $('#count-input');
            this.$cancelButton = $('#cancel-button');
            this.$saveButton = $('#save-button');
            var that = this;
            this.$adminButton.click(function() {
                octopus.setAdminOn();
                that.render();
            });
        },

        render: function() {
            //this.clear();
            var currCat = octopus.getCurrentCat();
            if (currCat === null) {
                this.$nameInput.text('Please select a cat first.');
                octopus.setAdminOff();
            } else {
                var $nameDiv = $('<input type="text" id="name">');
                $nameDiv.val(currCat.name);
                this.$nameInput.text('Cat name:').append('<br>').append($nameDiv);
                var $urlDiv = $('<input type="text" id="url">');
                $urlDiv.val(currCat.imagePath);
                this.$urlInput.text('Image path:').append('<br>').append($urlDiv);
                var $countDiv = $('<input type="text" id="count">');
                $countDiv.val(currCat.clickCount);
                this.$countInput.text('Click count:').append('<br>').append($countDiv);

                var that = this;

                var $cancelDiv = $('<button type="button" class="btn btn-default">Cancel</button>');
                this.$cancelButton.append($cancelDiv);


                this.$cancelButton.click(function () {
                    that.clear();
                    octopus.setAdminOff();
                });

                var $saveDiv = $('<button type="button" class="btn btn-default">Save</button>');
                this.$saveButton.append($saveDiv);

                this.$saveButton.click(function () {
                    octopus.updateCurrentCat($nameDiv.val(), $urlDiv.val(), $countDiv.val());
                    that.clear();
                    octopus.setAdminOff();
                })
            }
        },

        clear: function() {
            this.$nameInput.html('');
            this.$urlInput.html('');
            this.$countInput.html('');
            this.$cancelButton.html('');
            this.$saveButton.html('');
        }

    };


    octopus.init();

});