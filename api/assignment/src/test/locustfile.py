from locust import HttpUser, task
import random
class GetAllUser(HttpUser):
    @task
    def index(self):
        self.client.get("/users")

    @task
    def create_user(self):
        self.client.post("/users", json={"name": "test_user_" + str(random.randint(1, 9999999999999)),"age":27})