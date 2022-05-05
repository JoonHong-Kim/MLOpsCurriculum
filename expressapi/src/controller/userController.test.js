const { UserController } = require("./userController");
const { userRepository } = require("../model/userRepository");
jest.mock("../model/userRepository");

const user = new userRepository();
const controller = new UserController(user);
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};
// console.log(user)
describe("POST /users", () => {
  beforeEach(() => {
    user.createUser.mockReset();
  });

  describe("given a username and age", () => {
    test("should respond with a json object containg the user information and 201 status code", async () => {
      for (let i = 0; i < 10; i++) {
        user.createUser.mockClear();
        jest.spyOn(user, "createUser").mockImplementation((name, age) => {
          return { id: i, name: name, age: age };
        });
        const req = { body: { name: "username" + i, age: String(22 + i) } };
        const res = mockResponse();
        await controller.createUser(req, res);
        expect(res.status).toBeCalledWith(201);
        expect(res.send).toBeCalledWith({
          id: i,
          name: "username" + i,
          age: String(22 + i),
        });
      }
    });
    test("if we send an empty name it should respond with the error message and 400 status code", async () => {
      const req = { body: { name: "", age: String(22) } };
      const res = mockResponse();
      await controller.createUser(req, res);
      expect(res.status).toBeCalledWith(400);
      expect(res.send).toBeCalledWith('"name" parameter is empty');
    });
    test("if we send an unvalid age it should respond with the error message and 400 status code", async () => {
      const req = { body: { name: "Joonhong", age: "hihelloanyung" } };
      const res = mockResponse();
      await controller.createUser(req, res);
      expect(res.status).toBeCalledWith(400);
      expect(res.send).toBeCalledWith('"age" parameter must be an integer');
    });
  });
});

describe("GET /user", () => {
  test("should respond with a json object containg the user information and 200 status code", async () => {
    const res = mockResponse();
    const req = {};
    jest
      .spyOn(user, "getUsers")
      .mockImplementation(() =>
        Promise.resolve([{ id: 1, name: "jh", age: 22 }])
      );
    // user.getUsers.mockResolvedValue([{ id: 1, name: "jh", age: 22 }]);
    await controller.getAllUsers(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith([{ id: 1, name: "jh", age: 22 }]);
  });
});

describe("GET /user/:id", () => {
  beforeEach(() => {
    user.getUserById.mockReset();
  });
  test("should respond with a json object containg the user information and 200 status code", async () => {
    for (let i = 0; i < 10; i++) {
      user.getUserById.mockClear();
      jest
        .spyOn(user, "getUserById")
        .mockImplementation((id) =>
          Promise.resolve([{ id: id, name: "jh", age: 22 }])
        );
      const req = { params: { id: i } };
      const res = mockResponse();
      await controller.getUserById(req, res);
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith([{ id: i, name: "jh", age: 22 }]);
    }
  });
  test("if we send an unvalid id it should respond with the error message and 400 status code", async () => {
    user.getUserById.mockClear();
    const req = { params: { id: "hi" } };
    const res = mockResponse();
    await controller.getUserById(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledWith("Invalid user id");
  });
});

describe("PUT /user/:id", () => {
  beforeEach(() => {
    user.updateUser.mockReset();
  });
  test("should respond with a json object containg the user that updated information and 200 status code", async () => {
    for (let i = 0; i < 10; i++) {
      user.updateUser.mockClear();
      jest
        .spyOn(user, "updateUser")
        .mockImplementation((id, name, age) =>
          Promise.resolve([{ id: id, name: name, age: age }])
        );
      const req = {
        body: { name: "jh" + String(i), age: 19 + i },
        params: { id: i },
      };
      const res = mockResponse();
      await controller.updateUser(req, res);
      expect(res.json).toBeCalledWith([
        { id: i, name: "jh" + String(i), age: 19 + i },
      ]);
      expect(res.status).toBeCalledWith(200);
    }
  });
  test("if we send an unvalid id it should respond with the error message and 400 status code", async () => {
    user.updateUser.mockClear();
    const req = { params: { id: "hi" } };
    const res = mockResponse();
    await controller.updateUser(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledWith("Invalid user id");
  });
});

describe("DELETE /user/:id", () => {
  beforeEach(() => {
    user.deleteUser.mockReset();
  });
  test("should respond with a json object containg the user that removed information and 200 status code", async () => {
    for (let i = 0; i < 10; i++) {
      user.deleteUser.mockClear();
      jest
        .spyOn(user, "deleteUser")
        .mockImplementation((id) =>
          Promise.resolve([{ id: id, name: "jh" + String(id), age: 19 + id }])
        );
      const req = { params: { id: i } };
      const res = mockResponse();
      await controller.deleteUser(req, res);
      expect(res.json).toBeCalledWith([
        { id: i, name: "jh" + String(i), age: 19 + i },
      ]);
      expect(res.status).toBeCalledWith(200);
    }
  });
  test("if we send an unvalid id it should respond with the error message and 400 status code", async () => {
    user.deleteUser.mockClear();
    const req = { params: { id: "hi" } };
    const res = mockResponse();
    await controller.deleteUser(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledWith("Invalid user id");
  });
});
