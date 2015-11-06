function getArrayOfNumbers() {
    return [4, 8, 2, 1, 66, 8, 4, 77, 2, 3, 56, 7, 1, 2, 0, 4, 9, 6, 3, 54, 6, 41, 31, 25];
}

function getArrayOfNames() {
    return ["Ahmed", "Hassan", "Adel", "Soad", "Ibrahim", "Mona", "Samy", "Zeyad", "Nada", "Heba", "Qassem", "Ramy"];
}

function getArrayOfObjects() {
    return [{ name: "Ahmed", age: 36 }, { name: "Hassan", age: 22 }, { name: "Adel", age: 22 }, { name: "Soad", age: 30 }, { name: "Ibrahim", age: 37 }, { name: "Mona", age: 26 }, { name: "Samy", age: 22 }, { name: "Zeyad", age: 34 }, { name: "Nada", age: 30 }, { name: "Heba", age: 25 }, { name: "Qassem", age: 39 }, { name: "Ramy", age: 31 }];
}

function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
}

describe("swapValues function", function () {
    it("Should swap values", function () {
        var ar = getArrayOfNumbers();
        var firstIndex = getRandomIndex(ar.length - 1);
        var secondIndex = getRandomIndex(ar.length - 1);
        var firstValue = ar[firstIndex];
        var secondValue = ar[secondIndex];

        ar = ar.swapValues(firstIndex, secondIndex);
        expect(ar[firstIndex]).toEqual(secondValue);
        expect(ar[secondIndex]).toEqual(firstValue);
    });
});

describe("isInitializedWithData function", function () {
    it("Should check if array has data", function () {
        var ar = [];
        var result = ar.isInitializedWithData();
        expect(result).toBe(false);

        ar.push(1);
        result = ar.isInitializedWithData();
        expect(result).toBe(true);
    });
});

describe("where function", function () {
    var numbers = [];

    beforeEach(function () {
        numbers = getArrayOfNumbers();
    });

    it("Should filter numbers array", function () {
        numbers = numbers.where(o => o < 10);
        for (var c = 0; c < numbers.length; c++) {
            expect(numbers[c]).toBeLessThan(10);
        }
    });

    it("Should filter array of objects", function () {
        var objects = getArrayOfObjects();
        objects = objects.where(o => o.age > 30);
        for (var c = 0; c < objects.length; c++) {
            expect(objects[c].age).toBeGreaterThan(30);

        }
    });

    it("Should throw exception if parameter passed isn't a function", function () {
        expect(function () { numbers.where("o > 10") }).toThrow();
    });

    it("Should throw exception if parameter passed is a function that's not returning a boolean", function () {
        expect(function () { numbers.where(o => o) }).toThrow();
    });
});

describe("select function", function () {
    var objects = [];

    beforeEach(function () {
        objects = getArrayOfObjects();
    });

    it("Should return array of names only", function () {
        objects = objects.select(o => o.name);
        for (var c = 0; c < objects.length; c++) {
            expect(typeof objects[c]).toEqual("string");
        }
    });

    it("Should return array of objects in new form", function () {
        objects = objects.select(o => {
            return { name: o.name, age: o.age, introduction: ("My name is " + o.name + " I'm " + o.age + " years old.") }
        });

        for (var c = 0; c < objects.length; c++) {
            expect(objects[c].name).not.toBeUndefined();
            expect(objects[c].age).not.toBeUndefined();
            expect(objects[c].introduction).not.toBeUndefined();
        }
    });

    it("Should throw exception if parameter passed not a function", function () {
        expect(function () { objects.select("Hello") }).toThrow();
    });
});

describe("firstOrDefault function", function () {
    var numbers = [];

    beforeEach(function () {
        numbers = getArrayOfNumbers();
    });

    it("Should return first element of the array", function () {
        var sut = numbers[0];

        expect(numbers.firstOrDefault()).toEqual(sut);
    });

    it("Should return null if array has no elements", function () {
        var sut = [];
        expect(sut.firstOrDefault()).toBeNull();
    });

    it("Should return first element of the array that match the condition", function () {

        var sut = numbers.firstOrDefault(o => o > 20);

        for (var c = 0; c < numbers.length; c++) {
            if (numbers[c] > 20) {
                expect(numbers[c]).toEqual(sut);
                break;
            }
        }
    });

    it("Should return null if array has no element that match the condition", function () {

        var sut = numbers.firstOrDefault(o => o > 10000);
        expect(sut).toBeNull();
    });

    it("Should throw exception if parameter passed isn't a function", function () {
        expect(function () { numbers.firstOrDefault("o=> o >10") }).toThrow();
    });

    it("Should throw exception if parameter passed is a function that's not returning a boolean", function () {
        expect(function () { numbers.firstOrDefault(o => o) }).toThrow();
    });


});

