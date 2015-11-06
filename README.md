# LINQ to JavaScript

<p>With <strong>LINQ to JavaScript</strong>, querying javascript's arrays became easy. <strong>LINQ to JavaScript</strong> is containing many of the most important methods as in C#.NET LINQ to Objects.</p>
<p>
    <strong>LINQ to JavaScript</strong> makes you able to filter, project, sort, group and join sequence of elements using the most popular LINQ methods known for .NET Developers like
    <em>where, select, orderBy, groupBy, innerJoin, ..And a lot more</em>
</p>
<p><strong>LINQ to JavaScript</strong> extending the Array prototype which means you can directly call methods on an array and it also support chaining so you can call multiple methods in raw as you do with .NET LINQ</p>

<p><strong>LINQ to JavaScript</strong> tests written in <a herf="https://github.com/jasmine/jasmine">Jasmine</a> testing framework with all test cases you can find it in <em>Unit Tests</em> folder and the runner is <em>[LinqToJavascriptTestRunner.html]</em></p>


<h3>Methods List</h3>
<p>I'll start listing the methods included in <strong>LINQ to JavaScript</strong> library and i'll explain each one with proper examples.</p>

<h4>1- where (filter):</h4>
Filters a sequence of values based on a predicate.<br/>
<em>filter [mandatory] [Type: function, Returns: boolean]:</em> A function to test each element for a condition .<br/>
    <code>
        var ar = [1,2,3,4,5,6,7,8,9,10];<br/>
        ar = ar.where(o => o > 5); <br/>
        //Result ar = [6,7,8,9,10]
    </code>
    <br/>
    <br/>
    <code>
        var ar = [{ name: "Ibrahim", age:25 }, {name: "Nada", age:18}, {name: "Hassan", age:21}];<br/>
        ar = ar.where(o=> o.age > 20); <br/>
        //Result ar = [{ name: "Ibrahim", age:25 }, {name: "Hassan", age:21}]
    </code>

<h4>2- select (selector):</h4>
<p>Projects each element of a sequence into a new form.<br/>
<em>selector [mandatory] [Type: function, Returns: element.]:</em> A transform function to apply to each element.</p>
<code>
    var ar = [{ firstName: "Ibrahim", lastName: "Abdel Kareem", age:25 }, {firstName: "Nada", lastName: "ElNimr", age:20}, {firstName: "Hassan", lastName: "Ahmed", age:21}];<br />
    ar = ar.select(o=> { return { fullName: (o.firstName + " " + o.lastName), age: o.age} }); <br/>
    //Result ar = [{ fullName: "Ibrahim Abdel Kareem", age:25 }, {fullName: "Nada ElNimr", age:20}, {fullName: "Hassan Ahmed", age:21}]
</code>

<h4>3- firstOrDefault(filter):</h4>
<p>
    <em>[parameter]</em> Returns the first element of the sequence that satisfies a condition or null if no such element is found.<br/>
    <em>[no parameter]</em> Returns the first element of a sequence, or null if the sequence contains no elements.<br/>
    <em>filter [optional] [Type: function, Returns: boolean.]</em> A function to test each element for a condition<br/>
</p>
<code>
    var ar = [1,2,3,4,5,6,7,8,9];<br/>
    var noParameter = ar.firstOrDefault(); //Result 1<br/>
    var withParameter = ar.firstOrDefault(o=> o >7); //Result 8<br/>
    var noMatch = ar.firstOrDefault(o=> o >20); //Result null<br/>
</code>

<h4>3- lastOrDefault(filter):</h4>
<p>
    <em>[parameter]</em> Returns the last element of the sequence that satisfies a condition or null if no such element is found.<br />
    <em>[no parameter]</em> Returns the last element of a sequence, or null if the sequence contains no elements.<br />
    <em>filter [optional] [Type: function, Returns: boolean.]</em> A function to test each element for a condition<br/>
</p>
<code>
    var ar = [1,2,3,4,5,6,7,8,9];<br/>
    var noParameter = ar.lastOrDefault(); //Result 9<br/>
    var withParameter = ar.lastOrDefault(o=> o < 7); //Result 6<br/>
    var noMatch = ar.lastOrDefault(o=> o > 20); //Result null<br/>
</code>

<h4>4- take(number):</h4>
<p>
    Returns a specified number of contiguous elements from the start of a sequence.<br/>
    <em>number [mandatory] [Type: number]</em> The number of elements to return.
</p>
<code>
    var ar = [1,2,3,4,5,6,7,8,9];<br/>
    ar = ar.take(4); //Result [1,2,3,4]<br/>
</code>

<h4>5- takeWhile(filter):</h4>
<p>
    Returns elements from a sequence as long as a specified condition is true.<br/>
    <em>filter [mandatory] [Type: function, Returns: boolean.]</em> A function to test each element for a condition.
