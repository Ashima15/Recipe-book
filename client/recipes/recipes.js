// Meteor.subscribe("recipes");

// console.log(Meteor.settings.public.ga.account);

Template.Recipes.onCreated(function(){
    var self = this;
    self.autorun(function(){
        self.subscribe('recipes');
    });
});

Template.Recipes.helpers({
    recipes : ()=> {
        return Recipes.find({});
    }
});

Template.Recipes.events({
    'click .new-recipe': function(){
        Session.set('newRecipe', true);
    }
});

Template.RecipeDetail.onCreated(function(){
    var self = this;
    self.autorun(function(){
        var id = FlowRouter.getParam('id');
        self.subscribe('recipeDetail', id);
    });
});

Template.RecipeDetail.helpers({
    recipe : ()=> {
        var id = FlowRouter.getParam('id');
        return Recipes.findOne({_id : id});
    }
});

Template.recipe.onCreated(function(){
     this.editRecipeMode = new ReactiveVar(false); 
});

Template.recipe.helpers({
    updateRecipeId : function(){
        return this._id;
    },
    editRecipeMode : function(){
        return Template.instance().editRecipeMode.get();
    }
});

Template.recipe.events({
    'click .toggle-menu' : function(){
        Meteor.call('toggleMenu', this._id, this.isMenu);
    },
    'click .fa-trash' : function(){
        Meteor.call('deleteRecipe', this._id);
    },
    'click .fa-pencil' : function(event, template){
        template.editRecipeMode.set(!template.editRecipeMode.get());
    }
});

Template.NewRecipe.events({
    'click .fa-close' : function(){
        Session.set('newRecipe', false);
    }
})