describe("lastOrDefault function", function () {
    var numbers = [];

    beforeEach(function () {
        numbers = getArrayOfNumbers();
    });

    it("Should return last element of the array", function () {
        var sut = numbers[numbers.length - 1];

        expect(numbers.lastOrDefault()).toEqual(sut);
    });

    it("Should return null if array has no elements", function () {
        var sut = [];
        expect(sut.lastOrDefault()).toBeNull();
    });

    it("Should return last element of the array that match the condition", function () {

        var sut = numbers.lastOrDefault(o => o > 20);

        for (var c = numbers.length - 1; c >= 0; c--) {
            if (numbers[c] > 20) {
                expect(numbers[c]).toEqual(sut);
                break;
            }
        }
    });

    it("Should return null if array has no element that match the condition", function () {

        var sut = numbers.lastOrDefault(o => o > 10000);
        expect(sut).toBeNull();
    });

    it("Should throw exception if parameter passed isn't a function", function () {
        expect(function () { numbers.lastOrDefault("o=> o >10") }).toThrow();
    });

    it("Should throw exception if parameter passed is a function that's not returning a boolean", function () {
        expect(function () { numbers.lastOrDefault(o => o) }).toThrow();
    });


});

describe("take function", function () {
    var numbers = [];

    beforeEach(function () {
        numbers = getArrayOfNumbers();
    });

    it("Should return this if sequence contains no elements", function () {
        var sut = [];
        expect(sut.take(5)).toBe(sut);
    });

    it("Should throw exception if parameter passed isn't a number", function () {
        expect(function () { numbers.take("three") }).toThrow();
    });

    it("Should throw exception if parameter passed is a number that's less than 1", function () {
        expect(function () { numbers.take(0) }).toThrow();
    });

    it("Should return specific number of elements", function () {
        var numberToTake = Math.floor((Math.random() * (numbers.length)) + 1);
        var sut = numbers.take(numberToTake);
        expect(sut.length).toBe(numberToTake);
    });

    it("Should return this if sequence length is less than or equals passed number", function () {
        var numberToTake = numbers.length;
        var sut = numbers.take(numberToTake);
        expect(sut).toEqual(numbers);
    });
});

describe("takeWhile function", function () {
    var numbers = [];

    beforeEach(function () {
        numbers = getArrayOfNumbers();
    });

    it("Should return this if sequence contains no elements", function () {
        var sut = [];
        expect(sut.takeWhile(o => o > 10)).toBe(sut);
    });

    it("Should throw exception if no parameter was passed", function () {
        expect(function () { numbers.takeWhile() }).toThrow();
    });

    it("Should throw exception if parameter passed isn't a function", function () {
        expect(function () { numbers.takeWhile(5) }).toThrow();
    });

    it("Should throw exception if parameter passed is a function that's not returning a boolean", function () {
        expect(function () { numbers.takeWhile(o => o) }).toThrow();
    });

    it("Should return empty sequence if no element matched the confition at the begining of a sequence", function () {
        var sut = [1, 2, 3, 4, 5, 6, 7];
        expect(sut.takeWhile(o => o > 4)).toEqual([]);
    });

    it("Should return sequence of elements as long as the condition is true", function () {
        var sut = [1, 2, 3, 4, 6, 2, 8, 9, 20, 2, 1, 3, 4, 5];
        var expected = [1, 2, 3, 4, 6, 2, 8, 9];
        expect(sut.takeWhile(o => o < 10)).toEqual(expected);
    });
});

