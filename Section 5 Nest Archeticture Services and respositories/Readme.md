## Services vs Repositories
- Both are classes
- Services to have any business logic
- Repositories to have storage related logic
- Services can use one or more repositories to find or store data
- Repositories end up being a typeORM entity or mogoose schema or similar

There are very good reasons to have a service
- They behave as a proxy between our repositories
- Any time we need to combine multiple kind of data between multiple repositories

Here in this example we will use the data storage as a text file so we will create a repository class
- Create file called `MessagesRepository`
- Create 3 different methods inside it
    - `findOne(id: string)` and this method will have some asyncronous code as it will read a file from the hard drive so we will add `async`
    - `async findAll()` to get all the data
    - `async create(content: string)` to add new message

Now create the file which will add the data inside it
- Create file in the root directory called `messages.json`

### Implementation
- `async findOne(id: string)` method
    - First we will use `readFile` method of package `fs/promises` to read the file content
        ```
        const contents = await readFile("messages.json", "utf8");
        ```
        So here we got the file contents as `JSON` string
    - Then parse the `JSON` to an object
        ```
        const messages = JSON.parse(contents);
        ```
    - Then return the messages which has the same `id` we have as a parameter
        ```
        return messages[id];
        ```
- `async findAll()` method
    - will be the same code as `findOne` but without filter to return all the messages
- `async create(content: string)` method
    - First we will read again the file content as we did before
    - Will generate id to save along with the message by using the `Math` method
        ```
        const id = Math.floor(Math.random() * 999);
        ```
    - The object which is saved should be in the structure of `12: {id: 12, content: "hi"}`
    - So now we can push one more element to the messages object using
        ```
        messages[id] = {id, content};
        ```
    - Last thing is to restore or data to the file 
        ```
        await writeFile("messages.json", JSON.stringify(messages));
        ```


## Creating the service file
- Create a class called `MessagesService`
- Inside the `constructor` we will create `instance` of it's own `dependency` which is `MessagesRepository`
    ```
    messagesRepository: MessagesRepository;
    constructor() {
        this.messagesRepository = new MessagesRepository();
    }
    ```
- IMPORTANT NOTE!
    - Here as we see the `service` is creating it's own `dependencies`
    - `MessagesRepositry` is a `dependency` of the `MessagesService` which means the `service` can't work correctly unless it has the `repository`
    - Here the `service` is creating it's own `dependency` which can't happen in the real apps
    - We don't have classes which create it's own `dependencies` 
### Implementation
- We will create 3 methods of `create, findAll, find` and just call them from the dependency

### Creating the controller
- Will have the 3 methods which we are implementing
- Create a dependency of the `service` file same as we did in the `service`
- Dont forget to add just curly braces in the storage file `{}` before testing