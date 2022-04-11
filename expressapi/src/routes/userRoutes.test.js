const request = require("supertest");
const makeApp = require("./userRoutes");
// const { describe,expect,it } = require("@jest/globals");

const userRepository = {
  getUsers: jest.fn(),
  getUserById: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
};
const app = makeApp(userRepository);
describe("POST /users", () => {
  beforeEach(() => {
    userRepository.createUser.mockReset();
    userRepository.createUser.mockResolvedValue(0);
  });

  describe("given a username and age", () => {
    test("should respond with a json object containg the user information and 201 status code", async () => {
      for (let i = 0; i < 10; i++) {
        userRepository.createUser.mockClear();
        userRepository.createUser.mockResolvedValue(i);
        jest
          .spyOn(userRepository, "createUser")
          .mockImplementation((name, age) => {
            return { id: i, name: name, age: age };
          });

        const response = await request(app)
          .post("/user")
          .send({ name: "username" + i, age: String(22 + i) });
        expect(response.body).toStrictEqual({
          id: i,
          name: "username" + i,
          age: String(22 + i),
        });
        expect(response.statusCode).toBe(201);
      }
    });

    test("if we send an empty name it should respond with the error message and 400 status code", async () => {
      const response = await request(app)
        .post("/user")
        .send({ name: "", age: "22" });
      expect(response.statusCode).toBe(400);
      expect(response.text).toStrictEqual("\"name\" parameter is empty");
    });
    test("if we send an empty name it should respond with the error message and 400 status code", async () => {
      const response = await request(app)
        .post("/user")
        .send({ name: "jh", age: "string" });
      expect(response.statusCode).toBe(400);
      expect(response.text).toStrictEqual("\"age\" parameter must be an integer");
    });
  });
});


describe("GET /user",()=>{
  test("should respond with a json object containg the user information and 200 status code",async()=>{
    const response = await request(app).get("/user");
    jest.spyOn(userRepository,"getUsers").mockImplementation(()=>{
      return [{id:1,name:"jh",age:22}];
    });
  });
})

describe("GET /user/:id",()=>{
  beforeEach(()=>{
    userRepository.getUserById.mockReset();
  });
  test("should respond with a json object containg the user information and 200 status code",async()=>{
    for(let i = 0; i<10; i++){
      userRepository.getUserById.mockClear();
      jest.spyOn(userRepository,"getUserById").mockImplementation((id)=>{
        return [{id:id,name:"jh",age:22}];
      });
      const response = await request(app).get(`/user/${i}`);
      expect(response.body).toStrictEqual([{id:i,name:"jh",age:22}]);
      expect(response.statusCode).toBe(200);
    }
  });
  test("if we send an unvalid id it should respond with the error message and 400 status code",async()=>{
    const response = await request(app).get("/user/notInteger");
    expect(response.statusCode).toBe(400);
    expect(response.text).toStrictEqual("Invalid user id");
  });
})

describe("PUT /user/:id",()=>{
  beforeEach(()=>{
    userRepository.updateUser.mockReset();
  });
  test("should respond with a json object containg the user that updated information and 200 status code",async()=>{
    for(let i = 0; i<10; i++){
      userRepository.updateUser.mockClear();
      jest.spyOn(userRepository,"updateUser").mockImplementation((id)=>{
        return [{id:id,name:"jh",age:22}];
      });
      const response = await request(app).put(`/user/${i}`);
      expect(response.body).toStrictEqual([{id:i,name:"jh",age:22}]);
      expect(response.statusCode).toBe(200);
    }
  });
  test("if we send an unvalid id it should respond with the error message and 400 status code",async()=>{
    const response = await request(app).put("/user/notInteger");
    expect(response.statusCode).toBe(400);
    expect(response.text).toStrictEqual("Invalid user id");
  });
})

describe("DELETE /user/:id",()=>{
  beforeEach(()=>{
    userRepository.deleteUser.mockReset();
  });
  test("should respond with a json object containg the user that removed information and 200 status code",async()=>{
    for(let i = 0; i<10; i++){
      userRepository.deleteUser.mockClear();
      jest.spyOn(userRepository,"deleteUser").mockImplementation((id)=>{
        return [{id:id,name:"jh",age:22}];
      });
      const response = await request(app).delete(`/user/${i}`);
      expect(response.body).toStrictEqual([{id:i,name:"jh",age:22}]);
      expect(response.statusCode).toBe(200);
    }
  });
  test("if we send an unvalid id it should respond with the error message and 400 status code",async()=>{
    const response = await request(app).delete("/user/notInteger");
    expect(response.statusCode).toBe(400);
    expect(response.text).toStrictEqual("Invalid user id");
  });
})