describe("skip function", function () {
    var numbers = [];

    beforeEach(function () {
        numbers = getArrayOfNumbers();
    });

    it("Should return this if sequence contains no elements", function () {
        var sut = [];
        expect(sut.skip(5)).toBe(sut);
    });

    it("Should throw exception if parameter passed isn't a number", function () {
        expect(function () { numbers.skip("three") }).toThrow();
    });

    it("Should throw exception if parameter passed is a number that's less than 1", function () {
        expect(function () { numbers.skip(0) }).toThrow();
    });

    it("Should skip specific number of elements", function () {
        var numberToSkip = Math.floor((Math.random() * (numbers.length - 1)) + 1);
        var sut = numbers.skip(numberToSkip);
        expect(sut.length + numberToSkip).toBe(numbers.length);
    });

    it("Should return empty sequence if sequence length is less than or equals passed number", function () {
        var numberToTake = numbers.length;
        var sut = numbers.skip(numberToTake);
        expect(sut).toEqual([]);
    });
});

describe("skipWhile function", function () {
    var numbers = [];

    beforeEach(function () {
        numbers = getArrayOfNumbers();
    });

    it("Should return this if sequence contains no elements", function () {
        var sut = [];
        expect(sut.skipWhile(o => o > 10)).toBe(sut);
    });

    it("Should throw exception if no parameter was passed", function () {
        expect(function () { numbers.skipWhile() }).toThrow();
    });

    it("Should throw exception if parameter passed isn't a function", function () {
        expect(function () { numbers.skipWhile(5) }).toThrow();
    });

    it("Should throw exception if parameter passed is a function that's not returning a boolean", function () {
        expect(function () { numbers.skipWhile(o => o) }).toThrow();
    });

    it("Should return empty sequence if all elements matched the confition", function () {
        var sut = [1, 2, 3, 4, 5, 6, 7];
        expect(sut.skipWhile(o => o < 10)).toEqual([]);
    });

    it("Should return sequence starting from the first element that match the condition", function () {
        var sut = [1, 2, 3, 4, 5, 6, 7];
        var expected = [4, 5, 6, 7];
        expect(sut.skipWhile(o => o < 4)).toEqual(expected);
    });
    it("Should return this if first element doesn't match the condition", function () {
        var sut = [100, 2, 3, 4, 6, 2, 8, 9, 20, 2, 1, 3, 4, 5];
        expect(sut.skipWhile(o => o < 10)).toEqual(sut);
    });
});

describe("orderBy function", function () {

    it("Should return this if sequence has no elements", function () {
        var sut = [];
        expect(sut.orderBy()).toEqual([]);
    });

    it("Should sort numbers sequence", function () {
        var sut = [1, 5, 2, 4, 3];
        var expected = [1, 2, 3, 4, 5];
        expect(sut.orderBy()).toEqual(expected);
    });

    it("Should sort string sequence", function () {
        var sut = ["Zeyad", "Ahmed", "Hassan", "Mona"];
        var expected = ["Ahmed", "Hassan", "Mona", "Zeyad"];
        expect(sut.orderBy()).toEqual(expected);
    });

    it("Should sort boolean sequence", function () {
        var sut = [false, true, false, true];
        var expected = [false, false, true, true];
        expect(sut.orderBy()).toEqual(expected);
    });

    it("Should throw exception if primitive sequence containing different type", function () {
        var sut = [4, 7, 123, 1, 3, 4, 6, "33", 12, 3, 2, 33];
        expect(sut.orderBy).toThrow();
    });

    it("Should throw exception if no parameter passed when sorting sequence of objects", function () {
        var sut = getArrayOfObjects();
        expect(sut.orderBy).toThrow();
    });

    it("Should throw exception if parameter passed isn't a function or string", function () {
        var sut = getArrayOfObjects();
        expect(function () { sut.orderBy(3) }).toThrow();
    });

    it("Should sort objects sequence based on string key", function () {
        var sut = [{ name: "Zeyad", age: 19 }, { name: "Ahmed", age: 22 }, { name: "Mona", age: 18 }, { name: "Soad", age: 21 }];
        var expected = [{ name: "Mona", age: 18 }, { name: "Zeyad", age: 19 }, { name: "Soad", age: 21 }, { name: "Ahmed", age: 22 }];
        expect(sut.orderBy("age")).toEqual(expected);
    });

    it("Should sort objects sequence based on a function return", function () {
        var sut = [{ name: "Zeyad", age: 19 }, { name: "Ahmed", age: 22 }, { name: "Mona", age: 18 }, { name: "Soad", age: 21 }];
        var expected = [{ name: "Ahmed", age: 22 }, { name: "Mona", age: 18 }, { name: "Soad", age: 21 }, { name: "Zeyad", age: 19 }];
        expect(sut.orderBy(o => o.name)).toEqual(expected);
    });

    it("Should throw exception when sorting objects sequence if the comparing property for an element has a different type", function () {
        var sut = [{ name: "Zeyad", age: 19 }, { name: "Ahmed", age: 22 }, { name: true, age: 18 }, { name: "Soad", age: 21 }];
        expect(function () { sut.orderBy(o => o.name) }).toThrow();
    });

    it("Should push objects the has its comparing property equals [null or undefined] to the end of the sequence", function () {
        var sut = [{ name: null, age: 19 }, { name: "Ahmed", age: 22 }, { age: 18 }, { name: "Soad", age: 21 }];
        var expected = [{ name: "Ahmed", age: 22 }, { name: "Soad", age: 21 }, { name: null, age: 19 }, { age: 18 }];
        expect(sut.orderBy(o => o.name)).toEqual(expected);
    });
});

