type StringIndexedObject = { [index:string] : any }

class Utils {
  static merge(objectOne : StringIndexedObject, objectTwo : StringIndexedObject) : Object {
    const result : StringIndexedObject = {};

    Object.keys(objectOne)
      .forEach((key : string) => result[key] = objectOne[key]);

    Object.keys(objectTwo)
      .forEach((key : string)  => result[key] = objectTwo[key]);

    return result;
  }
}

export default Utils;