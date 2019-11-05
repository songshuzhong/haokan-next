function Animal() {}
function Dog() {}
/*1.原型链继承*/
Dog.prototype = new Animal();
/*2.构造函数继承*/
function Cat() {
    Animal.call(this);
}
/*3.组合继承*/
function Pig() {
    Animal.call(this);
}
Pig.prototype = new Animal();
Pig.prototype.constructor = Pig;
/*4.原型对象继承*/
function protoExtends(obj) {
    function F() {}

    F.prototype = obj;

    return new F();
}
/*5.寄生继承*/
function parasiticExtends(obj) {
    const clone = protoExtends(obj);

    clone.prototype.canDo = function() {}

    return clone;
}
/*6.组合继承*/
function MixdExtends() {
    Dog.call(this);
    Pig.call(this);
}
MixdExtends.prototype = Object.create(Pig.prototype);
Object.assign(MixdExtends.prototype, Dog.prototype);
MixdExtends.prototype.constructor = MixdExtends;
/*7.es6继承*/
class People extends Animal {}