describe("orderByDesc function", function () {

    it("Should return this if sequence has no elements", function () {
        var sut = [];
        expect(sut.orderByDesc()).toEqual([]);
    });

    it("Should sort numbers sequence in decending order", function () {
        var sut = [1, 5, 2, 4, 3];
        var expected = [5, 4, 3, 2, 1];
        expect(sut.orderByDesc()).toEqual(expected);
    });

    it("Should sort string sequence in decending order", function () {
        var sut = ["Zeyad", "Ahmed", "Hassan", "Mona"];
        var expected = ["Zeyad", "Mona", "Hassan", "Ahmed"];
        expect(sut.orderByDesc()).toEqual(expected);
    });

    it("Should sort boolean sequence in decending order", function () {
        var sut = [false, true, false, true];
        var expected = [true, true, false, false];
        expect(sut.orderByDesc()).toEqual(expected);
    });

    it("Should throw exception if primitive sequence containing different type", function () {
        var sut = [4, 7, 123, 1, 3, 4, 6, "33", 12, 3, 2, 33];
        expect(sut.orderByDesc).toThrow();
    });

    it("Should throw exception if no parameter passed when sorting sequence of objects", function () {
        var sut = getArrayOfObjects();
        expect(sut.orderByDesc).toThrow();
    });

    it("Should throw exception if parameter passed when sorting sequence of objects is not a function or string", function () {
        var sut = getArrayOfObjects();
        expect(function () { sut.orderByDesc(3) }).toThrow();
    });

    it("Should sort objects sequence based on string key in decending order", function () {
        var sut = [{ name: "Zeyad", age: 19 }, { name: "Ahmed", age: 22 }, { name: "Mona", age: 18 }, { name: "Soad", age: 21 }];
        var expected = [{ name: "Ahmed", age: 22 }, { name: "Soad", age: 21 }, { name: "Zeyad", age: 19 }, { name: "Mona", age: 18 }];
        expect(sut.orderByDesc("age")).toEqual(expected);
    });

    it("Should sort objects sequence based on a function return in decending order", function () {
        var sut = [{ name: "Zeyad", age: 19 }, { name: "Ahmed", age: 22 }, { name: "Mona", age: 18 }, { name: "Soad", age: 21 }];
        var expected = [{ name: "Zeyad", age: 19 }, { name: "Soad", age: 21 }, { name: "Mona", age: 18 }, { name: "Ahmed", age: 22 }];
        expect(sut.orderByDesc(o => o.name)).toEqual(expected);
    });

    it("Should throw exception when sorting objects sequence if the comparing property for an element has a different type", function () {
        var sut = [{ name: "Zeyad", age: 19 }, { name: "Ahmed", age: 22 }, { name: true, age: 18 }, { name: "Soad", age: 21 }];
        expect(function () { sut.orderByDesc(o => o.name) }).toThrow();
    });

    it("Should push objects the has its comparing property equals [null or undefined] to the end of the sequence", function () {
        var sut = [{ name: null, age: 19 }, { name: "Ahmed", age: 22 }, { age: 18 }, { name: "Soad", age: 21 }];
        var expected = [{ name: "Soad", age: 21 }, { name: "Ahmed", age: 22 }, { name: null, age: 19 }, { age: 18 }];
        expect(sut.orderByDesc(o => o.name)).toEqual(expected);
    });


});

