Template.ShoppingList.onCreated(function(){
    var self = this;
    self.autorun(function(){
        self.subscribe('recipes');
    });
});

Template.ShoppingList.helpers({
    shoppinglist : ()=> {
        return Recipes.find({isMenu : true});
    }
});