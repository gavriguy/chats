var App = Em.Application.create({
    ready: function() {
        App.someItemsView.appendTo('#work-area');
        this._super();
    }
});

App.tweetsController = Em.ArrayController.create({
    content: ['A', 'B', 'C', 'D', 'E', 'F'],
    init: function() {

    },
    add: function() {
        App.tweetsController.content.unshiftObject('a');
        //console.log(App.tweetsController.activeTab);
        App.someItemsView.activeTab++;
        //console.log(App.tweetsController.activeTab);
    },
    select: function(e) {
    }

});

App.someItemsView = Ember.CollectionView.create({
    elementId: 'my-id',
    activeTab: 0,
    activeHeader: null,
    
    renderAccordion: function() {
        var self = this;
        $('#my-id').accordion('destroy').accordion({
            header: 'h3',
            active: self.activeTab,
            change: function(event, ui) {

                self.activeTab = $('h3').index(ui.newHeader);
                self.activeHeader = ui.newHeader;
                //console.log(self.activeHeader);
            }
        }).sortable('destroy').sortable({
            axis: "y",
            handle: "h3",
            update: function(event, ui) {
                //console.log(self.activeHeader);
                
                if (self.activeHeader == undefined) {

                    self.activeHeader = $('h3.ui-state-active');
                }
                self.activeTab = $('h3').index(self.activeHeader);
            }
        });
    },
    contentBinding: 'App.tweetsController.content',

    itemViewClass: Ember.View.extend({
        template: Ember.Handlebars.compile('<h3><a href="#">{{content}}</a></h3>' + "<div>The letter: {{content}}</div>")
    }),
    /*
    arrayWillChange: function(item, idx, removedCnt, addedCnt) {
      console.log(addedCnt);
     // this.activeHeader = getActiveHeader();
      this._super(item, idx, removedCnt, addedCnt);
    },
*/
    arrayDidChange: function(content, start, removed, added) {
        //this.activeTab = added;
        //console.log(added);
        var self = this;
        //using timeout to make sure the accordion renders after the view was fully rendered.
        setTimeout(function() {
            self.renderAccordion();
        }, 10);

        this._super(content, start, removed, added);


    }
});