describe("groupBy function", function () {

    it("Should return this if sequence has no elements", function () {
        var sut = [];
        expect(sut.groupBy()).toEqual([]);
    });

    it("Should throw exception if no parameter was passed", function () {
        var sut = getArrayOfObjects();
        expect(sut.groupBy).toThrow();
    });

    it("Should throw exception if parameter passed is not a function or string", function () {
        var sut = getArrayOfObjects();
        expect(function () { sut.groupBy(2) }).toThrow();
    });

    it("Should throw exception if the key was of type Array", function () {
        var sut = [{ name: "Ibrahim", age: 18, roles: ["Admin", "Super Admin"] }, { name: "Hassan", age: 21, roles: ["Admin", "Super User"] }];
        expect(function () { sut.groupBy(o => o.roles) }).toThrow();
    });

    it("Should group objects based on a given key string", function () {
        var sut = [
            { name: "Ibrahim", age: 18, role: "Super Admin" },
            { name: "Zeyad", age: 24, role: "Admin" },
            { name: "Hassan", age: 23, role: "User" },
            { name: "Nada", age: 25, role: "Admin" }
        ];

        var expected = [
        {
            key: "Super Admin",
            value: [{ name: "Ibrahim", age: 18, role: "Super Admin" }]
        },
        {
            key: "Admin",
            value: [{ name: "Zeyad", age: 24, role: "Admin" }, { name: "Nada", age: 25, role: "Admin" }]
        },
        {
            key: "User",
            value: [{ name: "Hassan", age: 23, role: "User" }]
        }
        ];

        expect(sut.groupBy("role")).toEqual(expected);
    });

    it("Should group objects based on a function return", function () {
        var sut = [
            { name: "Ibrahim", age: 18, role: "Super Admin" },
            { name: "Zeyad", age: 24, role: "Admin" },
            { name: "Hassan", age: 23, role: "User" },
            { name: "Nada", age: 25, role: "Admin" }
        ];

        var expected = [
        {
            key: "Super Admin",
            value: [{ name: "Ibrahim", age: 18, role: "Super Admin" }]
        },
        {
            key: "Admin",
            value: [{ name: "Zeyad", age: 24, role: "Admin" }, { name: "Nada", age: 25, role: "Admin" }]
        },
        {
            key: "User",
            value: [{ name: "Hassan", age: 23, role: "User" }]
        }
        ];

        expect(sut.groupBy(o => o.role)).toEqual(expected);
    });
});

describe("removeAt function", function () {
    it("Should remove item at specific index from a sequence", function () {
        var ar = [1, 2, 3, 4, 5, 6];
        var itemToRemove = ar[3];
        ar.removeAt(3)
        expect(ar[3]).not.toEqual(itemToRemove);
    });
});

