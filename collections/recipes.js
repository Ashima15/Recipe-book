Recipes = new Mongo.Collection('recipes');

Recipes.allow({
    insert: function(userId, doc){
        return !!userId;
    },
    update : function(userId, doc){
        return !!userId;
    }
});

Ingredients = new SimpleSchema({
    name: {
        type: String,
        label : "Name"
    },
    
    amount : {
        type: String,
        label : "Amount"
    }
});


RecipeSchema = new SimpleSchema({
    name: {
       type: String,
       label : 'Name'
    },
    
    desc : {
        type : String, 
        label: "Description"
    },
    
    isMenu : {
        type: Boolean,
        optional : true,
        defaultValue : false,
        autoform: {
            type : "hidden"
        }
    },
    
    ingredients: {
        type : [Ingredients]
    },
    
    author : {
        type : String,
        label: "Author",
        autoValue : function(){
            return this.userId
        },
        autoform : {
            type : "hidden"
        }
    },
                                
    createdAt : {
        type: Date,
        label: "Created At",
        autoValue : function(){
            return new Date()
        },
        autoform : {
            type : "hidden"
        }
    }
});

Recipes.attachSchema(RecipeSchema);

Meteor.methods({
    toggleMenu: function(id, currentState){
        Recipes.update(id,{
            $set : {
                isMenu : !currentState
            }
        });
    },
    deleteRecipe : function(id){
        Recipes.remove(id);
    }
});