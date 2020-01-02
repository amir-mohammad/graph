const graphql = require("graphql");
const _ = require("lodash");
const Book = require('../models/Book');
const Author = require('../models/Author');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID,GraphQLInt,GraphQLList } = graphql;

const books = [
  { name: "graphql in practice", genre: "development", id: "1",authorid:'1' },
  { name: "react in practice", genre: "development", id: "2" , authorid:'2'},
  { name: "nodejs in practice", genre: "development", id: "3", authorid:'3' },
  { name: "graphql in practice", genre: "development", id: "4",authorid:'1' },
  { name: "restful in practice", genre: "development", id: "5" , authorid:'2'},
  { name: "nodejs in practice", genre: "development", id: "6", authorid:'3' }
];
const authors = [
    {name:"scott smith",age:44,id:'1'},
    {name:"lebron jeams", age:55, id:'2'},
    {name:"joseph smith",age:96,id:'3'}
]

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    genre: {
      type: GraphQLString
    },
    author:{
        type:AuthorType,
        resolve(parent,args){
            //return _.find(authors,{id:parent.authorid})
        }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: {type:GraphQLInt},
    books:{
        type: new GraphQLList(BookType),
        resolve(parent,args){
            //return _.filter(books,{authorid:parent.id})
        }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
       // return _.find(books, { id: args.id });
      }
    },
    author:{
        type:AuthorType,
        args:{id:{type: GraphQLID}},
        resolve(parent,args){
           // return _.find(authors, {id:args.id});

        }
    },
    books:{
        type:new GraphQLList(BookType),
        resolve(parent,args){
            //return books
        }
    },
    authors:{
        type: new GraphQLList(AuthorType),
        resolve(parent,args){
           //return authors
        }
    }
  }
});

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type: GraphQLString},
                age:{type:GraphQLInt}
            },

            resolve(parent,args){
                let author = new Author({
                    name: args.name,
                    age:args.age
                })

                return author.save()

            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type: GraphQLString},
                genre:{type:GraphQLString},
                
            }
        }
    }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation:Mutation
});