describe("innerJoin function", function () {

    it("Should throw exception if first parameter wasn't an Array", function () {
        var sut = getArrayOfObjects();
        expect(function () { sut.innerJoin({ name: "Ahmed", age: 18 }, (o, e) => o.age == e.age) }).toThrow();
    });

    it("Should throw exception if condition parameter were passed isn't a function", function () {
        var ar = getArrayOfObjects();
        var ar2 = getArrayOfObjects();
        expect(function () { ar.innerJoin(ar2, 5) }).toThrow();
    });

    it("Should throw exception if selector parameter were passed and it's not a function", function () {
        var ar = getArrayOfObjects();
        var ar2 = getArrayOfObjects();
        expect(function () { ar.innerJoin(ar2, (o, e) => o.age == e.age, 2) }).toThrow();
    });

    it("Should join two sequences based on a joining condition", function () {
        var users = [{ id: 1, name: "Ahmed", age: 18, roleId: 2 }, { id: 2, name: "Ibrahim", age: 25, roleId: 1 }, { id: 3, name: "Nada", age: 25, roleId: 1 }];
        var roles = [{ id: 1, name: "Admin" }, { id: 2, name: "User" }];
        var sut = users.innerJoin(roles, (user, role) => user.roleId === role.id);
        var expected =
            [
            { id: 1, name: "Ahmed", age: 18, roleId: 2, id1: 2, name1: "User" },
            { id: 2, name: "Ibrahim", age: 25, roleId: 1, id1: 1, name1: "Admin" },
            { id: 3, name: "Nada", age: 25, roleId: 1, id1: 1, name1: "Admin" }
            ];
        expect(sut).toEqual(expected);
    });

    it("Should join two sequences in a form defined in selector function based on a joining condition", function () {
        var users = [{ id: 1, name: "Ahmed", age: 18, roleId: 2 }, { id: 2, name: "Ibrahim", age: 25, roleId: 1 }, { id: 3, name: "Nada", age: 25, roleId: 1 }];
        var roles = [{ id: 1, name: "Admin" }, { id: 2, name: "User" }];
        var sut = users.innerJoin(roles, (user, role) => user.roleId === role.id, (user, role) => { return { id: user.id, name: user.name, age: user.age, roleId: role.id, roleName: role.name } });
        var expected =
            [
            { id: 1, name: "Ahmed", age: 18, roleId: 2, roleName: "User" },
            { id: 2, name: "Ibrahim", age: 25, roleId: 1, roleName: "Admin" },
            { id: 3, name: "Nada", age: 25, roleId: 1, roleName: "Admin" }
            ];
        expect(sut).toEqual(expected);
    });
});

describe("leftOuterJoin function", function () {

    it("Should throw exception if first parameter wasn't an Array", function () {
        var sut = getArrayOfObjects();
        expect(function () { sut.leftOuterJoin({ name: "Ahmed", age: 18 }, (o, e) => o.age == e.age) }).toThrow();
    });

    it("Should throw exception if condition parameter were passed isn't a function", function () {
        var ar = getArrayOfObjects();
        var ar2 = getArrayOfObjects();
        expect(function () { ar.leftOuterJoin(ar2, 5) }).toThrow();
    });

    it("Should throw exception if selector parameter were passed and it's not a function", function () {
        var ar = getArrayOfObjects();
        var ar2 = getArrayOfObjects();
        expect(function () { ar.leftOuterJoin(ar2, (o, e) => o.age == e.age, 2) }).toThrow();
    });

    it("Should join two sequences based on a joining condition", function () {
        var users = [{ id: 1, name: "Ahmed", age: 18, roleId: 2 }, { id: 2, name: "Ibrahim", age: 25, roleId: 1 }, { id: 3, name: "Nada", age: 25, roleId: 1 }];
        var roles = [{ id: 1, name: "Admin" }, { id: 2, name: "User" }];
        var sut = users.leftOuterJoin(roles, (user, role) => user.roleId === role.id);
        var expected =
            [
            { id: 1, name: "Ahmed", age: 18, roleId: 2, id1: 2, name1: "User" },
            { id: 2, name: "Ibrahim", age: 25, roleId: 1, id1: 1, name1: "Admin" },
            { id: 3, name: "Nada", age: 25, roleId: 1, id1: 1, name1: "Admin" }
            ];
        expect(sut).toEqual(expected);
    });

    it("Should join two sequences in a form defined in selector function based on a joining condition", function () {
        var users = [{ id: 1, name: "Ahmed", age: 18, roleId: 2 }, { id: 2, name: "Ibrahim", age: 25, roleId: 1 }, { id: 3, name: "Nada", age: 25, roleId: 1 }];
        var roles = [{ id: 1, name: "Admin" }, { id: 2, name: "User" }];
        var sut = users.leftOuterJoin(roles, (user, role) => user.roleId === role.id, (user, role) => { return { id: user.id, name: user.name, age: user.age, roleId: role.id, roleName: role.name } });
        var expected =
            [
            { id: 1, name: "Ahmed", age: 18, roleId: 2, roleName: "User" },
            { id: 2, name: "Ibrahim", age: 25, roleId: 1, roleName: "Admin" },
            { id: 3, name: "Nada", age: 25, roleId: 1, roleName: "Admin" }
            ];
        expect(sut).toEqual(expected);
    });

    it("Should return all first sequence elements even if there's no matched element in the second sequence", function () {
        var users = [{ id: 1, name: "Ahmed", age: 18, roleId: 2 }, { id: 2, name: "Ibrahim", age: 25, roleId: 1 }, { id: 3, name: "Nada", age: 25, roleId: 3 }];
        var roles = [{ id: 1, name: "Admin" }, { id: 2, name: "User" }];
        var sut = users.leftOuterJoin(roles, (user, role) => user.roleId === role.id);
        var expected =
            [
            { id: 1, name: "Ahmed", age: 18, roleId: 2, id1: 2, name1: "User" },
            { id: 2, name: "Ibrahim", age: 25, roleId: 1, id1: 1, name1: "Admin" },
            { id: 3, name: "Nada", age: 25, roleId: 3 }
            ];
        expect(sut).toEqual(expected);
    });

    it("Should return all first sequence elements in a new form even if there's no matched element in the second sequence", function () {
        var users = [{ id: 1, name: "Ahmed", age: 18, roleId: 2 }, { id: 2, name: "Ibrahim", age: 25, roleId: 1 }, { id: 3, name: "Nada", age: 25, roleId: 3 }];
        var roles = [{ id: 1, name: "Admin" }, { id: 2, name: "User" }];
        var sut = users.leftOuterJoin(roles, (user, role) => user.roleId === role.id, (user, role) => { return { userId: user.id, userName: user.name, age: user.age, roleId: (role ? role.id : null), roleName: (role ? role.name : null) } });
        var expected =
            [
            { userId: 1, userName: "Ahmed", age: 18, roleId: 2, roleName: "User" },
            { userId: 2, userName: "Ibrahim", age: 25, roleId: 1, roleName: "Admin" },
            { userId: 3, userName: "Nada", age: 25, roleId: null, roleName: null }
            ];
        expect(sut).toEqual(expected);
    });
});

