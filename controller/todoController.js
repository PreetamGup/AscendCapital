import TodoList from "../model/TodoListModel.js"
import Todo from "../model/TodoModel.js";
import User from "../model/UserModel.js";

const todoController={
    
    create:async(req, res)=>{

        try {
            const { user_id, list_name, description} = req.body;
        
            // Create a new todo list
            const newTodoList = await TodoList.create({
              user_id,
              list_name,
            });

            const newTodo = await Todo.create({
              list_id: newTodoList.list_id,
              description,
            });
        
            res.status(201).json({
              success: true,
              todoList: {
                list_id: newTodoList.list_id,
                user_id: newTodoList.user_id,
                list_name: newTodoList.list_name,
                newTodo
              },
            });
          } catch (error) {
            console.error(error);
            res.status(500).json({
              success: false,
              message: 'Error creating todo list',
            });
          }
    },

    addTodo:async(req,res)=>{
      try {
        const { list_id, description } = req.body;
    
        // Create a new todo list
        const newTodo = await Todo.create({
          list_id,
          description,
        });
    
        res.status(201).json({
          success: true,
          todo: {
            todo_id: newTodo.todo_id,
            description: newTodo.description,
          },
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: 'Error creating todo',
        });
      }
    },

    getTodo:async(req, res)=>{
        try {
          const { user_id } = req.params;
      
          // Find the user's todos grouped by todo list name
          const userTodos = await Todo.findAll({
            where: {},
            include: [
              {
                model: TodoList,
                where: { user_id },
                attributes: ['list_id', 'list_name'],
              },
            ],
            attributes: ['todo_id', 'description', 'isCompleted'],
            group: ['TodoList.list_name', 'TodoList.list_id', 'Todo.todo_id'],
          });


          const groupedData = userTodos.reduce((acc, todo) => {
            const listId = todo.TodoList.list_id;
            const listName = todo.TodoList.list_name;
          
            if (!acc[listId]) {
              acc[listId] = {
                list_id: listId,
                list_name: listName,
                todos: [],
              };
            }
          
            acc[listId].todos.push({
              todo_id: todo.todo_id,
              description: todo.description,
              isCompleted: todo.isCompleted,
            });
          
            return acc;
          }, {});
          
     
          const result = Object.values(groupedData);
      
          res.status(200).json({
            success: true,
            todos: result,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({
            success: false,
            message: 'Error fetching todos',
          });
        }
    },

    deleteTodo:async(req, res)=>{    

      try {
        const { todo_id } = req.params;
    
        // Find the todo by todo_id
        const todoToDelete = await Todo.findByPk(todo_id);
    
        if (!todoToDelete) {
          return res.status(404).json({
            success: false,
            message: 'Todo not found',
          });
        }
    
        // Delete the todo
        await todoToDelete.destroy();
    
        res.status(200).json({
          success: true,
          message: 'Todo deleted successfully',
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: 'Error deleting todo',
        });
      }

    },

    updateTodo:async(req, res)=>{
      try {

        const { todo_id, list_id } = req.body;
    
        // Find the todo by todo_id
        const todoToUpdate = await Todo.findByPk(todo_id);
    
        if (!todoToUpdate) {
          return res.status(404).json({
            success: false,
            message: 'Todo not found',
          });
        }
    
        // Update the todo's list_id
        todoToUpdate.list_id = list_id;
        await todoToUpdate.save();
    
        res.status(200).json({
          success: true,
          message: 'Todo list updated successfully',
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: 'Error updating todo list',
        });
      }
    }
}

export default todoController