</p>
<code>
    var ar = [1,2,3,4,5,6,7,8,9];<br/>
    ar = ar.takeWhile(o=> o < 4); //Result [5,6,7,8,9]<br/>
</code>

<h4>6- skip(number):</h4>
<p>
    Bypasses a specified number of elements in a sequence and then returns the remaining elements.<br/>
    <em>number [mandatory] [Type: number]</em> The number of elements to Bypassed.
</p>
<code>
    var ar = [1,2,3,4,5,6,7,8,9];<br/>
    ar = ar.skip(4); <em>//Result [5,6,7,8,9]</em><br/>
</code>

<h4>7- skipWhile(filter):</h4>
<p>
    Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.<br />
    <em>filter [mandatory] [Type: function, Returns: boolean.]</em> A function to test each element for a condition.
</p>
<code>
    var ar = [1,2,3,4,5,6,7,8,9];<br/>
    ar = ar.skipWhile(o=> o < 5); <em>//Result [5,6,7,8,9]</em><br/>
</code>

<h4>8- orderBy(filter):</h4>
<p>
    <em>[no parameter]</em> Sorts the elements of a sequence in ascending order.<br/>
    <em>[parameter]</em> Sorts the elements of a sequence in ascending order according to a key.<br/>
    <em>filter [optional] [Type:function, Returns: object]</em> A function that returns a value to be used as the key in sorting.<br/>
    <em>filter [optional [Type:string]</em> Property name to be used as the key in sorting.<br/><br/>
    <b>NOTE:</b> filter parameter is optional if the sequence contains primitive types that can be sorted <em>[number, string]</em>. If sequence contains objects then you have to pass string or function to filter parameter as described above.
</p>
<code>
    var primitiveArray = [2,10,3,7,6,1,8,5,9,4];<br/>
    primitiveArray = ar.orderBy(); <em>//Result [1,2,3,4,5,6,7,8,9,10]</em><br/>
    var objectArray = [{ name: "Ibrahim", age:25 }, {name: "Nada", age:18}, {name: "Hassan", age:21}];<br/>
    var stringFilter = objectArray.orderBy("age"); <em>//Result: [{name: "Nada", age:18}, {name: "Hassan", age:21}, { name: "Ibrahim", age:25 }]</em><br/>
    var functionFilter = objectArray.orderBy(o=> o.name); <em>//Result: [{name: "Hassan", age:21}, { name: "Ibrahim", age:25 }, {name: "Nada", age:18}]</em>
</code>

<h4>9- orderByDesc(filter):</h4>
<p>
    <em>[no parameter]</em> Sorts the elements of a sequence in descending order.<br />
    <em>[parameter]</em> Sorts the elements of a sequence in descending order according to a key.<br />
    <em>filter [optional] [Type:function, Returns: object]</em> A function that returns a value to be used as the key in sorting.<br />
    <em>filter [optional [Type:string]</em> Property name to be used as the key in sorting.<br /><br />
    <b>NOTE:</b> filter parameter is optional if the sequence contains primitive types that can be sorted <em>[number, string]</em>. If sequence contains objects then you have to pass string or function to filter parameter as described above.
</p>
<code>
    var primitiveArray = [2,10,3,7,6,1,8,5,9,4];<br/>
    primitiveArray = ar.orderBy(); <em>//Result [10,9,8,7,6,5,4,3,2,1]</em><br/>
    var objectArray = [{name: "Nada", age:18}, {name: "Hassan", age:21}, { name: "Ibrahim", age:25 }];<br/>
    var stringFilter = objectArray.orderBy("age"); <em>//Result: [{ name: "Ibrahim", age:25 }, {name: "Hassan", age:21}, {name: "Nada", age:18}]</em><br/>
    var functionFilter = objectArray.orderBy(o=> o.name); <em>//Result: [ {name: "Nada", age:18}, { name: "Ibrahim", age:25 }, {name: "Hassan", age:21}]</em>
</code>

<h4>10 - groupBy(filter):</h4>
<p>
    Groups the elements of a sequence according to a specified key selector function.<br/>
    <em>filter [mandatory] [Type:function, Returns: object]</em> A function that returns a value to be used as the key in grouping.<br/>
    <em>filter [mandatory] [Type:string]</em> Property name to be used as the key in grouping.
</p>
<code>
    var ar = [{name: "Nada", age:18, role:"Admin"}, {name: "Hassan", age:21, role:"User"}, { name: "Ibrahim", age:25, role:"Admin" }];<br/>
    var stringFilter = ar.groupBy("role");<br/>
    <em>//Result: [{key: "Admin", value: [{name: "Nada", age:18, role:"Admin"},{ name: "Ibrahim", age:25, role:"Admin" }]}]</em><br/><br/>
    var functionFilter = ar.groupBy(o=> o.role);<br/>
    <em>//Result: [{key: "Admin", value: [{name: "Nada", age:18, role:"Admin"},{ name: "Ibrahim", age:25, role:"Admin" }]}]</em><br/>
</code>

<h4>11- removeAt(index):</h4>
<p>
    Remove an element from the array for given index.
    <em>index [mandatory] [Type:number]</em> The index to remove.
</p>
<code>
    var ar = [{name: "Nada", age:18, role:"Admin"}, {name: "Hassan", age:21, role:"User"}, { name: "Ibrahim", age:25, role:"Admin" }];<br/>
    ar.removeAt(1);
    <em>//Result: [{name: "Nada", age:18, role:"Admin"}, { name: "Ibrahim", age:25, role:"Admin" }];</em><br/>
</code>

<h4>12- innerJoin(listToJoin, conditionFunction, selectorFunction):</h4>
<p>
    Combines the elements of two sequences based on matching keys.<br/>
    <em>listToJoin [mandatory] [type:Array]</em> The sequence to join.<br/>
    <em>conditionFunction [mandatory] [Type:function, Returns:boolean]</em> A function that compare keys of both sequences.<br/>
    <em>selectorFunction [optional] [Type:function, Returns:object]</em> A function that projects each joined elements of both sequences into a new form (Optional).
</p>
<code>
    var users = [{ id: 1, firstName: "Ahmed", lastName: "Hassan", age: 18, roleId: 2 }, { id: 2, firstName: "Ibrahim", lastName: "Abdel Kareem", age: 25, roleId: 1 }, { id: 3, firstName: "Nada", lastName: "El Nimr", age: 25, roleId: 1 }, {id:4, firstName: "Mohammed", lastName: "Ahmed", age:28, roleId:3}];<br/>
    var roles = [{ id: 1, roleName: "Admin" }, { id: 2, roleName: "User" }];<br/>
    var withoutSelector = users.innerJoin(roles, (user,role)=> user.roleId == role.id);<br/>
    <em>//Result: [{ id: 1, firstName: "Ahmed", lastName: "Hassan", age: 18, roleId: 2, id1: 2, roleName: "User" }, { id: 2, firstName: "Ibrahim", lastName: "Abdel Kareem", age: 25, roleId: 1, id1: 1, roleName: "Admin" }, { id: 3, firstName: "Nada", lastName: "El Nimr", age: 25, roleId: 1, id1: 1, roleName: "Admin" }]</em><br/>
    <em>NOTE: id1 is the id property in role object and it was named id1 because there's no selectorFunction and there's property with the same name in user object</em><br/><br/>
    var withSelector = users.innerJoin(roles, (user,role)=> user.roleId == role.id, (user,role)=> {return { id: user.id, fullName: (user.firstName + " " + user.lastName), age: user.age, roleId: role.id, roleName: role.roleName }});<br/>
    <em>//Result: [{ id: 1, fullName: "Ahmed Hassan", age: 18, roleId: 2, roleName: "User" }, { id: 2, fullName: "Ibrahim Abdel Kareem", age: 25, roleId: 1, roleName: "Admin" }, { id: 3, firstName: "Nada El Nimr", age: 25, roleId: 1, roleName: "Admin" }]</em><br/>
</code>

<h4>13- leftOuterJoin(listToJoin, conditionFunction, selectorFunction):</h4>
<p>
    Combines the elements of two sequences based on matching keys if matching was found.<br />
    <em>listToJoin [mandatory] [Type:Array]</em> The sequence to join.<br />
    <em>conditionFunction [mandatory] [Type:function, Returns:boolean]</em> A function that compare keys of both sequences.<br />
    <em>selectorFunction [optional] [Type:function, Returns:object]</em> A function that projects each joined elements of both sequences into a new form (Optional).
</p>
<code>
    var users = [{ id: 1, firstName: "Ahmed", lastName: "Hassan", age: 18, roleId: 2 }, { id: 2, firstName: "Ibrahim", lastName: "Abdel Kareem", age: 25, roleId: 1 }, { id: 3, firstName: "Nada", lastName: "El Nimr", age: 25, roleId: 1 }, {id:4, firstName: "Mohammed", lastName: "Ahmed", age:28, roleId:3}];<br/>
    var roles = [{ id: 1, roleName: "Admin" }, { id: 2, roleName: "User" }];<br/>
    var withoutSelector = users.leftOuterJoin(roles, (user,role)=> user.roleId == role.id);<br/>
    <em>//Result: [{ id: 1, firstName: "Ahmed", lastName: "Hassan", age: 18, roleId: 2, id1: 2, roleName: "User" }, { id: 2, firstName: "Ibrahim", lastName: "Abdel Kareem", age: 25, roleId: 1, id1: 1, roleName: "Admin" }, { id: 3, firstName: "Nada", lastName: "El Nimr", age: 25, roleId: 1, id1: 1, roleName: "Admin" }, , {id:4, firstName: "Mohammed", lastName: "Ahmed", age:28, roleId:3}]</em><br/>
    <em>NOTE: user with id = 4 returned however there's no role for him</em><br/><br/>
    var withSelector = users.leftOuterJoin(roles, (user,role)=> user.roleId == role.id, (user,role)=> {return { id: user.id, fullName: (user.firstName + " " + user.lastName), age: user.age, roleId: role ? role.id : null, roleName: role ? role.roleName : null }});<br/>
    <em>//Result: [{ id: 1, fullName: "Ahmed Hassan", age: 18, roleId: 2, roleName: "User" }, { id: 2, fullName: "Ibrahim Abdel Kareem", age: 25, roleId: 1, roleName: "Admin" }, { id: 3, firstName: "Nada El Nimr", age: 25, roleId: 1, roleName: "Admin" }, {id:4, firstName: "Mohammed", lastName: "Ahmed", age:28, roleId: null, roleName: null}]</em><br/>
</code>

<h4>15- any(filter):</h4>
<em>[parameter]</em> Determines whether any element of a sequence satisfies a condition.<br/>
<em>[no parameter]</em> Determines whether a sequence contains any elements.<br/>
<em>filter [optional] [Type: function, Returns: boolean]</em> A function to test each element for a condition.<br/><br/>
<code>
    var emptyArray = [];<br/>
    var dataArray = [1,2,3,5,6,8];<br/>
    var hasData = emptyArray.any(); //Result: false<br/>
    var hasData2 = dataArray.any(); //Result: true<br/>
    var condition = dataArray.any(o => o > 5); //Result: true<br/>
</code>

<h4>16- all(filter)</h4>
Determines whether all element of a sequence satisfies a condition.<br/>
<em>filter [mandatory] [Type: function, Returns: boolean]</em> A function to test each element for a condition.<br /><br />
<code>
    var dataArray = [1,2,3,5,6,8];<br/>
    var falsyCondition = emptyArray.all(o=> o > 5); //Result: false<br/>
    var truthyCondition = dataArray.all(o => o < 10); //Result: true<br/>
</code>

<h4>17- max(selector)</h4>
Returns the maximum value in the sequence<br/>
<em>selector [mandatory] [Type: function, Returns: number]</em> A function to return a number from a sequence element to be used in maximum calculation.<br/><br/>
<code>
    var numbersArray = [1,74,30,2,95,5,2,33,3,77,4,5,6,7];<br/>
    var employeesArray = [{name: "Ahmed", age:18}, {name: "Ibrahim", age: 25}, {name: "Mohamed", age:13}];<br/>
    var numberMax = numbersArray.max(o=> o); //Result: 95<br/>
    var oldestEmployee = employeesArray.max(o=> o.age); //Result: 25<br/>
</code>

<h4>18- min(selector)</h4>
Returns the minimum value in the sequence<br />
<em>selector [mandatory] [Type: function, Returns: number]</em> A function to return a number from a sequence element to be used in maximum calculation.<br /><br />
<code>
    var numbersArray = [1,74,30,2,95,5,2,33,3,77,4,5,6,7];<br/>
    var employeesArray = [{name: "Ahmed", age:18}, {name: "Ibrahim", age: 25}, {name: "Mohamed", age:13}];<br/>
    var numberMin = numbersArray.min(o=> o); //Result: 1<br/>
    var youngestEmployee = employeesArray.min(o=> o.age); //Result: 13<br/>
</code>

<h4>19- average(selector)</h4>
Returns the average from values in the sequence.<br />
<em>selector [mandatory] [Type: function, Returns: number]</em> A function to return a number from a sequence element to be used in maximum calculation.<br /><br />
<code>
    var numbersArray = [1,74,30,2,95,5,2,33,3,77,4,5,6,7];<br/>
    var employeesArray = [{name: "Ahmed", age:18}, {name: "Ibrahim", age: 25}, {name: "Mohamed", age:13}];<br/>
    var numberAvg = numbersArray.average(o=> o); //Result: 24.571428571428573<br/>
    var ageAverage = employeesArray.average(o=> o.age); //Result: 18.666666666666668<br/>
</code>


<p>Hope you liked the <strong>LINQ to JavaScript</strong> framework. Appreciating your feedback and suggestions for improvements. Thanks a lot ;)</p>