describe("any function", function () {
    var numbers = [];

    beforeEach(function () {
        numbers = getArrayOfNumbers();
    });

    it("Should throw exception if parameter passed isn't a function", function () {
        expect(function () { numbers.any("o > 10") }).toThrow();
    });

    it("Should throw exception if parameter passed is a function that's not returning a boolean", function () {
        expect(function () { numbers.any(o => o) }).toThrow();
    });

    it("Should return false if sequence contains no elements", function () {
        var sut = [];
        expect(sut.any()).toBe(false);
    });

    it("Should return true if sequence contains at least one element", function () {
        var sut = [1];
        expect(sut.any()).toBe(true);
    });

    it("Should return true if sequence contains one element that match the condition", function () {
        var sut = [1, 2, 3, 22, 3, 4, 6, 5, 3];
        expect(sut.any(o=> o > 10)).toBe(true);
    });

    it("Should return false if sequence doesn't contains one element that match the condition", function () {
        var sut = [1, 2, 3, 22, 3, 4, 6, 5, 3];
        expect(sut.any(o=> o > 100)).toBe(false);
    });
});

describe("all function", function () {
    var numbers = getArrayOfNumbers();

    it("Should throw exception if no parameter were passed", function () {
        expect(function () { numbers.all() }).toThrow();
    });

    it("Should throw exception if parameter passed isn't a function", function () {
        expect(function () { numbers.all("o > 10") }).toThrow();
    });

    it("Should throw exception if parameter passed is a function that's not returning a boolean", function () {
        expect(function () { numbers.all(o => o) }).toThrow();
    });

    it("Should return false if one element in sequence not matching the condition", function () {
        var sut = [1, 2, 3, 33, 2, 6, 8, 4, 2];
        expect(sut.all(o => o < 10)).toBe(false);
    });

    it("Should return true if all elements in sequence matching the condition", function () {
        var sut = [1, 2, 3, 2, 6, 8, 4, 2];
        expect(sut.all(o => o < 10)).toBe(true);
    });
});

describe("max function", function () {

    it("Should throw exception if sequence contains no elements", function () {
        var sut = [];
        expect(function () { sut.max(); }).toThrow();
    });

    it("Should throw exception if parameter were passed is not a function", function () {
        var sut = getArrayOfObjects();
        expect(function () { sut.max("o=> o.age"); }).toThrow();
    });

    it("Should throw exception if parameter were passed is a function that takes no parameters", function () {
        var sut = getArrayOfObjects();
        expect(function () {
            sut.max(() => {
                return 5;
            });
        }).toThrow();
    });

    it("Should throw exception if function parameter was returning non numeric value", function () {
        var sut = getArrayOfObjects();
        expect(function () {
            sut.max(o => o.name);
        }).toThrow();
    });

    it("Should throw exception if a sequence contains non-numeric value", function () {
        var sut = [2, 3, 4, 44, 2, 5, 6, 611, "H", 22];
        expect(sut.max).toThrow();
    });

    it("Should return maximum number of a sequence of numbers", function () {

        var sut = [2, 3, 5, 522, 3, 4, 5, 1, 23, 333];
        expect(sut.max()).toEqual(522);
    });

    it("Should return maximum number of a sequence of objects by passing selector function as parameter", function () {
        var sut = [
            { name: "Ibrahim", age: 25 }, { name: "Ahmed", age: 23 }, { name: "Nada", age: 20 }, { name: "Mona", age: 32 }, { name: "Soad", age: 30 }
        ];
        expect(sut.max(o => o.age)).toEqual(32);
    });
});

describe("min function", function() {
    it("Should throw exception if sequence contains no elements", function () {
        var sut = [];
        expect(function () { sut.min(); }).toThrow();
    });

    it("Should throw exception if parameter were passed is not a function", function () {
        var sut = getArrayOfObjects();
        expect(function () { sut.min("o=> o.age"); }).toThrow();
    });

    it("Should throw exception if parameter were passed is a function that takes no parameters", function () {
        var sut = getArrayOfObjects();
        expect(function () {
            sut.min(() => {
                return 5;
            });
        }).toThrow();
    });

    it("Should throw exception if function parameter was returning non numeric value", function () {
        var sut = getArrayOfObjects();
        expect(function () {
            sut.min(o => o.name);
        }).toThrow();
    });

    it("Should throw exception if a sequence contains non-numeric value", function () {
        var sut = [2, 3, 4, 44, 2, 5, 6, 611, "H", 22];
        expect(sut.min).toThrow();
    });

    it("Should return minimum number of a sequence of numbers", function () {

        var sut = [2, 3, 5, 522, 3, 4, 5, 1, 23, 333];
        expect(sut.min()).toEqual(1);
    });

    it("Should return minimum number of a sequence of objects by passing selector function as parameter", function () {
        var sut = [
            { name: "Ibrahim", age: 25 }, { name: "Ahmed", age: 23 }, { name: "Nada", age: 20 }, { name: "Mona", age: 32 }, { name: "Soad", age: 30 }
        ];
        expect(sut.min(o => o.age)).toEqual(20);
    });

});

describe("average function", function() {
    it("Should throw exception if sequence contains no elements", function () {
        var sut = [];
        expect(function () { sut.average(); }).toThrow();
    });

    it("Should throw exception if parameter were passed is not a function", function () {
        var sut = getArrayOfObjects();
        expect(function () { sut.average("o=> o.age"); }).toThrow();
    });

    it("Should throw exception if parameter were passed is a function that takes no parameters", function () {
        var sut = getArrayOfObjects();
        expect(function () {
            sut.average(() => {
                return 5;
            });
        }).toThrow();
    });

    it("Should throw exception if function parameter was returning non numeric value", function () {
        var sut = getArrayOfObjects();
        expect(function () {
            sut.average(o => o.name);
        }).toThrow();
    });

    it("Should throw exception if a sequence contains non-numeric value", function () {
        var sut = [2, 3, 4, 44, 2, 5, 6, 611, "H", 22];
        expect(sut.average).toThrow();
    });

    it("Should return average number of a sequence of numbers", function () {

        var sut = [1,2,3,4,5,6];
        expect(sut.average()).toEqual(3.5);
    });

    it("Should return average number of a sequence of objects by passing selector function as parameter", function () {
        var sut = [
            { name: "Ibrahim", age: 25 }, { name: "Ahmed", age: 23 }, { name: "Nada", age: 20 }, { name: "Mona", age: 32 }, { name: "Soad", age: 30 }
        ];
        expect(sut.average(o => o.age)).toEqual(26);
    });
});